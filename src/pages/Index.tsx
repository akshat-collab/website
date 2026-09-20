import { useCallback, useEffect, useState } from "react";
import { SeoHead } from "@/components/SeoHead";
import { LandingSidebar } from "@/components/landing/LandingSidebar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingChallenges } from "@/components/landing/LandingChallenges";
import { LandingLeaderboard } from "@/components/landing/LandingLeaderboard";
import { LandingShowcase } from "@/components/landing/LandingShowcase";
import { LandingCareers } from "@/components/landing/LandingCareers";
import { LandingFooter } from "@/components/landing/LandingFooter";
import "@/styles/landing.css";

const SECTION_IDS = ["home", "challenges", "leaderboard", "showcase", "careers"] as const;
const COLLAPSE_KEY = "techmaster_sidebar_collapsed";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const onCollapsedChange = useCallback((next: boolean) => {
    setCollapsed(next);
    try {
      localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratios = new Map<string, number>();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios.set(entry.target.id, entry.intersectionRatio);
          });
          let best = "home";
          let bestRatio = 0;
          ratios.forEach((r, sid) => {
            if (r > bestRatio) {
              bestRatio = r;
              best = sid;
            }
          });
          if (bestRatio > 0) setActiveSection(best);
        },
        { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const onNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }, []);

  return (
    <div className="tm-landing" data-sidebar-collapsed={collapsed ? "true" : "false"}>
      <SeoHead
        title="TechMaster — Master Code. Win Competitions."
        description="Showcase your skills, compete in real-world coding challenges, and get hired. DSA, 1v1 duels, CTF, and more."
        path="/"
      />

      <LandingSidebar
        activeSection={activeSection}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
      />

      <div className="tm-main pb-20 min-[820px]:pb-0">
        <LandingHero />
        <LandingChallenges />
        <LandingLeaderboard />
        <LandingShowcase />
        <LandingCareers />
        <LandingFooter />
      </div>
    </div>
  );
}
