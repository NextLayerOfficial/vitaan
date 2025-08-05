import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#F9F5EF] text-[#4B2E13] py-12 px-4 text-center border-t border-[#e4dcd0] font-inter">
      <p
        className="text-center mt-2 text-5xl md:text-8xl lg:text-[10rem] xl:text-[11rem] font-bold bg-clip-text text-terracotta bg-gradient-to-b from-secondary/50 to-primary inset-x-0"
        style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
      >
        वितान
      </p>
      <p
        className="text-base text-[#5A3F2B] italic"
        style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
      >
        "जहाँ मन भयमुक्त हो और मस्तक ऊँचा उठे।" – रवीन्द्रनाथ ठाकुर
      </p>
    </footer>
  );
}
