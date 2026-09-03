/*
 * Page composition only — content lives in `data/`, shared behaviour lives in
 * `hooks/`, and each section below owns its own local UI state. The one bit
 * of state shared across two sections is the room-intelligence quick match
 * feeding into the full brief form; see `hooks/useStudioBrief.ts`.
 */
import { useEffect, useMemo, useState } from "react";
import { BespokeSection } from "@/components/home/BespokeSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import {
  ConsultationSection,
  ShowroomSection,
} from "@/components/home/ShowroomSection";
import { FaqSection } from "@/components/home/FaqSection";
import { GallerySection } from "@/components/home/GallerySection";
import { HeroSection } from "@/components/home/HeroSection";
import { MaterialSection } from "@/components/home/MaterialSection";
import {
  FloatingWhatsApp,
  ScrollProgressBar,
  SectionDotNav,
} from "@/components/home/PageChrome";
import { ProcessSection } from "@/components/home/ProcessSection";
import { RoomIntelligenceSection } from "@/components/home/RoomIntelligenceSection";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";
import { StorySection } from "@/components/home/StorySection";
import { StudioBriefSection } from "@/components/home/StudioBriefSection";
import { StudioOverviewSection } from "@/components/home/StudioOverviewSection";
import { navSections } from "@/data/studioContent";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useStudioBrief } from "@/hooks/useStudioBrief";

const SECTION_IDS = navSections.map(item => item.id);

const GENERIC_WHATSAPP_MESSAGE =
  "Hi Heaven Furniture Mart, I’d like to know more about a bespoke piece.";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolledPastHero, progress } = useScrollProgress();
  const activeSection = useActiveSection(SECTION_IDS, "top");
  const studioBrief = useStudioBrief();
  useRevealOnScroll();

  const genericWhatsappLink = useMemo(
    () =>
      `https://wa.me/8801960481983?text=${encodeURIComponent(GENERIC_WHATSAPP_MESSAGE)}`,
    []
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="site-shell">
      <ScrollProgressBar progress={progress} />
      <SiteHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(open => !open)}
        onCloseMenu={() => setMenuOpen(false)}
        showStickyNav={scrolledPastHero}
        whatsappLink={genericWhatsappLink}
      />
      <FloatingWhatsApp href={genericWhatsappLink} />

      <HeroSection whatsappLink={genericWhatsappLink} />
      <SectionDotNav activeId={activeSection} />

      <StudioOverviewSection />
      <RoomIntelligenceSection
        onQuickMatch={studioBrief.presetFromQuickMatch}
      />
      <CollectionsSection />
      <MaterialSection />
      <BespokeSection />
      <ProcessSection />
      <StudioBriefSection {...studioBrief} />
      <StorySection />
      <GallerySection />
      <FaqSection />
      <ShowroomSection />
      <ConsultationSection />
      <SiteFooter />
    </main>
  );
}
