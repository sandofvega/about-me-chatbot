import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { readFileSync } from "fs";
import { join } from "path";

const personalData = readFileSync(join(process.cwd(), "data/me.md"), "utf-8");

const modelName = process.env.CHAT_MODEL || "gemini-2.5-flash-lite";

const MAX_HISTORY_PAIRS = 5;

const systemPrompt = `You are a personal assistant that answers questions ONLY about Yasin.

RULES:
- Only use the information provided below to answer questions
- If a question is not about Yasin or cannot be answered from the provided data, politely decline and explain that you can only answer questions about Yasin
- Keep responses concise and factual
- Do not make up or guess any information

PERSONAL DATA:
${personalData}`;

export interface ChatMessage {
  role: "human" | "ai";
  text: string;
}

export async function chat(
  userMessage: string,
  history: ChatMessage[] = [],
): Promise<string> {
  const model = new ChatGoogleGenerativeAI({
    model: modelName,
  });

  const trimmedHistory = history.slice(-(MAX_HISTORY_PAIRS * 2));

  const historyMessages = trimmedHistory.map((msg) =>
    msg.role === "human"
      ? new HumanMessage(msg.text)
      : new AIMessage(msg.text),
  );

  const response = await model.invoke([
    new SystemMessage(systemPrompt),
    ...historyMessages,
    new HumanMessage(userMessage),
  ]);

  return typeof response.content === "string"
    ? response.content
    : JSON.stringify(response.content);
}
