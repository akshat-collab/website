/**
 * Protected MCQ - No answer reveal until submit. Randomized options.
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Mcq, McqOption } from "@/data/datascience/schema";

interface DsMcqQuizProps {
  mcq: Mcq;
  onAnswer: (correct: boolean, selectedId: string) => void;
  alreadyAttempted?: boolean;
  previousCorrect?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function DsMcqQuiz({
  mcq,
  onAnswer,
  alreadyAttempted = false,
  previousCorrect = false,
}: DsMcqQuizProps) {
  const [options, setOptions] = useState<McqOption[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(alreadyAttempted);
  const [correct, setCorrect] = useState<boolean | null>(alreadyAttempted ? previousCorrect : null);

  useEffect(() => {
    setOptions(shuffle(mcq.options));
  }, [mcq.id]);

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    const opt = options.find((o) => o.id === selected);
    const isCorrect = opt?.isCorrect ?? false;
    setCorrect(isCorrect);
    setSubmitted(true);
    onAnswer(isCorrect, selected);
  };

  const correctOpt = options.find((o) => o.isCorrect);
  const selectedOpt = options.find((o) => o.id === selected);

  return (
    <Card>
      <CardHeader>
        <p className="text-sm font-medium">{mcq.question}</p>
        <span className="text-xs text-muted-foreground">
          {mcq.difficulty} • {mcq.type}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={selected ?? ""}
          onValueChange={setSelected}
          disabled={submitted}
          className="space-y-2"
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              className={`flex items-center space-x-2 rounded-lg border p-3 ${
                submitted
                  ? opt.isCorrect
                    ? "border-green-500/50 bg-green-500/10"
                    : selected === opt.id
                      ? "border-red-500/50 bg-red-500/10"
                      : ""
                  : ""
              }`}
            >
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id} className="flex-1 cursor-pointer">
                {opt.text}
              </Label>
              {submitted && opt.isCorrect && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              {submitted && selected === opt.id && !opt.isCorrect && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          ))}
        </RadioGroup>

        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selected === null}>
            Submit Answer
          </Button>
        ) : (
          <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
            {correct ? (
              <p className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Correct!
              </p>
            ) : (
              <p className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" />
                Incorrect.
              </p>
            )}
            {correctOpt?.explanation && (
              <p className="text-muted-foreground">{correctOpt.explanation}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
