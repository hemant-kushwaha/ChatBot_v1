const CHUNK_SIZE = 2000;
const CHUNK_OVERLAP = 200;

export function createChunks(text) {
  const chunks = [];

  let start = 0;

  while (start < text.length) {
    const end = start + CHUNK_SIZE;

    const chunk = text.slice(start, end);

    chunks.push(chunk);

    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
}
