"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pillarsData = [
  {
    titleHindi: "सत्य",
    titleEnglish: "Satya (Truth)",
    description: "Unwavering commitment to authentic discourse",
  },
  {
    titleHindi: "स्वतंत्रता",
    titleEnglish: "Swatantrata (Freedom)",
    description: "Liberating minds through fearless expression",
  },
  {
    titleHindi: "उत्तरदायित्व",
    titleEnglish: "Uttardayitva (Responsibility)",
    description: "Media accountability for societal wellbeing",
  },
  {
    titleHindi: "संस्कृति",
    titleEnglish: "Sanskriti (Culture)",
    description: "Preserving heritage in modern narratives",
  },
  {
    titleHindi: "संवाद",
    titleEnglish: "Samvad (Dialogue)",
    description: "Building bridges through meaningful conversation",
  },
  {
    titleHindi: "स्मृति",
    titleEnglish: "Smriti (Memory)",
    description: "Honoring collective wisdom and remembrance",
  },
];

const VedicGlyph = ({ index }: { index: number }) => {
  const glyphs = [
    // Satya - Lotus of Truth
    <svg viewBox="0 0 40 40" className="w-12 h-12">
      <motion.path
        d="M20 8 L28 16 L20 24 L12 16 Z M20 16 L24 20 L20 24 L16 20 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, delay: index * 0.2 }}
      />
      <motion.circle
        cx="20"
        cy="20"
        r="3"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 1 }}
      />
    </svg>,

    // Swatantrata - Flying Bird
    <svg viewBox="0 0 40 40" className="w-12 h-12">
      <motion.path
        d="M10 20 Q20 10, 30 20 M15 18 Q20 15, 25 18 M20 20 L20 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: index * 0.2 }}
      />
    </svg>,

    // Uttardayitva - Balance Scale
    <svg viewBox="0 0 40 40" className="w-12 h-12">
      <motion.path
        d="M20 8 L20 32 M12 16 L28 16 M8 16 L16 24 M24 24 L32 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: index * 0.2 }}
      />
    </svg>,

    // Sanskriti - Temple/Heritage
    <svg viewBox="0 0 40 40" className="w-12 h-12">
      <motion.path
        d="M8 30 L32 30 M12 26 L28 26 M16 22 L24 22 M20 10 L8 18 L32 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: index * 0.2 }}
      />
    </svg>,

    // Samvad - Interlocking Circles
    <svg viewBox="0 0 40 40" className="w-12 h-12">
      <motion.circle
        cx="16"
        cy="20"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: index * 0.2 }}
      />
      <motion.circle
        cx="24"
        cy="20"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: index * 0.2 + 0.5 }}
      />
    </svg>,

    // Smriti - Spiral of Memory
    <svg viewBox="0 0 40 40" className="w-12 h-12">
      <motion.path
        d="M20 20 Q25 15, 30 20 Q25 25, 20 20 Q15 15, 10 20 Q15 25, 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, delay: index * 0.2 }}
      />
    </svg>,
  ];

  return (
    <motion.div
      className="text-terracotta mb-4"
      animate={{
        y: [0, -2, 0],
        filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      {glyphs[index]}
    </motion.div>
  );
};

export const FoundingEthosSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl lg:text-6xl font-display text-indigo mb-4"
            style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
          >
            VANI के मूल स्तंभ
          </h2>
          <p
            className="md:text-xl text-terracotta font-headings"
            style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
          >
            Founding Ethos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarsData.map((pillar, index) => (
            <motion.div
              key={index}
              className="bg-card border border-sandalwood rounded-lg p-8 shadow-lg shadow-muted-gold/20 hover:shadow-xl hover:shadow-muted-gold/30 transition-all duration-300 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FAF9F6 0%, #F7F5F1 100%)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-muted-gold/5 to-transparent rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 text-center">
                <div className="w-full flex justify-center mb-4">
                  <VedicGlyph index={index} />
                </div>

                <h3
                  className="text-3xl font-display text-terracotta mb-2"
                  style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
                >
                  {pillar.titleHindi}
                </h3>

                <h4 className="text-lg font-headings text-indigo mb-4 font-semibold">
                  {pillar.titleEnglish}
                </h4>

                <p className="text-sm text-muted-gold/80 font-body leading-relaxed italic">
                  {pillar.description}
                </p>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-terracotta/20 via-muted-gold/40 to-terracotta/20"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundingEthosSection;
import Image from "next/image";
