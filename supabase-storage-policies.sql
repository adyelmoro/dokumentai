-- ============================================================
-- DokumentAI — Storage bucket RLS policies
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'dokumentai-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can read own files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'dokumentai-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'dokumentai-uploads'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
