import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { readFileSync } from "fs";
import { join } from "path";

const personalData = readFileSync(join(process.cwd(), "data/me.md"), "utf-8");

const modelName = process.env.CHAT_MODEL || "gemini-2.5-flash-lite";

const systemPrompt = `You are a personal assistant that answers questions ONLY about Yasin.

RULES:
- Only use the information provided below to answer questions
- If a question is not about Yasin or cannot be answered from the provided data, politely decline and explain that you can only answer questions about Yasin
- Keep responses concise and factual
- Do not make up or guess any information

PERSONAL DATA:
${personalData}`;

export async function chat(userMessage: string): Promise<string> {
  const model = new ChatGoogleGenerativeAI({
    model: modelName,
  });

  const response = await model.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(userMessage),
  ]);

  return typeof response.content === "string"
    ? response.content
    : JSON.stringify(response.content);
}
