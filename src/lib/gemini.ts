import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// text-embedding-004 was renamed to gemini-embedding-001 in the v1beta API.
// outputDimensionality: 768 keeps the vector size consistent with our pgvector schema.
const EMBED_MODEL = 'gemini-embedding-001';
const EMBED_DIMS = 768;

export async function embedText(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: EMBED_MODEL });
  const result = await model.embedContent({
    content: { parts: [{ text }], role: 'user' },
    outputDimensionality: EMBED_DIMS,
  } as Parameters<typeof model.embedContent>[0]);
  return result.embedding.values;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const embeddings: number[][] = [];
  for (const text of texts) {
    const embedding = await embedText(text);
    embeddings.push(embedding);
    // 50ms pause — stays within Gemini free tier rate limits
    await new Promise((r) => setTimeout(r, 50));
  }
  return embeddings;
}

export async function generateAnswer(
  question: string,
  chunks: { content: string; chunk_index: number }[],
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const excerpts = chunks
    .map((c, i) => `[Utdrag ${i + 1}]: ${c.content}`)
    .join('\n\n');

  const historyText = history
    .map((m) => `${m.role === 'user' ? 'Bruker' : 'Assistent'}: ${m.content}`)
    .join('\n');

  const prompt = `Du er en dokumentassistent. Svar på spørsmål basert KUN på de oppgitte dokumentutdragene.
Hvis svaret ikke finnes i utdragene, si det tydelig. Henvis alltid til hvilke utdrag som støtter svaret ditt.
Svar på samme språk som brukeren stiller spørsmålet (norsk eller engelsk).

Dokumentutdrag:
${excerpts}

${historyText ? `Samtalehistorikk:\n${historyText}\n` : ''}
Brukerspørsmål: ${question}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
