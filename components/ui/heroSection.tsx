import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function HeroSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#F9F5EF] text-[#321B0F] py-32  px-6 md:px-12 lg:px-24 font-inter">
      {/* Background Texture */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage: `url('/wall.png')`,
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1
          className="text-5xl md:text-7xl font-semibold tracking-tight"
          style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
        >
          वितान
        </h1>

        {/* Hindi poetic line */}
        <p
          className="mt-2 text-lg text-[#5A3F2B] font-normal"
          style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
        >
          साहित्यिक संवादों की देहलीज़ पर आपका स्वागत है
        </p>

        {/* Tagline */}
        <p className="mt-4 text-xl italic text-[#3B2C1A]">
          Where the soul of Indian literature gathers across time.
        </p>

        {/* Subheading */}
        <p className="mt-6 text-base md:text-lg text-[#4A3B2A] max-w-2xl mx-auto">
          A <span className="font-semibold">sabha of memory</span>, manuscripts,
          and modern voices — echoing through generations.
        </p>

        {/* CTA */}
        {session ? (
          <Link
            href="/dashboard"
            className="inline-block mt-10 bg-[#4B2E13] hover:bg-[#603c1d] text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide shadow-md transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/sign-in"
              className="bg-[#4B2E13] hover:bg-[#603c1d] text-white px-6 py-3 rounded-full text-sm font-medium shadow-md transition"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-white hover:bg-[#f2e9dc] border border-[#4B2E13] text-[#4B2E13] px-6 py-3 rounded-full text-sm font-medium shadow-md transition"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
