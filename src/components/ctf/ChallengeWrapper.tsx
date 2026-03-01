import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Timer } from "lucide-react";
import { toast } from "sonner";
import { TerminalInput } from "./TerminalInput";
import { UnlockAnimation } from "./UnlockAnimation";
import { validateAndDeriveFlag } from "@/features/ctf/ctfCore";
import { markSolved, getHintsUsed, recordHint } from "@/features/ctf/ctfStorage";
import type { CtfChallenge } from "@/features/ctf/ctfChallenges";

interface ChallengeWrapperProps {
  challenge: CtfChallenge;
  children?: React.ReactNode;
  challengeState?: Record<string, unknown>;
  onStateChange?: (state: Record<string, unknown>) => void;
}

export function ChallengeWrapper({
  challenge,
  children,
  challengeState = {},
  onStateChange,
}: ChallengeWrapperProps) {
  const [input, setInput] = useState("");
  const [capturedFlag, setCapturedFlag] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const hintsUsed = getHintsUsed(challenge.id);

  const timeLimit = challenge.type === "time-behavior" ? (challenge.content.timeLimit as number) : 0;
  const isTimeBased = challenge.type === "time-behavior" && timeLimit > 0;

  useEffect(() => {
    if (!isTimeBased) return;
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 100);
    return () => clearInterval(id);
  }, [isTimeBased]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = validateAndDeriveFlag(
      challenge.id,
      input,
      (s) => challenge.validate(s, challengeState)
    );
    if (result.valid && result.flag) {
      const penalty = hintsUsed * challenge.hintPenalty;
      const timePenalty = isTimeBased && elapsed > timeLimit ? Math.floor((elapsed - timeLimit) * 2) : 0;
      const netPoints = Math.max(0, challenge.points - penalty - timePenalty);
      markSolved(challenge.id, challenge.points, penalty + timePenalty);
      toast.success(`Flag captured! +${netPoints} points`);
      setCapturedFlag(result.flag);
    } else {
      setError("Incorrect. Try again.");
    }
  };

  const handleHint = () => {
    recordHint(challenge.id);
    onStateChange?.({ ...challengeState, hintRevealed: true });
  };

  const handleTerminalCommand = (cmd: string) => {
    const run = (challengeState?.commandsRun as string) ?? "";
    const next = run ? `${run},${cmd}` : cmd;
    onStateChange?.({ ...challengeState, commandsRun: next });
  };

  const isStateOrTerminalReady =
    (challenge.type === "state-flow" || challenge.type === "terminal") &&
    challenge.validate("", challengeState);

  if (capturedFlag) {
    return <UnlockAnimation flag={capturedFlag} onComplete={() => {}} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
          {challenge.type.replace("-", " ")}
        </Badge>
        <Badge variant="outline">{challenge.difficulty}</Badge>
        <Badge variant="outline">{challenge.points} pts</Badge>
        {isTimeBased && (
          <Badge variant="outline" className="gap-1 border-amber-500/30 text-amber-400">
            <Timer className="h-3 w-3" />
            {elapsed}s / {timeLimit}s
          </Badge>
        )}
      </div>

      {challenge.type === "terminal" && (
        <TerminalInput
          outputs={(challenge.content.outputs as Record<string, string>) ?? {}}
          onCommandRun={handleTerminalCommand}
          onSubmit={() => {}}
        />
      )}

      {children}

      {challenge.type !== "terminal" && challenge.type !== "state-flow" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="TMAI{...} or your answer..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono bg-black/50 border-emerald-500/30 text-emerald-400 placeholder:text-slate-500"
            />
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Submit
            </Button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </form>
      )}

      {isStateOrTerminalReady && (
        <div className="space-y-4">
          <p className="text-sm text-emerald-400">Flag unlocked. Capture it:</p>
          <Button
            onClick={() => {
              if (challenge.validate("", challengeState)) {
                const solution =
                  challenge.type === "state-flow"
                    ? (challengeState?.sequence as string) ?? ""
                    : (challengeState?.commandsRun as string) ?? "";
                const { flag } = validateAndDeriveFlag(challenge.id, solution, () => true);
                if (flag) {
                  const penalty = hintsUsed * challenge.hintPenalty;
                  const netPoints = Math.max(0, challenge.points - penalty);
                  markSolved(challenge.id, challenge.points, penalty);
                  toast.success(`Flag captured! +${netPoints} points`);
                  setCapturedFlag(flag);
                }
              }
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Capture Flag
          </Button>
        </div>
      )}

      {challenge.hints.length > 0 && (
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleHint}
            className="gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          >
            <Lightbulb className="h-4 w-4" />
            Hint ({hintsUsed}/{challenge.hints.length}) -{challenge.hintPenalty} pts each
          </Button>
          {hintsUsed > 0 && (
            <p className="mt-2 text-sm text-amber-400/80 p-3 rounded bg-amber-950/20 border border-amber-500/20">
              {challenge.hints[hintsUsed - 1]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
