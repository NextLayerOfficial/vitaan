import HeroSection from "@/components/ui/heroSection";
import CulturalQuotesSection from "../../components/ui/qoute";
import { JournalismLegacySection } from "@/components/ui/JournalismLegacySectionPage";
import FoundingEthosSection from "@/components/ui/FoundingEthosSectionPage";
import RegionalLiteratureMap from "@/components/ui/RegionalLiteratureMapSection";

export default function Home() {
  return (
    <main className="flex-1 bg-ivory ">
      <HeroSection />
      <JournalismLegacySection />
      <RegionalLiteratureMap />
      <FoundingEthosSection />
      <CulturalQuotesSection />
    </main>
  );
}
