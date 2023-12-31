import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
  role: "system",
};

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

    const isAllowed = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!isAllowed && !isPro) {
      return new NextResponse("Api limit reached", { status: 403 });
    }

    if (!messages) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: [instructionMessage, ...messages].map((message) => message.content).join("\n"),
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.choices[0].text);
  } catch (error) {
    console.log(["error", error]);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
