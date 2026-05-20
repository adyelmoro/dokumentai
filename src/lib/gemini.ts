import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function embedText(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  // Gemini free tier: sequential with small delay to avoid rate limits
  const embeddings: number[][] = [];
  for (const text of texts) {
    const embedding = await embedText(text);
    embeddings.push(embedding);
    // 50ms pause to stay within free tier limits
    await new Promise((r) => setTimeout(r, 50));
  }
  return embeddings;
}

export async function generateAnswer(
  question: string,
  chunks: { content: string; chunk_index: number }[],
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
