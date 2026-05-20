export type Document = {
  id: string;
  user_id: string;
  name: string;
  file_path: string;
  file_type: 'pdf' | 'docx';
  file_size: number;
  chunk_count: number;
  created_at: string;
};

export type DocumentChunk = {
  id: string;
  document_id: string;
  user_id: string;
  content: string;
  chunk_index: number;
  embedding?: number[];
  created_at: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  sources?: ChunkMatch[];
};

export type ChunkMatch = {
  id: string;
  content: string;
  chunk_index: number;
  similarity: number;
};

export type Language = 'no' | 'en';

export type UploadState =
  | { status: 'idle' }
  | { status: 'uploading'; progress: number }
  | { status: 'processing' }
  | { status: 'done'; documentId: string; chunkCount: number }
  | { status: 'error'; message: string };
