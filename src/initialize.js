import { createEmbedding } from "./ai/embedding.js";
import { createChunks } from "./rag/chunk.js";
import { getPdfFiles, readPdf } from "./rag/pdf.js";
import { storeVectors } from "./vector/pinecone.js";

export async function initialize() {
  console.log("Initializing documents...");

  const files = await getPdfFiles();

  for (const file of files) {
    console.log(`Processing ${file}`);

    const text = await readPdf(file);

    console.log("Text length:", text.length);

    const chunks = createChunks(text);

    console.log("Chunks:", chunks.length);

    const vectors = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      const embedding = await createEmbedding(chunk);

      vectors.push({
        id: `${file}-${i}`,
        values: embedding,
        metadata: {
          text: chunk,
          source: file,
          chunk: i,
        },
      });
    }

    await storeVectors(vectors);

    console.log(`${file} stored successfully`);
  }

  console.log("Initialization completed");
}
