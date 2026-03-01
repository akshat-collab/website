import { useState } from "react";
import { cn } from "@/lib/utils";

interface StateFlowButtonsProps {
  correctOrder: string;
  onComplete: (sequence: string) => void;
  /** Optional: custom button labels (default: 1,2,3,4) */
  buttons?: string[];
}

export function StateFlowButtons({ correctOrder, onComplete, buttons }: StateFlowButtonsProps) {
  const [sequence, setSequence] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "correct">("idle");
  const labels = buttons ?? ["1", "2", "3", "4"];

  const handlePress = (n: string) => {
    const next = sequence + n;
    setSequence(next);
    if (next === correctOrder) {
      setFeedback("correct");
      onComplete(next);
    } else if (correctOrder.startsWith(next)) {
      setFeedback("idle");
    } else {
      setFeedback("wrong");
      setTimeout(() => {
        setSequence("");
        setFeedback("idle");
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-slate-400">Press in the correct order:</p>
      <div className="flex gap-3">
        {labels.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => handlePress(n)}
            className={cn(
              "w-14 h-14 rounded-lg font-mono text-lg font-bold border-2 transition-all",
              "bg-slate-900 border-emerald-500/30 text-emerald-400",
              "hover:border-emerald-500 hover:bg-emerald-500/10",
              feedback === "wrong" && "animate-pulse border-red-500/50"
            )}
          >
            {n}
          </button>
        ))}
      </div>
      {sequence && (
        <p className="text-sm font-mono text-slate-500">
          Sequence: {sequence.split("").join(" → ")}
        </p>
      )}
    </div>
  );
}
