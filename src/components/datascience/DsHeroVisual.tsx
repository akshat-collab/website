/**
 * Hero visualization - animated data science themed graphic
 * Floating chart elements with subtle animation
 */

export function DsHeroVisual() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="dsHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Animated line chart */}
        <path
          d="M10 70 Q30 50 50 55 T90 30"
          fill="none"
          stroke="url(#dsHeroGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="120"
          strokeDashoffset="120"
          className="animate-[drawLine_1.5s_ease-out_forwards]"
          style={{
            animation: "dsDraw 1.5s ease-out forwards",
          }}
        />
        <style>{`
          @keyframes dsDraw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
        {/* Data points */}
        <circle cx="10" cy="70" r="3" fill="#3b82f6" className="animate-pulse" />
        <circle cx="50" cy="55" r="3" fill="#6366f1" className="animate-pulse" style={{ animationDelay: "0.3s" }} />
        <circle cx="90" cy="30" r="3" fill="#8b5cf6" className="animate-pulse" style={{ animationDelay: "0.6s" }} />
        {/* Bar chart */}
        <rect x="15" y="60" width="8" height="25" rx="2" fill="#22c55e" opacity="0.8" className="animate-pulse" />
        <rect x="28" y="45" width="8" height="40" rx="2" fill="#3b82f6" opacity="0.8" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
        <rect x="41" y="55" width="8" height="30" rx="2" fill="#8b5cf6" opacity="0.8" className="animate-pulse" style={{ animationDelay: "0.4s" }} />
      </svg>
    </div>
  );
}
