import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, BarChart3, LayoutDashboard } from "lucide-react";

const TOP_BAR_HEIGHT = 56;

export default function DsLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background"
        style={{ height: TOP_BAR_HEIGHT, padding: "0 24px" }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="p-1.5 rounded-lg transition-colors hover:opacity-80 text-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Link to="/datascience" className="flex items-center gap-2 group">
            <img
              src={theme === "dark" ? "/tmai-logo.png" : "/tmai-logo-dark.png"}
              alt="TechMasterAI"
              className="h-7 w-7 rounded transition-all duration-300 group-hover:opacity-90"
              style={{ objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.src = "/tmai-logo.png";
              }}
            />
            <span className="text-base font-semibold text-foreground flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-primary" />
              Data Science
            </span>
          </Link>
        </div>
        <Link
          to="/datascience"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            location.pathname === "/datascience" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutDashboard className="h-4 w-4" />
          Track
        </Link>
      </header>

      <main className="flex-1 pt-4" style={{ paddingTop: TOP_BAR_HEIGHT + 16 }}>
        <div className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
