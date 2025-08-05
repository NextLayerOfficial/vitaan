"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Quote = {
  id: number;
  author: string;
  authorInitial: string;
  originalQuote: string;
  translation: string;
  language: string;
  langCode: string;
  theme: "sepia" | "indigo";
};

const quotesData: Quote[] = [
  {
    id: 1,
    author: "Rabindranath Tagore",
    authorInitial: "RT",
    originalQuote: "যদি তোর ডাক শুনে কেউ না আসে তবে একলা চলো রে।",
    translation: "If no one responds to your call, then walk alone.",
    language: "Bengali",
    langCode: "bn",
    theme: "indigo",
  },
  {
    id: 2,
    author: "Thiruvalluvar",
    authorInitial: "T",
    originalQuote: "பிறப்பொக்கும் எல்லா உயிர்க்கும்",
    translation: "All human beings are equal by birth.",
    language: "Tamil",
    langCode: "ta",
    theme: "sepia",
  },
  {
    id: 3,
    author: "Mirza Ghalib",
    authorInitial: "MG",
    originalQuote: "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले",
    translation:
      "A thousand desires, each so potent, it could take my breath away.",
    language: "Urdu (Devanagari)",
    langCode: "hi",
    theme: "indigo",
  },
  {
    id: 4,
    author: "Kalidasa",
    authorInitial: "K",
    originalQuote: "अस्त्युत्तरस्यां दिशि देवतात्मा हिमालयो नाम नगाधिराजः।",
    translation:
      "In the northern direction lies the divine-souled Himalayas, the king of mountains.",
    language: "Sanskrit",
    langCode: "sa",
    theme: "sepia",
  },
];

const Watermark = ({
  char,
  className,
}: {
  char: string;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={cn(
      "absolute font-display text-[18rem] text-sandalwood/10 select-none -z-0 pointer-events-none",
      className
    )}
  >
    {char}
  </span>
);

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("absolute w-8 h-8 pointer-events-none opacity-40", className)}
  >
    <path
      d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 8.41828 20 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 4m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M20 20m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const svgPaperTexture = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n' x='0' y='0'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.05'/></svg>`;
const paperTextureUri = `data:image/svg+xml,${encodeURIComponent(
  svgPaperTexture
)}`;

const QuoteCard = (quote: Quote) => {
  const isIndigo = quote.theme === "indigo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="break-inside-avoid"
    >
      <div
        className={cn(
          "relative p-8 rounded-lg shadow-lg border-2 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5",
          isIndigo
            ? "bg-indigo text-ivory border-sandalwood"
            : "bg-[#FBF5ED] text-indigo border-muted-gold"
        )}
        style={{ backgroundImage: `url("${paperTextureUri}")` }}
      >
        <CornerOrnament className="top-4 left-4" />
        <CornerOrnament className="top-4 right-4 rotate-90" />
        <CornerOrnament className="bottom-4 right-4 rotate-180" />
        <CornerOrnament className="bottom-4 left-4 -rotate-90" />

        <div className="relative z-10 flex-grow flex flex-col">
          <p
            lang={quote.langCode}
            className="font-display text-3xl mb-6 leading-relaxed flex-grow"
          >
            {quote.originalQuote}
          </p>
          <blockquote
            className="border-l-4 italic text-lg mb-8 font-body opacity-90 pl-4 py-1"
            style={{
              borderColor: isIndigo
                ? "var(--color-sandalwood)"
                : "var(--color-muted-gold)",
            }}
          >
            &quot;{quote.translation}&quot;
          </blockquote>

          <footer className="flex items-center gap-4 mt-auto">
            <div
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0",
                isIndigo ? "bg-ivory/10 text-ivory" : "bg-indigo/5 text-indigo"
              )}
            >
              {quote.authorInitial}
            </div>
            <div>
              <p className="font-body font-bold text-sm tracking-wider uppercase m-0">
                {quote.author}
              </p>
              <p
                className={cn(
                  "text-xs opacity-70 m-0",
                  isIndigo ? "text-sandalwood" : "text-sandalwood/80"
                )}
              >
                {quote.language}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </motion.div>
  );
};

const CulturalQuotesSection = () => {
  return (
    <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-ivory text-indigo pt-20 py-10 sm:py-28 lg:py-24 overflow-hidden">
      <Watermark char="অ" className="top-[10%] left-[5%] -rotate-12" />
      <Watermark char="अ" className="top-1/2 right-[8%] rotate-15" />
      <Watermark char="ॐ" className="bottom-[15%] left-1/2 -translate-x-1/2" />
      <Watermark
        char="க"
        className="hidden lg:block top-1/3 left-[45%] rotate-6"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight"
            style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
          >
            {/* Voices of a Civilization */}
            सभ्यता की वाणियाँ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto md:text-lg text-indigo/80 font-body"
          >
            Timeless wisdom from the literary giants of the Indian subcontinent,
            echoing through the ages.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 xl:columns-2 gap-8 space-y-8">
          {quotesData.map((quote) => (
            <QuoteCard key={quote.id} {...quote} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalQuotesSection;
