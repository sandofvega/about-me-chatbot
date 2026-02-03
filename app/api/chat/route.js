import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await request.json(); // optional: read { message } for future use
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
