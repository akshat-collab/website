import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { DS_COURSE_OUTLINE } from "@/data/datascience";
import { isTopicComplete } from "@/features/datascience/dsStorage";
import { getLevelProgress } from "@/features/datascience/dsProgress";
import { SeoHead } from "@/components/SeoHead";

export default function DsLevel() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const levelNum = parseInt(levelId ?? "1", 10);
  const level = DS_COURSE_OUTLINE.levels.find((l) => l.order === levelNum);

  if (!level) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Level not found.</p>
        <Button onClick={() => navigate("/datascience")}>Back to Track</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SeoHead
        title={`Level ${level.order}: ${level.title} | Data Science | TechMasterAI`}
        description={level.description}
        path={`/datascience/level/${level.order}`}
      />

      <Button variant="ghost" size="sm" onClick={() => navigate("/datascience")} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full shrink-0"
          style={{ background: level.color }}
        />
        <div>
          <h1 className="text-2xl font-bold">Level {level.order}: {level.title}</h1>
          <p className="text-muted-foreground">{level.description}</p>
        </div>
        <Badge variant="outline">{level.durationWeeks} weeks</Badge>
        {(() => {
          const prog = getLevelProgress(level.id);
          return prog.total > 0 ? (
            <Badge variant="secondary">
              {prog.completed}/{prog.total} topics
            </Badge>
          ) : null;
        })()}
      </div>

      <div className="grid gap-3">
        <h2 className="text-lg font-semibold">Topics</h2>
        {level.topics.map((topic, i) => {
          const complete = isTopicComplete(topic.id);
          return (
            <Card key={topic.id} className={complete ? "border-green-500/30" : ""}>
              <CardHeader className="py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {complete ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <span className="text-muted-foreground shrink-0">{i + 1}.</span>
                    )}
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {topic.title}
                      </CardTitle>
                      <CardDescription>
                        Concept, exercises, MCQs, mini assignment
                      </CardDescription>
                    </div>
                  </div>
                  <Link
                    to={`/datascience/level/${level.order}/topic/${topic.id}`}
                    className="shrink-0"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Learn
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
