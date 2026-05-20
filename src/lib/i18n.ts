export type Lang = 'no' | 'en';

export type Translations = {
  nav: {
    upload: string;
    signOut: string;
  };
  landing: {
    subtitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    signIn: string;
    signingIn: string;
    footer: string;
  };
  library: {
    title: string;
    uploadBtn: string;
    emptyTitle: string;
    emptyDesc: string;
    emptyBtn: string;
  };
  uploadPage: {
    title: string;
    desc: string;
  };
  upload: {
    dragActive: string;
    dragIdle: string;
    clickHint: string;
    typeHint: string;
    processing: string;
    processingDesc: string;
    doneTitle: string;
    doneDesc: (n: number) => string;
    errTooLarge: string;
    errType: string;
    errNetwork: string;
  };
  document: {
    back: string;
    chunks: (n: number) => string;
  };
  chat: {
    emptyTitle: string;
    emptyHint: string;
    thinking: string;
    placeholder: string;
    send: string;
    source: (n: number, chunk: number) => string;
    errorGeneric: string;
    errorNetwork: string;
  };
  card: {
    chunks: (n: number) => string;
    uploaded: string;
    openChat: string;
    delete: string;
    confirmDelete: string;
  };
};

const no: Translations = {
  nav: {
    upload: 'Last opp',
    signOut: 'Logg ut',
  },
  landing: {
    subtitle: 'Still spørsmål om dine dokumenter',
    feature1Title: 'Last opp PDF og Word',
    feature1Desc: 'Støtter .pdf og .docx opp til 10 MB',
    feature2Title: 'Søk med naturlig språk',
    feature2Desc: 'Still spørsmål på norsk eller engelsk',
    feature3Title: 'Kildehenvisning',
    feature3Desc: 'Svarene viser hvilke avsnitt de er basert på',
    signIn: 'Fortsett med Google',
    signingIn: 'Logger inn...',
    footer: 'Porteføljeprosjekt av Ayyad Anwar · Bygget med Next.js og Gemini AI',
  },
  library: {
    title: 'Mine dokumenter',
    uploadBtn: '+ Last opp',
    emptyTitle: 'Ingen dokumenter ennå',
    emptyDesc: 'Last opp et PDF- eller Word-dokument for å komme i gang',
    emptyBtn: 'Last opp dokument',
  },
  uploadPage: {
    title: 'Last opp dokument',
    desc: 'PDF eller Word-dokument, maks 10 MB. Dokumentet vil bli analysert og gjort søkbart med AI.',
  },
  upload: {
    dragActive: 'Slipp filen her',
    dragIdle: 'Dra og slipp filen din her',
    clickHint: 'eller klikk for å velge fil',
    typeHint: 'PDF eller DOCX · Maks 10 MB',
    processing: 'Analyserer dokumentet...',
    processingDesc: 'Deler opp og indekserer innholdet',
    doneTitle: 'Dokumentet er klart!',
    doneDesc: (n) => `${n} avsnitt indeksert — sender deg til chat...`,
    errTooLarge: 'Filen er for stor (maks 10 MB)',
    errType: 'Kun PDF og DOCX støttes',
    errNetwork: 'Nettverksfeil – prøv igjen',
  },
  document: {
    back: '← Tilbake',
    chunks: (n) => `${n} avsnitt indeksert`,
  },
  chat: {
    emptyTitle: 'Still et spørsmål om dokumentet',
    emptyHint: '«Hva er hovedpunktene?» eller «Hvem er partene i kontrakten?»',
    thinking: 'Analyserer...',
    placeholder: 'Still et spørsmål om dokumentet... (Enter for å sende)',
    send: 'Send',
    source: (n, chunk) => `Kilde ${n} · avsnitt ${chunk}`,
    errorGeneric: 'Beklager, noe gikk galt. Prøv igjen.',
    errorNetwork: 'Nettverksfeil – prøv igjen.',
  },
  card: {
    chunks: (n) => `${n} avsnitt`,
    uploaded: 'Lastet opp',
    openChat: 'Åpne chat →',
    delete: 'Slett',
    confirmDelete: 'Bekreft sletting',
  },
};

const en: Translations = {
  nav: {
    upload: 'Upload',
    signOut: 'Log out',
  },
  landing: {
    subtitle: 'Ask questions about your documents',
    feature1Title: 'Upload PDF and Word',
    feature1Desc: 'Supports .pdf and .docx up to 10 MB',
    feature2Title: 'Search with natural language',
    feature2Desc: 'Ask questions in Norwegian or English',
    feature3Title: 'Source citations',
    feature3Desc: 'Answers show which sections they are based on',
    signIn: 'Continue with Google',
    signingIn: 'Signing in...',
    footer: 'Portfolio project by Ayyad Anwar · Built with Next.js and Gemini AI',
  },
  library: {
    title: 'My documents',
    uploadBtn: '+ Upload',
    emptyTitle: 'No documents yet',
    emptyDesc: 'Upload a PDF or Word document to get started',
    emptyBtn: 'Upload document',
  },
  uploadPage: {
    title: 'Upload document',
    desc: 'PDF or Word document, max 10 MB. The document will be analyzed and made searchable with AI.',
  },
  upload: {
    dragActive: 'Drop the file here',
    dragIdle: 'Drag and drop your file here',
    clickHint: 'or click to select file',
    typeHint: 'PDF or DOCX · Max 10 MB',
    processing: 'Analyzing document...',
    processingDesc: 'Splitting and indexing the content',
    doneTitle: 'Document is ready!',
    doneDesc: (n) => `${n} paragraphs indexed — sending you to chat...`,
    errTooLarge: 'File is too large (max 10 MB)',
    errType: 'Only PDF and DOCX are supported',
    errNetwork: 'Network error – please try again',
  },
  document: {
    back: '← Back',
    chunks: (n) => `${n} paragraphs indexed`,
  },
  chat: {
    emptyTitle: 'Ask a question about the document',
    emptyHint: '"What are the main points?" or "Who are the parties in the contract?"',
    thinking: 'Analyzing...',
    placeholder: 'Ask a question about the document... (Enter to send)',
    send: 'Send',
    source: (n, chunk) => `Source ${n} · paragraph ${chunk}`,
    errorGeneric: 'Sorry, something went wrong. Please try again.',
    errorNetwork: 'Network error – please try again.',
  },
  card: {
    chunks: (n) => `${n} ${n === 1 ? 'paragraph' : 'paragraphs'}`,
    uploaded: 'Uploaded',
    openChat: 'Open chat →',
    delete: 'Delete',
    confirmDelete: 'Confirm delete',
  },
};

const translations: Record<Lang, Translations> = { no, en };

export function getT(lang: Lang): Translations {
  return translations[lang];
}
