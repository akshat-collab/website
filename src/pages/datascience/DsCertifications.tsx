import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Award, Lock, CheckCircle2, Save, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DS_BADGES } from "@/data/datascience";
import { hasBadge } from "@/features/datascience/dsStorage";
import {
  getCertificateData,
  setCertificateData,
  getTrackCompletedAt,
  setTrackCompletedAt,
  type CertificateData,
} from "@/features/datascience/dsStorage";
import { isDataScienceTrackComplete } from "@/features/datascience/dsProgress";
import { DsCertificate } from "@/components/datascience/DsCertificate";
import { SeoHead } from "@/components/SeoHead";
import { toast } from "sonner";

function formatDateForInput(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export default function DsCertifications() {
  const [trackComplete, setTrackComplete] = useState(false);
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const complete = isDataScienceTrackComplete();
    setTrackComplete(complete);
    if (complete && !getTrackCompletedAt()) {
      setTrackCompletedAt(Date.now());
    }
    const stored = getCertificateData();
    const completedAt = getTrackCompletedAt();
    setCertData(stored);
    if (stored) {
      setName(stored.recipientName);
      setDate(formatDateForInput(stored.completionDate) || (completedAt ? formatDateForInput(new Date(completedAt).toISOString()) : formatDateForInput(new Date().toISOString())));
    } else {
      // Default to track completion date when all modules done
      setDate(completedAt ? formatDateForInput(new Date(completedAt).toISOString()) : formatDateForInput(new Date().toISOString()));
    }
  }, []);

  const handleSaveCertificate = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Please enter your name");
      return;
    }
    const completedAt = getTrackCompletedAt();
    const dateStr = date || (completedAt ? new Date(completedAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
    setCertificateData(trimmedName, dateStr);
    setCertData({ recipientName: trimmedName, completionDate: dateStr });
    toast.success("Certificate details saved");
  };

  const displayName = trackComplete ? (certData?.recipientName || name.trim() || "Your Name") : "Your Name";
  const displayDate = trackComplete
    ? (() => {
        const completedAt = getTrackCompletedAt();
        const d = certData?.completionDate || date || (completedAt ? new Date(completedAt).toISOString() : null);
        if (!d) return "—";
        const parsed = new Date(d);
        return isNaN(parsed.getTime()) ? "—" : parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      })()
    : "—";

  return (
    <div className="space-y-8 animate-fade-in">
      <SeoHead
        title="Certifications | Data Science | TechMasterAI"
        description="Earn badges and professional certificate: Python → Analyst → ML Engineer → Data Scientist"
        path="/datascience/certifications"
      />

      <div>
        <h1 className="text-3xl font-bold">Certifications</h1>
        <p className="text-muted-foreground mt-1">Badges and professional certificate</p>
      </div>

      {/* Badge Progression */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Badge Progression
          </CardTitle>
          <CardDescription>Unlock badges as you complete levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DS_BADGES.map((b) => {
              const earned = hasBadge(b.id);
              return (
                <Card
                  key={b.id}
                  className={cn(
                    "rounded-xl overflow-hidden transition-all duration-300",
                    earned
                      ? "border-amber-500/40 bg-amber-500/5 shadow-lg shadow-amber-500/10"
                      : "opacity-75 border-border"
                  )}
                >
                  <CardContent className="pt-6 pb-6">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl",
                          earned ? "bg-amber-500/20" : "bg-muted"
                        )}
                      >
                        {earned ? (
                          <CheckCircle2 className="h-8 w-8 text-amber-500" />
                        ) : (
                          <Lock className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-4xl" aria-hidden>
                        {b.icon}
                      </span>
                      <div>
                        <p className="font-semibold">{b.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {b.description}
                        </p>
                      </div>
                      <Badge
                        variant={earned ? "default" : "outline"}
                        className={
                          earned ? "bg-amber-500/20 text-amber-600 border-amber-500/30" : ""
                        }
                      >
                        {earned ? "Earned" : "Locked"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Professional Data Scientist Certificate */}
      <Card className="rounded-2xl border-2 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Professional Data Scientist Certificate
          </CardTitle>
          <CardDescription>
            {trackComplete
              ? "Add your name to the certificate after completing all modules"
              : "Complete all 8 levels and all topics to unlock — then add your name"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Name option - shown only after completing all modules */}
          {trackComplete && (
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-primary">
                <UserPlus className="h-5 w-5" />
                Add Name to Certificate
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter your name to appear on your Professional Data Scientist certificate.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cert-name">Your Name</Label>
                  <Input
                    id="cert-name"
                    placeholder="e.g. John Victor Nolan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cert-date">Completion Date</Label>
                  <Input
                    id="cert-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="max-w-sm"
                  />
                  <p className="text-xs text-muted-foreground">Auto-set to the day you completed all modules</p>
                </div>
              </div>
              <Button onClick={handleSaveCertificate} className="gap-2">
                <Save className="h-4 w-4" />
                Add Name & Save
              </Button>
            </div>
          )}

          {/* Certificate - always visible */}
          <DsCertificate
            recipientName={displayName}
            completionDate={displayDate}
            locked={!trackComplete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
