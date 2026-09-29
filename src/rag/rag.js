import { createEmbedding } from "../ai/embedding.js";
import { searchVectors } from "../vector/pinecone.js";

export async function getContext(question) {
  const embedding = await createEmbedding(question);

  const matches = await searchVectors(embedding);

  return matches.map((match) => ({
    score: match.score,
    text: match.metadata.text,
    source: match.metadata.source,
  }));
}
