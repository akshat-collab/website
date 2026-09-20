import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problemSlug: string;
}

export function FeedbackModal({ open, onOpenChange, problemSlug }: FeedbackModalProps) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setSubmitting(true);
    try {
      const feedbackKey = `dsa_feedback_${problemSlug}`;
      const existing = JSON.parse(localStorage.getItem(feedbackKey) || '[]');
      existing.push({
        text: text.trim(),
        rating: rating >= 1 && rating <= 5 ? rating : null,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem(feedbackKey, JSON.stringify(existing));
      toast.success("Feedback submitted! Thank you.");
      setText("");
      setRating(0);
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Share Your Feedback</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Help us improve this problem and the platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Star Rating */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Rating (optional)</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star === rating ? 0 : star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 transition-colors duration-200 ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Your feedback</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What did you think about this problem? Any suggestions?"
              className="w-full h-32 bg-muted text-sm text-foreground placeholder:text-muted-foreground rounded-xl p-3 border border-border focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
              maxLength={2000}
            />
            <div className="text-xs text-muted-foreground text-right mt-1">
              {text.length}/2000
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="bg-transparent border-border text-muted-foreground hover:bg-muted"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting || !text.trim()}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
