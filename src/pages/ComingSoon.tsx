import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 transition-colors duration-300",
      "bg-slate-50 dark:bg-[#0B0F19]"
    )}>
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-[#0B0F19] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B0F19] to-black" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className={cn(
          "inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 animate-pulse",
          "bg-cyan-500/20"
        )}>
          <Clock className="w-12 h-12 text-cyan-400" />
        </div>

        {/* Title */}
        <h1 className={cn(
          "text-5xl md:text-7xl font-bold mb-4 tracking-tight",
          "text-slate-900 dark:text-white"
        )}>
          Coming Soon
        </h1>

        {/* Description */}
        <p className={cn(
          "text-lg md:text-xl mb-8 max-w-md mx-auto",
          "text-slate-600 dark:text-slate-400"
        )}>
          We're working hard to bring you this feature. Stay tuned for updates!
        </p>

        {/* Back Button */}
        <Button
          onClick={() => navigate('/dsa/dashboard')}
          className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
