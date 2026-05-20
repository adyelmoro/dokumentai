const CHUNK_SIZE = 500;    // tokens (~375 words)
const CHUNK_OVERLAP = 50;  // tokens (~37 words)
const MIN_CHUNK = 100;     // tokens — discard smaller fragments

// Rough token count: chars / 4
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

export function chunkText(text: string): string[] {
  const paragraphs = splitIntoParagraphs(text);
  const chunks: string[] = [];
  let current = '';

  for (const para of paragraphs) {
    const combined = current ? `${current}\n\n${para}` : para;

    if (estimateTokens(combined) <= CHUNK_SIZE) {
      current = combined;
    } else {
      if (current && estimateTokens(current) >= MIN_CHUNK) {
        chunks.push(current.trim());
      }
      // If the paragraph alone is bigger than chunk size, split by sentences
      if (estimateTokens(para) > CHUNK_SIZE) {
        const sentences = para.split(/(?<=[.!?])\s+/);
        let sentenceBuffer = '';
        for (const sentence of sentences) {
          const combined2 = sentenceBuffer
            ? `${sentenceBuffer} ${sentence}`
            : sentence;
          if (estimateTokens(combined2) <= CHUNK_SIZE) {
            sentenceBuffer = combined2;
          } else {
            if (sentenceBuffer && estimateTokens(sentenceBuffer) >= MIN_CHUNK) {
              chunks.push(sentenceBuffer.trim());
            }
            sentenceBuffer = sentence;
          }
        }
        if (sentenceBuffer && estimateTokens(sentenceBuffer) >= MIN_CHUNK) {
          // Start new chunk with overlap from last chunk
          const overlap = chunks.length > 0
            ? getOverlap(chunks[chunks.length - 1])
            : '';
          current = overlap ? `${overlap}\n\n${sentenceBuffer}` : sentenceBuffer;
        } else {
          current = sentenceBuffer;
        }
      } else {
        // Start new chunk with overlap from last chunk
        const overlap = chunks.length > 0
          ? getOverlap(chunks[chunks.length - 1])
          : '';
        current = overlap ? `${overlap}\n\n${para}` : para;
      }
    }
  }

  if (current && estimateTokens(current) >= MIN_CHUNK) {
    chunks.push(current.trim());
  }

  return chunks;
}

function getOverlap(chunk: string): string {
  // Return roughly the last CHUNK_OVERLAP tokens worth of text
  const targetChars = CHUNK_OVERLAP * 4;
  if (chunk.length <= targetChars) return chunk;
  // Try to break at a sentence boundary
  const tail = chunk.slice(-targetChars * 2);
  const sentenceMatch = tail.match(/[.!?]\s+([\s\S]+)$/);
  if (sentenceMatch) return sentenceMatch[1];
  return chunk.slice(-targetChars);
}
