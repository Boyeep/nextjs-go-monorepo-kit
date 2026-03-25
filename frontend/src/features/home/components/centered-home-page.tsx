import { AboutSection } from "@/features/home/components/about-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { WhyChooseSection } from "@/features/home/components/why-choose-section";

export function CenteredHomePage() {
  return (
    <main className="relative overflow-x-hidden px-0 pb-12">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[7%] left-[6%] h-36 w-36 rounded-full bg-[rgba(255,194,161,0.42)] blur-3xl max-[720px]:top-[10%] max-[720px]:left-[3%] max-[720px]:h-24 max-[720px]:w-24 max-[720px]:bg-[rgba(255,194,161,0.18)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[14%] right-[8%] h-48 w-48 rounded-full bg-[rgba(31,111,120,0.14)] blur-3xl max-[720px]:top-[12%] max-[720px]:right-[4%] max-[720px]:h-28 max-[720px]:w-28 max-[720px]:bg-[rgba(31,111,120,0.1)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[14%] top-[12%] h-[58svh] rounded-[48px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.5),rgba(255,255,255,0.08)_58%,transparent_82%)] blur-2xl max-[720px]:inset-x-[10%] max-[720px]:top-[14%] max-[720px]:h-[46svh] max-[720px]:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.66),rgba(255,255,255,0.12)_60%,transparent_82%)]"
      />

      <HeroSection />
      <WhyChooseSection />
      <AboutSection />
    </main>
  );
}
