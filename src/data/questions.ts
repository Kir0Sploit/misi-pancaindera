export type Category =
  "Penglihatan" | "Pendengaran" | "Rasa" | "Sentuhan" | "Bau";

export const groups: {
  name: Category;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    name: "Penglihatan",
    icon: "👁️",
    color: "#e7edff",
    description: "Lihat dan perhatikan",
  },
  {
    name: "Pendengaran",
    icon: "👂",
    color: "#fff0cf",
    description: "Dengar dengan teliti",
  },
  {
    name: "Rasa",
    icon: "👅",
    color: "#ffe3e5",
    description: "Kenali rasa makanan",
  },
  {
    name: "Sentuhan",
    icon: "✋",
    color: "#e2f3e8",
    description: "Kenali tekstur objek",
  },
  {
    name: "Bau",
    icon: "👃",
    color: "#efe5fb",
    description: "Kenali pelbagai bau",
  },
];

export type FillQuestion = {
  category: Category;
  prompt: string;
  answer: string;
  icon: string;
};
export type SentenceQuestion = {
  category: Category;
  adjective: string;
  situation: string;
  chunks: [string, string, string, string];
};

export const fillQuestions: FillQuestion[] = [
  {
    category: "Penglihatan",
    prompt: "Lampu tanda tali pinggang keselamatan itu sangat ______.",
    answer: "terang",
    icon: "💡",
  },
  {
    category: "Penglihatan",
    prompt: "Pemandangan awan dari tingkap pesawat sangat ______.",
    answer: "indah",
    icon: "☁️",
  },
  {
    category: "Penglihatan",
    prompt: "Ruang kabin pesawat itu kelihatan ______.",
    answer: "bersih",
    icon: "✈️",
  },
  {
    category: "Penglihatan",
    prompt: "Pemandangan bandar dari udara kelihatan sangat ______.",
    answer: "cantik",
    icon: "🏙️",
  },
  {
    category: "Penglihatan",
    prompt: "Pramugara yang memakai pakaian seragam itu kelihatan ______.",
    answer: "segak",
    icon: "🧑‍✈️",
  },
  {
    category: "Pendengaran",
    prompt: "Bunyi loceng keselamatan di dalam pesawat sangat ______.",
    answer: "nyaring",
    icon: "🔔",
  },
  {
    category: "Pendengaran",
    prompt: "Bunyi enjin pesawat ketika berlepas agak ______.",
    answer: "bising",
    icon: "✈️",
  },
  {
    category: "Pendengaran",
    prompt: "Muzik yang dimainkan di dalam kabin kedengaran ______.",
    answer: "merdu",
    icon: "🎵",
  },
  {
    category: "Pendengaran",
    prompt: "Suara pengumuman di dalam pesawat kedengaran ______.",
    answer: "kuat",
    icon: "📢",
  },
  {
    category: "Pendengaran",
    prompt: "Bunyi perbualan penumpang di dalam kabin agak ______.",
    answer: "bising",
    icon: "💬",
  },
  {
    category: "Rasa",
    prompt: "Jus yang diminum semasa penerbangan terasa ______.",
    answer: "manis",
    icon: "🧃",
  },
  {
    category: "Rasa",
    prompt: "Hirisan lemon dalam minuman itu terasa ______.",
    answer: "masam",
    icon: "🍋",
  },
  {
    category: "Rasa",
    prompt: "Ubat yang diambil sebelum perjalanan terasa ______.",
    answer: "pahit",
    icon: "🥄",
  },
  {
    category: "Rasa",
    prompt: "Biskut yang diberikan semasa penerbangan terasa ______.",
    answer: "manis",
    icon: "🍪",
  },
  {
    category: "Rasa",
    prompt: "Buah oren yang dimakan di dalam pesawat terasa sedikit ______.",
    answer: "masam",
    icon: "🍊",
  },
  {
    category: "Sentuhan",
    prompt: "Kusyen tempat duduk pesawat terasa ______.",
    answer: "lembut",
    icon: "💺",
  },
  {
    category: "Sentuhan",
    prompt: "Permukaan meja lipat di hadapan tempat duduk terasa ______.",
    answer: "licin",
    icon: "▰",
  },
  {
    category: "Sentuhan",
    prompt: "Selimut yang diberikan kepada penumpang terasa ______.",
    answer: "lembut",
    icon: "🧣",
  },
  {
    category: "Sentuhan",
    prompt: "Permukaan beg yang dibawa oleh penumpang terasa ______.",
    answer: "kasar",
    icon: "🧳",
  },
  {
    category: "Sentuhan",
    prompt: "Pemegang tempat duduk pesawat terasa ______.",
    answer: "licin",
    icon: "💺",
  },
  {
    category: "Bau",
    prompt: "Ruang kabin pesawat itu berbau ______.",
    answer: "harum",
    icon: "✈️",
  },
  {
    category: "Bau",
    prompt: "Makanan yang dihidangkan di dalam pesawat berbau ______.",
    answer: "wangi",
    icon: "🍱",
  },
  {
    category: "Bau",
    prompt: "Pewangi udara di dalam kabin berbau ______.",
    answer: "harum",
    icon: "🌸",
  },
  {
    category: "Bau",
    prompt: "Bunga yang dibawa sebagai hadiah itu berbau ______.",
    answer: "wangi",
    icon: "💐",
  },
  {
    category: "Bau",
    prompt: "Stoking yang telah lama dipakai itu berbau ______.",
    answer: "busuk",
    icon: "🧦",
  },
];

