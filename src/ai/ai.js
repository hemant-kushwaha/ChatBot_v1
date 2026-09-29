import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateAnswer(question, context, previousInteractionId) {
  const interactionData = {
    model: process.env.CHAT_MODEL,

    system_instruction: `
      You are a helpful AI assistant.

      Answer the user's question using the provided context.

      If the answer is not available in the context,
      say that you don't have enough information.
    `,

    input: `
      Context:

      ${context}

      User Question:

      ${question}
    `,

    generation_config: {
      thinking_level: "minimal",
    },
  };

  if (previousInteractionId) {
    interactionData.previous_interaction_id = previousInteractionId;
  }

  const response = await ai.interactions.create(interactionData);

  return {
    answer: response.output_text,
    interactionId: response.id,
  };
}
