import { NextRequest, NextResponse } from "next/server";
import { chat, type ChatMessage } from "@/lib/ai";

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface ChatResponse {
  reply: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`${process.env.AI_HOST}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error("POST error:", error)
    return Response.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}
