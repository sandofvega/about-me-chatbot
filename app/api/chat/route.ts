interface ChatMessage {
  role: "human" | "ai";
  text: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

interface ChatResponse {
  reply: string;
}

export async function POST(request: Request): Promise<Response> {
  try {
    if (!process.env.AI_HOST) {
      throw new Error("AI_HOST environment variable is not defined");
    }

    const body: ChatRequest = await request.json();

    const externalResponse = await fetch(
      `${process.env.AI_HOST}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!externalResponse.ok) {
      throw new Error(
        `External API error: ${externalResponse.status} ${externalResponse.statusText}`
      );
    }

    const data: ChatResponse = await externalResponse.json();

    return Response.json(data);
  } catch (error: unknown) {
    console.error("POST error:", error);

    const message =
      error instanceof Error ? error.message : "Unexpected error";

    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}