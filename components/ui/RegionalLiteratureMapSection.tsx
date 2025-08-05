"use client";

import Image from "next/image";

const scripts = [
  { name: "தமிழ்", region: "Tamil Nadu", movement: "Sangam Literature" },
  { name: "తెలుగు", region: "Andhra Pradesh", movement: "Bhakti Movement" },
  { name: "বাংলা", region: "West Bengal", movement: "Kallol Movement" },
  {
    name: "اردو",
    region: "Delhi / UP",
    movement: "Progressive Writers’ Movement",
  },
  {
    name: "देवनागरी",
    region: "North India",
    movement: "Nirala, Premchand Era",
  },
  { name: "ગુજરાતી", region: "Gujarat", movement: "Gandhian Literature" },
  { name: "മലയാളം", region: "Kerala", movement: "Modernist Literature" },
  { name: "ಕನ್ನಡ", region: "Karnataka", movement: "Navodaya Movement" },
  { name: "ଓଡ଼ିଆ", region: "Odisha", movement: "Rebati Era / Romanticism" },
  {
    name: "ਪੰਜਾਬੀ",
    region: "Punjab",
    movement: "Sufi Poetry / Naxalite Movement",
  },
  { name: "संथाली", region: "Jharkhand", movement: "Adivasi Oral Traditions" },
  { name: "অসমীয়া", region: "Assam", movement: "Jonaki Movement" },
  {
    name: "कोंकणी",
    region: "Goa / Konkan",
    movement: "Renaissance Era Literature",
  },
  { name: "मैथिली", region: "Bihar", movement: "Vidyapati Era" },

  {
    name: "नेवारी",
    region: "Nepal Valley",
    movement: "Classical Nepal Bhasa Poetry",
  },
];

export default function RegionalLiteratureMap() {
  return (
    <section className="relative bg-[#F9F5EF] py-20 px-6 md:px-12 lg:px-24 text-[#321B0F] font-inter overflow-hidden">
      {/* India map background */}
      <div className="absolute inset-0 z-10 opacity-15 md:flex items-center scale-125 md:visible hidden  ">
        <Image
          src="/india.png"
          alt="India Map"
          width={800}
          height={1200}
          className="object-contain w-full mx-auto "
        />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2
          className="text-3xl md:text-6xl font-semibold tracking-tight"
          style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
        >
          भाषायी विविधता
        </h2>
        <p className="mt-2 text-lg italic text-[#4A3B2A]">
          From Sangam to Sufi, from Vedas to Verma — India writes in many
          tongues.
        </p>
      </div>

      {/* Script Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {scripts.map((script, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md border border-[#e4dcd0] rounded-xl p-5 text-center shadow-sm hover:shadow-md transition"
          >
            <h3
              className="text-3xl"
              style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
            >
              {script.name}
            </h3>
            <p className="mt-2 text-sm font-medium text-[#5A3F2B]">
              {script.region}
            </p>
            <p className="text-xs italic text-[#7B6650]">{script.movement}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
