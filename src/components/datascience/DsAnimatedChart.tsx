/**
 * Animated data visualization for Data Science dashboard
 * Bar chart with staggered entrance animation
 */

import { useEffect, useRef, useState } from "react";

const LEVEL_DATA = [
  { label: "Python", value: 100, color: "#22c55e" },
  { label: "Advanced", value: 85, color: "#eab308" },
  { label: "Analytics", value: 90, color: "#3b82f6" },
  { label: "Statistics", value: 75, color: "#ef4444" },
  { label: "Graphs", value: 60, color: "#a855f7" },
  { label: "ML Core", value: 50, color: "#78716c" },
  { label: "Advanced ML", value: 30, color: "#171717" },
  { label: "Capstone", value: 0, color: "#f59e0b" },
];

const MAX_VALUE = 100;

export function DsAnimatedChart() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-md mx-auto">
      <div className="text-sm font-medium text-muted-foreground mb-3 text-center">
        Learning Progress by Level
      </div>
      <div className="space-y-2">
        {LEVEL_DATA.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-16 text-xs text-muted-foreground shrink-0 truncate">
              {item.label}
            </span>
            <div className="flex-1 h-6 rounded-md bg-muted/50 overflow-hidden">
              <div
                className="h-full rounded-md transition-all duration-700 ease-out"
                style={{
                  width: animated ? `${(item.value / MAX_VALUE) * 100}%` : "0%",
                  backgroundColor: item.color,
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            </div>
            <span className="w-8 text-xs text-right text-muted-foreground">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
