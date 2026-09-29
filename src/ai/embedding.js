import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function createEmbedding(text) {
  const response = await ai.models.embedContent({
    model: process.env.EMBEDDING_MODEL,
    contents: text,
    config: {
      outputDimensionality: Number(process.env.EMBEDDING_DIMENSIONS),
    },
  });

  return response.embeddings[0].values;
}
