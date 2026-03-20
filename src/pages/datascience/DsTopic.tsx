import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Send,
  CheckCircle2,
  Circle,
  AlertTriangle,
} from "lucide-react";
import { DS_COURSE_OUTLINE, DS_CONCEPT_CONTENT, DS_ALL_EXERCISES, DS_ALL_MCQS, DS_ALL_ASSIGNMENTS } from "@/data/datascience";
import { SeoHead } from "@/components/SeoHead";
import { DsMcqQuiz } from "@/components/datascience/DsMcqQuiz";
import {
  markConceptViewed,
  startSession,
  recordTabSwitch,
  recordMcqAttempt,
  getMcqResult,
  submitAssignment,
  isAssignmentSubmitted,
  markTopicComplete,
  markExerciseComplete,
  isExerciseComplete,
} from "@/features/datascience/dsStorage";
import { getTopicProgress } from "@/features/datascience/dsProgress";
import { toast } from "sonner";

export default function DsTopic() {
  const { levelId, topicId } = useParams<{ levelId: string; topicId: string }>();
  const navigate = useNavigate();
  const [tabSwitchWarned, setTabSwitchWarned] = useState(false);
  const [progress, setProgress] = useState(() => (topicId ? getTopicProgress(topicId) : null));

  const levelNum = parseInt(levelId ?? "1", 10);
  const level = DS_COURSE_OUTLINE.levels.find((l) => l.order === levelNum);
  const topic = level?.topics.find((t) => t.id === topicId);
  const concept = topicId ? DS_CONCEPT_CONTENT[topicId] : undefined;

  const exercises = topicId ? DS_ALL_EXERCISES.filter((e) => e.topicId === topicId) : [];
  const mcqs = topicId ? DS_ALL_MCQS.filter((m) => m.topicId === topicId) : [];
  const assignment = topicId ? DS_ALL_ASSIGNMENTS[topicId] ?? null : null;

  const refreshProgress = useCallback(() => {
    if (topicId) setProgress(getTopicProgress(topicId));
  }, [topicId]);

  useEffect(() => {
    if (topicId) {
      markConceptViewed(topicId);
      startSession();
      refreshProgress();
    }
  }, [topicId, refreshProgress]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        const count = recordTabSwitch();
        if (count >= 3 && !tabSwitchWarned) {
          setTabSwitchWarned(true);
          toast.warning("Multiple tab switches detected. Stay focused to maintain integrity.");
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [tabSwitchWarned]);

  const [assignCode, setAssignCode] = useState("");
  const [assignNotes, setAssignNotes] = useState("");

  const handleMcqAnswer = (mcqId: string, correct: boolean, selectedId: string) => {
    recordMcqAttempt(mcqId, selectedId, correct);
    refreshProgress();
  };

  const handleAssignSubmit = () => {
    if (!assignment) return;
    submitAssignment(assignment.id, assignment.topicId, assignCode, assignNotes);
    toast.success("Assignment submitted. It will be reviewed.");
    refreshProgress();
  };

  const handleMarkComplete = () => {
    if (!topicId || !progress?.canMarkComplete) return;
    markTopicComplete(topicId);
    toast.success("Topic marked complete!");
    refreshProgress();
  };

  if (!level || !topic) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Topic not found.</p>
        <Button onClick={() => navigate("/datascience")}>Back to Track</Button>
      </div>
    );
  }

  const assignSubmitted = assignment ? isAssignmentSubmitted(assignment.id) : true;

  return (
    <div className="space-y-6">
      <SeoHead
        title={`${topic.title} | Level ${level.order} | Data Science | TechMasterAI`}
        description={concept?.slice(0, 155) ?? topic.title}
        path={`/datascience/level/${level.order}/topic/${topic.id}`}
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/datascience/level/${level.order}`)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Level {level.order}
      </Button>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full shrink-0"
            style={{ background: level.color }}
          />
          <div>
            <CardTitle className="text-xl">{topic.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Level {level.order}: {level.title}
            </p>
          </div>
        </div>
        {progress?.isComplete && (
          <Badge className="gap-1 bg-green-500/20 text-green-600 border-green-500/30">
            <CheckCircle2 className="h-3 w-3" />
            Complete
          </Badge>
        )}
      </div>

      <Tabs defaultValue="concept" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="concept" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Concept
          </TabsTrigger>
          <TabsTrigger value="practice" className="gap-2">
            <Code2 className="h-4 w-4" />
            Practice
            {progress && progress.exercisesTotal > 0 && (
              <span className="text-xs">
                {progress.exercisesCompleted}/{progress.exercisesTotal}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="assignment" className="gap-2">
            <Send className="h-4 w-4" />
            Assignment
            {assignSubmitted && <CheckCircle2 className="h-3 w-3" />}
          </TabsTrigger>
          <TabsTrigger value="complete" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Complete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="concept">
          <Card>
            <CardContent className="pt-6">
              {concept ? (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-muted prose-pre:rounded-lg prose-pre:p-4 prose-code:before:content-none prose-code:after:content-none">
                  <ReactMarkdown>{concept}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-muted-foreground">Concept content coming soon.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <div className="space-y-6">
            {exercises.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Coding Exercises</h3>
                <div className="grid gap-2">
                  {exercises.map((ex) => {
                    const done = isExerciseComplete(ex.id);
                    return (
                      <Link
                        key={ex.id}
                        to={`/datascience/level/${level.order}/topic/${topic.id}/exercise/${ex.id}`}
                      >
                        <Card className="hover:border-primary/50 transition-colors">
                          <CardContent className="py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {done ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                              )}
                              <span>{ex.title}</span>
                              <Badge variant="outline" className="text-xs">
                                {ex.difficulty}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">Solve →</span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {mcqs.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">MCQs</h3>
                <div className="space-y-4">
                  {mcqs.map((mcq) => {
                    const attempt = getMcqResult(mcq.id);
                    return (
                      <DsMcqQuiz
                        key={mcq.id}
                        mcq={mcq}
                        onAnswer={(correct, selectedId) => handleMcqAnswer(mcq.id, correct, selectedId)}
                        alreadyAttempted={!!attempt}
                        previousCorrect={attempt?.correct}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {exercises.length === 0 && mcqs.length === 0 && (
              <p className="text-muted-foreground">Practice content for this topic coming soon.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="assignment">
          {assignment ? (
            <Card>
              <CardHeader>
                <CardTitle>{assignment.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Rubric: {assignment.rubric.map((r) => `${r.criterion} (${r.points} pts)`).join(", ")}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignSubmitted ? (
                  <p className="text-green-600 dark:text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Assignment submitted. Awaiting review.
                  </p>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm">Code / Solution</Label>
                      <Textarea
                        placeholder="Paste your code or describe your solution..."
                        value={assignCode}
                        onChange={(e) => setAssignCode(e.target.value)}
                        className="mt-1 min-h-[120px] font-mono text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Notes (optional)</Label>
                      <Textarea
                        placeholder="Any additional notes..."
                        value={assignNotes}
                        onChange={(e) => setAssignNotes(e.target.value)}
                        className="mt-1 min-h-[60px]"
                      />
                    </div>
                    <Button onClick={handleAssignSubmit} className="gap-2">
                      <Send className="h-4 w-4" />
                      Submit Assignment
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <p className="text-muted-foreground">No assignment for this topic.</p>
          )}
        </TabsContent>

        <TabsContent value="complete">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {progress?.isComplete ? (
                <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-8 w-8" />
                  <div>
                    <p className="font-semibold">Topic Complete</p>
                    <p className="text-sm text-muted-foreground">
                      You have completed this topic. Progress saved.
                    </p>
                  </div>
                </div>
              ) : progress?.canMarkComplete ? (
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    You have met all requirements. Mark this topic as complete to track your progress.
                  </p>
                  <Button onClick={handleMarkComplete} className="gap-2" size="lg">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Topic Complete
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Complete requirements to unlock</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      {progress?.conceptViewed ? "✓" : "○"} View concept
                    </li>
                    <li>
                      {progress?.exercisesCompleted}/{progress?.exercisesTotal} exercises
                    </li>
                    <li>
                      {progress?.mcqsCorrect}/{progress?.mcqsTotal} MCQs correct (min 60%)
                    </li>
                    {assignment && (
                      <li>
                        {assignSubmitted ? "✓" : "○"} Submit assignment
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
