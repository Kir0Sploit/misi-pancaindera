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
export type Question = {
  category: Category;
  prompt: string;
  answer: string;
  icon: string;
  chunks: [string, string, string, string];
};
const bank: Record<Category, [string, string, string, string, string][]> = {
  Penglihatan: [
    [
      "Pemandangan di luar lapangan terbang sangat",
      "indah",
      "🌄",
      "Pemandangan itu",
      "dilihat dari udara",
    ],
    [
      "Lampu di balai berlepas sangat",
      "cerah",
      "💡",
      "Lampu itu",
      "dinyalakan pada waktu malam",
    ],
    [
      "Ruang menunggu itu kelihatan",
      "bersih",
      "🪑",
      "Ruang menunggu itu",
      "selesai dibersihkan",
    ],
    [
      "Corak pada beg itu kelihatan",
      "cantik",
      "🧳",
      "Corak pada beg itu",
      "dilihat dari dekat",
    ],
    [
      "Langit di atas lapangan terbang kelihatan",
      "gelap",
      "🌙",
      "Langit itu",
      "malam menjelang",
    ],
    [
      "Pakaian pegawai itu kelihatan",
      "kemas",
      "👔",
      "Pakaian pegawai itu",
      "diseterika",
    ],
  ],
  Pendengaran: [
    [
      "Bunyi enjin kapal terbang sangat",
      "bising",
      "✈️",
      "Bunyi enjin itu",
      "kapal terbang berlepas",
    ],
    [
      "Suara pegawai melalui pembesar suara kedengaran",
      "jelas",
      "📢",
      "Suara pegawai itu",
      "mikrofon digunakan",
    ],
    [
      "Bunyi loceng amaran itu sangat",
      "nyaring",
      "🔔",
      "Bunyi loceng itu",
      "loceng dibunyikan",
    ],
    [
      "Lagu yang dinyanyikan oleh penumpang itu kedengaran",
      "merdu",
      "🎵",
      "Suara penumpang itu",
      "dia menyanyi",
    ],
    [
      "Bilik rehat itu menjadi",
      "senyap",
      "🤫",
      "Bilik rehat itu",
      "semua penumpang berhenti bercakap",
    ],
    [
      "Suara penumpang yang sakit tekak itu kedengaran",
      "serak",
      "🗣️",
      "Suara penumpang itu",
      "dia sakit tekak",
    ],
  ],
  Rasa: [
    [
      "Coklat di dalam bekas makanan itu terasa",
      "manis",
      "🍫",
      "Coklat itu",
      "dimakan",
    ],
    [
      "Limau di dalam bekas makanan itu terasa",
      "masam",
      "🍋",
      "Limau itu",
      "dimakan",
    ],
    [
      "Ubat yang diberikan oleh ibu terasa",
      "pahit",
      "🥄",
      "Ubat itu",
      "ditelan mengikut arahan ibu",
    ],
    [
      "Kerepek yang ditabur banyak garam terasa",
      "masin",
      "🥨",
      "Kerepek itu",
      "ditabur garam",
    ],
    [
      "Sambal di dalam bekal itu terasa",
      "pedas",
      "🌶️",
      "Sambal itu",
      "ditambah cili",
    ],
    [
      "Sup tanpa garam di kafe itu terasa",
      "tawar",
      "🍲",
      "Sup itu",
      "dimasak tanpa garam",
    ],
  ],
  Sentuhan: [
    [
      "Bantal perjalanan itu terasa",
      "lembut",
      "☁️",
      "Bantal perjalanan itu",
      "disentuh",
    ],
    [
      "Permukaan beg yang tidak rata itu terasa",
      "kasar",
      "🧳",
      "Permukaan beg itu",
      "disentuh",
    ],
    [
      "Permukaan botol yang bersabun itu terasa",
      "licin",
      "🧴",
      "Permukaan botol itu",
      "terkena sabun",
    ],
    [
      "Kotak kayu di atas troli itu terasa",
      "keras",
      "📦",
      "Kotak kayu itu",
      "disentuh",
    ],
    [
      "Pek ais di dalam bekas itu terasa",
      "sejuk",
      "🧊",
      "Pek ais itu",
      "dipegang",
    ],
    [
      "Cawan berisi air suam itu terasa",
      "suam",
      "☕",
      "Cawan itu",
      "diisi dengan air suam",
    ],
  ],
  Bau: [
    ["Bunga di kaunter itu berbau", "wangi", "🌷", "Bunga itu", "dihidu"],
    [
      "Sampah yang sudah lama di dalam tong itu berbau",
      "busuk",
      "🗑️",
      "Sampah itu",
      "dibiarkan terlalu lama",
    ],
    [
      "Minyak wangi di dalam botol itu berbau",
      "harum",
      "🌸",
      "Minyak wangi itu",
      "disembur pada pakaian",
    ],
    [
      "Ikan mentah di dalam bekas itu berbau",
      "hanyir",
      "🐟",
      "Ikan mentah itu",
      "dikeluarkan dari bekas",
    ],
    [
      "Baju lembap yang lama tersimpan di dalam beg berbau",
      "hapak",
      "👕",
      "Baju itu",
      "disimpan dalam keadaan lembap",
    ],
    [
      "Asap daripada roti yang terbakar berbau",
      "hangit",
      "🍞",
      "Roti itu",
      "terbakar",
    ],
  ],
};
export const questions: Question[] = groups.flatMap((g) =>
  bank[g.name].map(([prompt, answer, icon, subject, context]) => ({
    category: g.name,
    prompt: prompt + " ______.",
    answer,
    icon,
    chunks: [
      subject,
      `${g.name === "Bau" ? "berbau" : g.name === "Rasa" || g.name === "Sentuhan" ? "terasa" : g.name === "Pendengaran" ? "kedengaran" : "kelihatan"} ${answer}`,
      "apabila",
      context,
    ],
  })),
);
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function selectQuestions(category: Category, set: string) {
  const source = questions.filter((q) => q.category === category);
  return set === "rawak"
    ? shuffle(source).slice(0, 5)
    : set === "b"
      ? [...source.slice(1), source[0]].slice(0, 5)
      : source.slice(0, 5);
}
export function optionsFor(q: Question) {
  return shuffle([
    q.answer,
    ...groups
      .filter((g) => g.name !== q.category)
      .map((g) => questions.find((x) => x.category === g.name)!.answer),
  ]);
}
export const objectiveMet = (first: number, second: number) =>
  first >= 4 && second >= 4;
