import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json();
    const reply = await chat(body.message);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}
