import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const isAllowed = await checkApiLimit();

    if (!isAllowed) {
      return new NextResponse("Api limit reached", { status: 403 });
    }

    const images = await openai.images.generate({
      prompt,
      n: parseInt(amount),
      size: resolution,
    });

    await increaseApiLimit();

    return NextResponse.json(images.data);
  } catch (error) {
    console.log(["error", error]);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
