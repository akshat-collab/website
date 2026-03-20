import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BarChart3,
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  TrendingUp,
  Award,
} from "lucide-react";

const TOP_BAR_HEIGHT = 56;
const SIDEBAR_WIDTH = 220;

const SIDEBAR_ITEMS = [
  { path: "/datascience", label: "Overview", icon: LayoutDashboard },
  { path: "/datascience/curriculum", label: "Curriculum", icon: BookOpen },
  { path: "/datascience/projects", label: "Projects", icon: FolderKanban },
  { path: "/datascience/progress", label: "Progress", icon: TrendingUp },
  { path: "/datascience/certifications", label: "Certifications", icon: Award },
];

export default function DsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans">
      {/* Sidebar - hidden on mobile, shown on lg+ */}
      <aside
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 w-[220px] border-r border-border bg-card/50 backdrop-blur-xl"
        style={{ paddingTop: TOP_BAR_HEIGHT }}
      >
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              item.path === "/datascience"
                ? location.pathname === "/datascience"
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary/15 text-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 0 }}>
        {/* Top header */}
        <header
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-xl"
          style={{ height: TOP_BAR_HEIGHT, padding: "0 24px" }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="p-1.5 rounded-lg transition-all duration-300 hover:bg-muted hover:scale-105 text-foreground"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Link to="/datascience" className="flex items-center gap-2 group">
              <img
                src="/ds-logo.svg"
                alt="Data Science"
                className="h-8 w-8 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                style={{ objectFit: "contain" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-base font-semibold text-foreground flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-primary" />
                Data Science
              </span>
            </Link>
          </div>

          {/* Mobile nav - compact */}
          <div className="flex lg:hidden gap-1">
            {SIDEBAR_ITEMS.slice(0, 3).map((item) => {
              const isActive =
                item.path === "/datascience"
                  ? location.pathname === "/datascience"
                  : location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    isActive ? "bg-primary/20 text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </header>

        <main
          className="flex-1 pt-4 transition-all duration-300 lg:ml-[220px]"
          style={{ paddingTop: TOP_BAR_HEIGHT + 16 }}
        >
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