export const sentenceQuestions: SentenceQuestion[] = [
  {
    category: "Penglihatan",
    adjective: "terang",
    situation: "lampu tanda tali pinggang keselamatan",
    chunks: [
      "Lampu tanda tali pinggang keselamatan itu",
      "sangat terang",
      "apabila",
      "dinyalakan",
    ],
  },
  {
    category: "Penglihatan",
    adjective: "indah",
    situation: "pemandangan awan dari tingkap pesawat",
    chunks: [
      "Pemandangan awan itu",
      "sangat indah",
      "apabila",
      "dilihat dari tingkap pesawat",
    ],
  },
  {
    category: "Penglihatan",
    adjective: "cantik",
    situation: "pemandangan bandar dari udara",
    chunks: [
      "Pemandangan bandar itu",
      "sangat cantik",
      "apabila",
      "dilihat dari udara",
    ],
  },
  {
    category: "Pendengaran",
    adjective: "nyaring",
    situation: "bunyi loceng keselamatan",
    chunks: [
      "Bunyi loceng keselamatan itu",
      "sangat nyaring",
      "apabila",
      "dibunyikan di dalam pesawat",
    ],
  },
  {
    category: "Pendengaran",
    adjective: "bising",
    situation: "bunyi enjin pesawat",
    chunks: [
      "Bunyi enjin pesawat itu",
      "agak bising",
      "apabila",
      "pesawat berlepas",
    ],
  },
  {
    category: "Pendengaran",
    adjective: "merdu",
    situation: "muzik di dalam kabin",
    chunks: [
      "Muzik di dalam kabin itu",
      "sangat merdu",
      "apabila",
      "dimainkan",
    ],
  },
  {
    category: "Rasa",
    adjective: "manis",
    situation: "jus semasa penerbangan",
    chunks: [
      "Jus semasa penerbangan itu",
      "sangat manis",
      "apabila",
      "diminum",
    ],
  },
  {
    category: "Rasa",
    adjective: "masam",
    situation: "hirisan lemon",
    chunks: ["Hirisan lemon itu", "sangat masam", "apabila", "dimakan"],
  },
  {
    category: "Rasa",
    adjective: "pahit",
    situation: "ubat sebelum perjalanan",
    chunks: [
      "Ubat sebelum perjalanan itu",
      "sangat pahit",
      "apabila",
      "ditelan",
    ],
  },
  {
    category: "Sentuhan",
    adjective: "lembut",
    situation: "kusyen tempat duduk pesawat",
    chunks: [
      "Kusyen tempat duduk pesawat itu",
      "sangat lembut",
      "apabila",
      "disentuh",
    ],
  },
  {
    category: "Sentuhan",
    adjective: "licin",
    situation: "meja lipat",
    chunks: ["Permukaan meja lipat itu", "sangat licin", "apabila", "disentuh"],
  },
  {
    category: "Sentuhan",
    adjective: "kasar",
    situation: "permukaan beg penumpang",
    chunks: [
      "Permukaan beg penumpang itu",
      "sangat kasar",
      "apabila",
      "disentuh",
    ],
  },
  {
    category: "Bau",
    adjective: "harum",
    situation: "ruang kabin pesawat",
    chunks: [
      "Ruang kabin pesawat itu",
      "sangat harum",
      "apabila",
      "pewangi udara digunakan",
    ],
  },
  {
    category: "Bau",
    adjective: "wangi",
    situation: "makanan yang dihidangkan",
    chunks: [
      "Makanan yang dihidangkan itu",
      "sangat wangi",
      "apabila",
      "penutupnya dibuka",
    ],
  },
  {
    category: "Bau",
    adjective: "busuk",
    situation: "stoking yang telah lama dipakai",
    chunks: [
      "Stoking yang telah lama dipakai itu",
      "sangat busuk",
      "apabila",
      "dikeluarkan dari beg",
    ],
  },
];

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuestions(category: Category, set: string) {
  const source = fillQuestions.filter(
    (question) => question.category === category,
  );
  return set === "rawak"
    ? shuffle(source)
    : set === "b"
      ? [...source.slice(2), ...source.slice(0, 2)]
      : source;
}

export function selectSentenceQuestions(set: string) {
  return groups.map(({ name }) => {
    const source = sentenceQuestions.filter(
      (question) => question.category === name,
    );
    if (set === "a") return source[0];
    if (set === "b") return source[1];
    return source[Math.floor(Math.random() * source.length)];
  });
}

const distractors: Record<Category, string[]> = {
  Penglihatan: ["nyaring", "manis", "lembut", "harum"],
  Pendengaran: ["terang", "masam", "licin", "wangi"],
  Rasa: ["cantik", "merdu", "kasar", "harum"],
  Sentuhan: ["indah", "bising", "pahit", "wangi"],
  Bau: ["bersih", "kuat", "manis", "licin"],
};

export function optionsFor(question: FillQuestion) {
  return shuffle([question.answer, ...distractors[question.category]]);
}

export const objectiveMet = (first: number, second: number) =>
  first >= 4 && second >= 4;
