/**
 * Data Science Professional Certificate
 * Professional design with TMAI logo, digital seal, blur when locked
 */

import { cn } from "@/lib/utils";

const NAVY = "#0f172a";
const SLATE_800 = "#1e293b";
const PRIMARY = "#3b82f6";
const ACCENT = "#8b5cf6";

export interface DsCertificateProps {
  recipientName: string;
  completionDate: string;
  locked?: boolean;
  className?: string;
}

/** Digital signature seal - TMAI certified */
function TmaiSignature() {
  return (
    <svg viewBox="0 0 100 50" className="w-24 h-12">
      <circle cx="50" cy="25" r="20" fill="none" stroke={NAVY} strokeWidth="2" />
      <circle cx="50" cy="25" r="16" fill="none" stroke={NAVY} strokeWidth="1" opacity="0.4" />
      <text x="50" y="29" textAnchor="middle" fill={NAVY} style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}>
        TMAI
      </text>
      <path d="M22 42 Q50 38 78 42" stroke={NAVY} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function DsCertificate({
  recipientName,
  completionDate,
  locked = false,
  className,
}: DsCertificateProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-500",
        locked && "pointer-events-none select-none",
        !locked && "shadow-primary/10",
        className
      )}
    >
      {/* Certificate content - blurred when locked */}
      <div className={cn("relative transition-all duration-500", locked && "blur-md")}>
      {/* Decorative border frame */}
      <div className="absolute inset-0 rounded-lg border-[3px] border-slate-200/80 pointer-events-none" />
      <div className="absolute inset-3 rounded-md border border-slate-100 pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row min-h-[380px]">
        {/* Left accent - professional gradient */}
        <div
          className="w-full sm:w-24 shrink-0 flex flex-col items-center justify-center py-8 sm:py-10 gap-4"
          style={{
            background: `linear-gradient(165deg, ${PRIMARY} 0%, ${ACCENT} 50%, #6366f1 100%)`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <img src="/ds-logo.svg" alt="Data Science" className="w-14 h-14 sm:w-16 sm:h-16 opacity-95 drop-shadow-lg" />
          <div className="hidden sm:block h-20 w-px bg-white/25" />
          <span className="text-[9px] font-bold text-white/95 tracking-[0.25em] rotate-0 sm:-rotate-90 sm:mt-6 uppercase">
            Professional
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 sm:p-10 flex flex-col min-w-0">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <img src="/tmai-logo-dark.png" alt="Tech Master AI" className="h-11 w-auto" />
              <div>
                <div className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  Tech Master AI
                </div>
                <div className="text-[9px] tracking-[0.15em] text-slate-400 uppercase">
                  Built for Developers
                </div>
              </div>
            </div>
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 border-2"
              style={{ borderColor: SLATE_800, background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}
            >
              <span className="text-sm font-bold tracking-wider" style={{ color: SLATE_800 }}>
                TMAI
              </span>
            </div>
          </div>

          {/* Certificate title - formal typography */}
          <div className="mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent mb-4" />
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight uppercase"
              style={{ color: NAVY, fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Certificate of Completion
            </h2>
            <p className="text-sm font-medium mt-2 tracking-wide" style={{ color: ACCENT }}>
              Data Science Professional Track
            </p>
          </div>

          <p className="text-sm text-slate-500 mb-3 tracking-wide">This is to certify that</p>

          {/* Recipient name - prominent, formal */}
          <div
            className="text-3xl sm:text-4xl font-bold mb-8 break-words pb-4 border-b-2"
            style={{ color: NAVY, fontFamily: "Georgia, 'Times New Roman', serif", borderColor: "rgba(15, 23, 42, 0.15)" }}
          >
            {recipientName || "—"}
          </div>

          {/* Body - professional copy */}
          <p
            className="text-sm text-slate-600 leading-relaxed mb-8 flex-1"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            has successfully completed the Professional Data Science curriculum at Tech Master AI,
            demonstrating proficiency in Python Foundations, Advanced Python, Data Analytics,
            Statistics, Graph Theory, Machine Learning, Advanced ML, and Capstone Projects.
            This certification attests to competency in data analysis, machine learning,
            and real-world data science applications.
          </p>

          {/* Date - formal */}
          <div className="text-sm mb-8" style={{ color: SLATE_800 }}>
            <span className="font-semibold tracking-wide">Date of Completion:</span>{" "}
            <span className="font-medium">{completionDate || "—"}</span>
          </div>

          {/* Footer - signature block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-8 border-t-2 border-slate-100">
            <div className="text-[10px] text-slate-400 tracking-widest">EST. 2026</div>
            <div className="flex flex-col items-end">
              <div className="mb-2">
                <TmaiSignature />
              </div>
              <div className="text-sm font-bold tracking-wide" style={{ color: NAVY }}>
                AKSHAT SINGH
              </div>
              <div className="text-xs text-slate-500">Chief Executive Officer</div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">Tech Master AI</div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Lock overlay - sharp, above blurred content */}
      {locked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-lg bg-slate-900/40 backdrop-blur-sm">
          <div className="text-center text-white drop-shadow-lg">
            <svg
              className="w-14 h-14 mx-auto mb-4 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-base font-semibold mb-2">Certificate Locked</p>
            <p className="text-sm text-slate-200 max-w-xs">
              Complete all 8 levels and topics to unlock. Completion date will be set automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
