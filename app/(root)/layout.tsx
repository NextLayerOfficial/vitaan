import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { Inter } from "next/font/google";
import { Tiro_Devanagari_Hindi } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tiro = Tiro_Devanagari_Hindi({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-tiro",
});

export const metadata = {
  title: "Vitaan",
  description: "A literary alumni space rooted in Indian heritage",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${inter.variable} ${tiro.variable}`}>
      <Navbar />
      <div className="bg-ivory">{children}</div>
      <Footer />
    </main>
  );
}
