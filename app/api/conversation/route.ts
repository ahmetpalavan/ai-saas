import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const isAllowed = await checkApiLimit();

    if (!isAllowed) {
      return new NextResponse("Api limit reached", { status: 429 });
    }

    const message = messages[0].content;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: message,
    });
    
    await increaseApiLimit();

    return NextResponse.json(response.choices[0].text);
  } catch (error) {
    console.log(["error", error]);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
