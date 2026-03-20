import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle2, Loader2 } from "lucide-react";
import { DS_COURSE_OUTLINE, DS_ALL_EXERCISES } from "@/data/datascience";
import { SeoHead } from "@/components/SeoHead";
import { executeCode } from "@/services/codeExecutionService";
import { parseDsInputForExecution } from "@/features/datascience/dsExerciseRunner";
import { markExerciseComplete } from "@/features/datascience/dsStorage";
import { toast } from "sonner";

const STORAGE_KEY = (id: string) => `ds_code_${id}`;

export default function DsExercise() {
  const { levelId, topicId, exerciseId } = useParams<{
    levelId: string;
    topicId: string;
    exerciseId: string;
  }>();
  const navigate = useNavigate();

  const levelNum = parseInt(levelId ?? "1", 10);
  const level = DS_COURSE_OUTLINE.levels.find((l) => l.order === levelNum);
  const topic = level?.topics.find((t) => t.id === topicId);
  const exercise = DS_ALL_EXERCISES.find((e) => e.id === exerciseId);

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "running" | "success" | "wrong" | "error">("idle");
  const [results, setResults] = useState<Array<{ passed: boolean; input?: unknown; expected?: unknown; actual?: unknown }>>([]);

  useEffect(() => {
    if (exerciseId) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY(exerciseId));
        if (saved) setCode(saved);
        else setCode(exercise?.boilerplate?.python ?? "");
      } catch {
        setCode(exercise?.boilerplate?.python ?? "");
      }
    }
  }, [exerciseId, exercise?.boilerplate?.python]);

  useEffect(() => {
    if (code && exerciseId) {
      try {
        localStorage.setItem(STORAGE_KEY(exerciseId), code);
      } catch {
        /* ignore */
      }
    }
  }, [code, exerciseId]);

  const buildTestCases = () => {
    if (!exercise) return [];
    const boilerplate = exercise.boilerplate.python ?? "";
    return exercise.testCases
      .map((tc) => {
        const inputStr = typeof tc.input === "string" ? tc.input : JSON.stringify(tc.input);
        const inputObj = parseDsInputForExecution(inputStr, boilerplate);
        if (!inputObj) return null;
        return { input: inputObj, expected: tc.expectedOutput };
      })
      .filter((x): x is { input: Record<string, unknown>; expected: unknown } => x !== null);
  };

  const handleRun = async () => {
    if (!exercise) return;
    setStatus("running");
    setResults([]);

    const testCases = buildTestCases();
    if (testCases.length === 0) {
      setStatus("error");
      toast.error("Could not parse test cases.");
      return;
    }

    const paramOrder = Object.keys(testCases[0].input);
    const fnMatch = (exercise.boilerplate.python ?? "").match(/def\s+(\w+)\s*\(/);
    const fnName = fnMatch?.[1] ?? "solution";

    try {
      const { results: res, overallStatus } = await executeCode(
        code,
        "python",
        testCases,
        true,
        { functionName: fnName, paramOrder }
      );

      setResults(
        res.map((r) => ({
          passed: r.passed,
          input: r.input,
          expected: r.expected,
          actual: r.actual,
        }))
      );

      if (overallStatus === "success") {
        setStatus("success");
        markExerciseComplete(exercise.id);
        toast.success("All test cases passed!");
      } else {
        setStatus("wrong");
      }
    } catch {
      setStatus("error");
      toast.error("Execution failed.");
    }
  };

  if (!level || !topic || !exercise) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Exercise not found.</p>
        <Button onClick={() => navigate("/datascience")}>Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SeoHead
        title={`${exercise.title} | ${topic.title} | Data Science`}
        description={exercise.description}
        path={`/datascience/level/${level.order}/topic/${topic.id}/exercise/${exercise.id}`}
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/datascience/level/${level.order}/topic/${topic.id}`)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {topic.title}
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <CardTitle>{exercise.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{exercise.description}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{exercise.difficulty}</Badge>
                <Badge variant="outline">{exercise.type}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Your solution (Python)</p>
            <div className="rounded-lg overflow-hidden border">
              <Editor
                height="280px"
                defaultLanguage="python"
                value={code}
                onChange={(v) => setCode(v ?? "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleRun}
            disabled={status === "running"}
            className="gap-2"
          >
            {status === "running" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Run & Submit
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Test results</p>
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 rounded-lg border p-2 text-sm ${
                    r.passed ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"
                  }`}
                >
                  {r.passed ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  ) : (
                    <span className="text-red-500 shrink-0">✗</span>
                  )}
                  <span>Test {i + 1}: {r.passed ? "Passed" : "Failed"}</span>
                  {!r.passed && r.expected !== undefined && (
                    <span className="text-muted-foreground">
                      Expected: {JSON.stringify(r.expected)}, Got: {JSON.stringify(r.actual)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
