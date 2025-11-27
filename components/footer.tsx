export default function Footer() {
  return (
    <footer className="bg-[#F9F5EF] text-[#4B2E13] border-t border-[#e4dcd0] text-center py-12 px-4 font-inter overflow-visible">
      <p
        className="text-center mt-2 text-3xl md:text-4xl lg:text-[7rem] xl:text-[7rem] font-bold bg-clip-text text-terracotta bg-gradient-to-b from-secondary/50 to-primary inset-x-0"
        style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
      >
        वितान
      </p>
      <h2
        className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
        style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
      >
        एक अक्षर से शुरू हुई यह यात्रा आज एक सुंदर साहित्यिक परिवार बन चुकी है।
      </h2>

      <p
        className="text-base text-[#5A3F2B] max-w-2xl mx-auto"
        style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}
      >
        आइए, इस सृजनात्मक यात्रा का हिस्सा बनें और इसकी निरंतरता में अपना योगदान
        दें।
      </p>
    </footer>
  );
}
