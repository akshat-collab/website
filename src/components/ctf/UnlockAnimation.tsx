import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface UnlockAnimationProps {
  flag: string;
  onComplete?: () => void;
  className?: string;
}

export function UnlockAnimation({ flag, onComplete, className }: UnlockAnimationProps) {
  const [phase, setPhase] = useState<"reveal" | "done">("reveal");

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 2200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 rounded-xl border-2 border-emerald-500/40",
        "bg-gradient-to-b from-emerald-950/40 to-slate-950/60",
        "shadow-[0_0_24px_rgba(16,185,129,0.15)]",
        "animate-in fade-in zoom-in-95 duration-500",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full p-3 mb-4 transition-all duration-700",
          "bg-emerald-500/20",
          phase === "done" && "scale-110 bg-emerald-500/30"
        )}
      >
        <CheckCircle2
          className={cn(
            "h-14 w-14 text-emerald-400 transition-all duration-500",
            phase === "done" && "text-emerald-300"
          )}
        />
      </div>
      <p className="text-sm text-slate-400 mb-3 uppercase tracking-wider">Flag captured</p>
      <code
        className={cn(
          "font-mono text-base sm:text-lg text-emerald-400 px-4 py-2.5 rounded-lg",
          "bg-black/60 border border-emerald-500/30",
          "transition-all duration-500",
          phase === "done" && "animate-pulse"
        )}
      >
        {flag}
      </code>
    </div>
  );
}
