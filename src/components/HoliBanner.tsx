import { memo } from "react";

const HOLI_COLORS = ["#E53935", "#43A047", "#FB8C00", "#1E88E5", "#8E24AA", "#FDD835", "#EC407A", "#26A69A"];

// Volcano sources - positions where small colors erupt from (spread across screen)
const VOLCANO_SOURCES = [
  [8, 12], [22, 8], [38, 15], [52, 10], [68, 18], [82, 14], [95, 20],
  [5, 35], [18, 42], [35, 38], [50, 45], [65, 40], [80, 48], [92, 35],
  [12, 58], [28, 62], [45, 55], [60, 68], [75, 60], [88, 72],
  [10, 78], [32, 82], [55, 75], [70, 88], [90, 80],
  [42, 25], [55, 32], [30, 50], [72, 55],
];

const HoliBanner = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {/* Continuous volcano-like color eruptions - small particles spreading infinitely */}
      {VOLCANO_SOURCES.flatMap(([left, top], srcIdx) =>
        HOLI_COLORS.map((c, colorIdx) => {
          const particleIdx = srcIdx * HOLI_COLORS.length + colorIdx;
          const size = 3 + (particleIdx % 4);
          const duration = 2.5 + (particleIdx % 4) * 0.8;
          const delay = (particleIdx * 0.15) % 3;
          const angle = (particleIdx * 37) % 360;
          const dist = 60 + (particleIdx % 5) * 15;
          const vx = Math.cos((angle * Math.PI) / 180) * dist;
          const vy = Math.sin((angle * Math.PI) / 180) * dist;
          return (
            <div
              key={particleIdx}
              className="absolute rounded-full volcano-particle"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
                background: c,
                animation: `volcano-erupt ${duration}s ease-out infinite`,
                animationDelay: `${delay}s`,
                boxShadow: `0 0 8px ${c}90`,
                opacity: 0.85,
                transformOrigin: "center center",
                ["--vx" as string]: `${vx}px`,
                ["--vy" as string]: `${vy}px`,
              } as React.CSSProperties}
            />
          );
        })
      )}

      {/* Extra small floating particles - continuous drift, never stop */}
      {[...Array(60)].map((_, i) => (
        <div
          key={`float-${i}`}
          className="absolute rounded-full float-particle"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${(i * 5.7) % 98}%`,
            top: `${(i * 7.3) % 98}%`,
            background: HOLI_COLORS[i % HOLI_COLORS.length],
            animation: `float-spread ${2.5 + (i % 4) * 0.5}s ease-in-out infinite`,
            animationDelay: `${(i * 0.15) % 3}s`,
            boxShadow: `0 0 5px ${HOLI_COLORS[i % HOLI_COLORS.length]}90`,
            opacity: 0.75,
          }}
        />
      ))}

      {/* Happy Holi message - always visible */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 animate-in fade-in zoom-in-95 duration-1000">
        <div
          className="relative px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-2xl shadow-xl border-2"
          style={{
            background: "linear-gradient(135deg, rgba(232,67,147,0.25) 0%, rgba(253,216,53,0.25) 25%, rgba(67,160,71,0.25) 50%, rgba(30,136,229,0.25) 75%, rgba(142,36,170,0.25) 100%)",
            borderColor: "rgba(253,216,53,0.6)",
            boxShadow: "0 4px 20px rgba(233,30,99,0.3), 0 0 30px rgba(253,216,53,0.2)",
          }}
        >
          <p
            className="font-bold text-lg sm:text-xl tracking-wide text-center"
            style={{
              background: "linear-gradient(90deg, #E53935, #FB8C00, #FDD835, #43A047, #1E88E5, #8E24AA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            🎨 Happy Holi! 🎨
          </p>
          <p className="text-xs sm:text-sm mt-1 text-center text-muted-foreground">
            May your life be filled with colors of joy
          </p>
        </div>
      </div>

      <style>{`
        @keyframes volcano-erupt {
          0% { transform: translate(0, 0) scale(0.3); opacity: 0; }
          15% { transform: translate(calc(var(--vx) * 0.3), calc(var(--vy) * 0.3)) scale(0.9); opacity: 0.95; }
          60% { transform: translate(calc(var(--vx) * 0.7), calc(var(--vy) * 0.7)) scale(1); opacity: 0.85; }
          100% { transform: translate(var(--vx), var(--vy)) scale(0.4); opacity: 0; }
        }
        .float-particle {
          animation: float-spread 3.5s ease-in-out infinite;
        }
        @keyframes float-spread {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(5%, -8%) scale(1.2);
            opacity: 0.9;
          }
          50% {
            transform: translate(-3%, 5%) scale(0.9);
            opacity: 0.7;
          }
          75% {
            transform: translate(8%, 3%) scale(1.1);
            opacity: 0.85;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(HoliBanner);
