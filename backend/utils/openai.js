import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getAIResponse = async (input) => {
  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: input }],
  });
  return chat.choices[0].message.content;
};
