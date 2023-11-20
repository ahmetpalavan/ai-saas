import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!replicate.auth) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const isAllowed = await checkApiLimit();

    if (!isAllowed) {
      return new NextResponse("Api limit reached", { status: 429 });
    }

    const response = await replicate.run("anotherjesse/zeroscope-v2-xl:71996d331e8ede8ef7bd76eba9fae076d31792e4ddf4ad057779b443d6aea62f", {
      input: {
        prompt,
      },
    });

    await increaseApiLimit();

    return NextResponse.json(response);
  } catch (error) {
    console.log(["error", error]);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}