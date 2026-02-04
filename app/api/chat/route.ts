import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json();
    // optional: use body.message for future logic
    void body;
    
    return NextResponse.json({
      reply: "Your fixed reply text here.",
    });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}
