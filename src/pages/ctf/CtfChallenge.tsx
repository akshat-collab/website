import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Flag, CheckCircle2 } from "lucide-react";
import { CTF_CHALLENGES } from "@/features/ctf/ctfChallenges";
import { isSolved } from "@/features/ctf/ctfStorage";
import { ChallengeWrapper } from "@/components/ctf/ChallengeWrapper";
import { StateFlowButtons } from "@/components/ctf/StateFlowButtons";
import { SeoHead } from "@/components/SeoHead";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function CtfChallenge() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [stateFlowState, setStateFlowState] = useState<Record<string, unknown>>({});

  const challenge = CTF_CHALLENGES.find((c) => c.id === id);
  const solved = challenge ? isSolved(challenge.id) : false;

  if (!challenge) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Challenge not found.</p>
        <Button onClick={() => navigate("/ctf")}>Back to Challenges</Button>
      </div>
    );
  }

  const seoDescription =
    challenge.description.length > 155
      ? challenge.description.slice(0, 152) + "..."
      : challenge.description;
  const seoKeywords = [
    "CTF",
    challenge.type,
    challenge.difficulty,
    "TechMasterAI",
    "coding challenge",
  ].join(", ");

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: challenge.title,
      description: challenge.description,
      url: `https://techmasterai.org/ctf/challenge/${challenge.id}`,
      learningResourceType: challenge.type,
      educationalLevel: challenge.difficulty,
      isPartOf: {
        "@type": "WebSite",
        name: "TechMasterAI CTF",
        url: "https://techmasterai.org/ctf",
      },
    };
    let el = document.getElementById("ctf-challenge-jsonld");
    if (el) el.remove();
    el = document.createElement("script");
    el.id = "ctf-challenge-jsonld";
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
    return () => el?.remove();
  }, [challenge.id, challenge.title, challenge.description, challenge.type, challenge.difficulty]);

  return (
    <div className="space-y-6">
      <SeoHead
        title={`${challenge.title} | CTF`}
        description={seoDescription}
        path={`/ctf/challenge/${challenge.id}`}
        keywords={seoKeywords}
        ogType="article"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/ctf")}
        className="gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Flag className="h-5 w-5 text-primary" />
                {challenge.title}
              </CardTitle>
              <CardDescription className="mt-1">{challenge.description}</CardDescription>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className={DIFFICULTY_COLORS[challenge.difficulty]}>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline">{challenge.points} pts</Badge>
              {solved && (
                <Badge className="bg-emerald-500/20 text-emerald-400 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Solved
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {solved ? (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
              <p className="text-emerald-400 font-medium">Challenge solved.</p>
              <Button variant="outline" size="sm" onClick={() => navigate("/ctf")} className="mt-4">
                Back to Challenges
              </Button>
            </div>
          ) : (
            <ChallengeWrapper
              challenge={challenge}
              challengeState={
                challenge.type === "state-flow"
                  ? { ...stateFlowState, sequence: stateFlowState.sequence }
                  : stateFlowState
              }
              onStateChange={setStateFlowState}
            >
              {challenge.type === "state-flow" && (
                <StateFlowButtons
                  correctOrder={(challenge.content.correctOrder as string) ?? "1324"}
                  onComplete={(seq) => setStateFlowState((s) => ({ ...s, sequence: seq }))}
                  buttons={challenge.content.buttons as string[] | undefined}
                />
              )}
            </ChallengeWrapper>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
