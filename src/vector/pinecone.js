import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

const namespace = index.namespace(process.env.PINECONE_NAMESPACE);

export async function storeVectors(vectors) {
  if (vectors.length === 0) {
    console.log("No vectors to store");
    return;
  }

  await namespace.upsert({
    records: vectors,
  });
}

export async function searchVectors(embedding) {
  const result = await namespace.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });

  return result.matches;
}
