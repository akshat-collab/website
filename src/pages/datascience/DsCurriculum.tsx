import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DS_COURSE_OUTLINE } from "@/data/datascience";
import { isTopicComplete } from "@/features/datascience/dsStorage";
import { getLevelProgress } from "@/features/datascience/dsProgress";
import { SeoHead } from "@/components/SeoHead";

export default function DsCurriculum() {
  return (
    <div className="space-y-8 animate-fade-in">
      <SeoHead
        title="Curriculum | Data Science | TechMasterAI"
        description="8-level learning roadmap: Python → Analytics → Statistics → ML → Capstone"
        path="/datascience/curriculum"
      />

      <div>
        <h1 className="text-3xl font-bold">Curriculum</h1>
        <p className="text-muted-foreground mt-1">Your learning roadmap — follow the path to mastery</p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

        <div className="space-y-6">
          {DS_COURSE_OUTLINE.levels.map((level, idx) => {
            const prog = getLevelProgress(level.id);
            const allComplete = prog.percent === 100;
            const inProgress = prog.completed > 0 && !allComplete;
            const locked = idx > 0 && !DS_COURSE_OUTLINE.levels.slice(0, idx).every((l) => getLevelProgress(l.id).percent === 100);

            return (
              <div key={level.id} className="relative pl-12">
                <div
                  className={cn(
                    "absolute left-2 w-4 h-4 rounded-full border-2 -translate-x-1/2",
                    allComplete && "bg-green-500 border-green-500",
                    inProgress && "bg-primary border-primary animate-pulse",
                    locked && "bg-muted border-muted-foreground/30"
                  )}
                  style={inProgress ? { background: level.color, borderColor: level.color } : {}}
                />
                {locked ? (
                  <Card
                    className={cn(
                      "transition-all duration-300 rounded-2xl overflow-hidden",
                      !locked && "hover:scale-[1.01] hover:shadow-xl hover:border-primary/30",
                      locked && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${level.color}20`, color: level.color }}
                          >
                            {allComplete ? <CheckCircle2 className="h-5 w-5" /> : locked ? <Lock className="h-5 w-5" /> : <span className="font-bold">{level.order}</span>}
                          </div>
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              Level {level.order}: {level.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">{level.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline">{level.durationWeeks}w</Badge>
                          {!locked && (
                            <Badge variant={allComplete ? "default" : "secondary"} className={allComplete ? "bg-green-500/20 text-green-600 border-green-500/30" : ""}>
                              {prog.completed}/{prog.total} topics
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {!locked && (
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4">
                          <Progress value={prog.percent} className="h-2 flex-1 rounded-full" />
                          <span className="text-sm font-medium text-muted-foreground w-12">{prog.percent}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {level.topics.slice(0, 4).map((t) => (
                            <Badge key={t.id} variant="secondary" className="text-xs">
                              {isTopicComplete(t.id) ? "✓" : ""} {t.title}
                            </Badge>
                          ))}
                          {level.topics.length > 4 && <Badge variant="secondary" className="text-xs">+{level.topics.length - 4}</Badge>}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ) : (
                  <Link to={`/datascience/level/${level.order}`}>
                    <Card
                      className={cn(
                        "transition-all duration-300 rounded-2xl overflow-hidden",
                        "hover:scale-[1.01] hover:shadow-xl hover:border-primary/30"
                      )}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                              style={{ background: `${level.color}20`, color: level.color }}
                            >
                              {allComplete ? <CheckCircle2 className="h-5 w-5" /> : <span className="font-bold">{level.order}</span>}
                            </div>
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                Level {level.order}: {level.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-0.5">{level.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="outline">{level.durationWeeks}w</Badge>
                            <Badge variant={allComplete ? "default" : "secondary"} className={allComplete ? "bg-green-500/20 text-green-600 border-green-500/30" : ""}>
                              {prog.completed}/{prog.total} topics
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4">
                          <Progress value={prog.percent} className="h-2 flex-1 rounded-full" />
                          <span className="text-sm font-medium text-muted-foreground w-12">{prog.percent}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {level.topics.slice(0, 4).map((t) => (
                            <Badge key={t.id} variant="secondary" className="text-xs">
                              {isTopicComplete(t.id) ? "✓" : ""} {t.title}
                            </Badge>
                          ))}
                          {level.topics.length > 4 && <Badge variant="secondary" className="text-xs">+{level.topics.length - 4}</Badge>}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

