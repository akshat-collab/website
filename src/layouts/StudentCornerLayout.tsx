import { useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { COLLEGES, EXAM_OPTIONS } from "@/data/colleges";
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  Search,
  GitCompare,
  BarChart3,
  FileCheck,
  FilePenLine,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeft,
  Menu,
  X,
  Building2,
} from "lucide-react";

const SIDEBAR_W = 268;
const SIDEBAR_COLLAPSED = 80;

const NAV = [
  { to: "/student-corner", end: true, label: "Overview", icon: GraduationCap, group: "Main" },
  { to: "/student-corner/email-writer", label: "Email Writer", icon: Mail, group: "Write" },
  { to: "/student-corner/college-finder", label: "College Finder", icon: Search, group: "Admissions" },
  { to: "/student-corner/college-compare", label: "Compare", icon: GitCompare, group: "Admissions" },
  { to: "/student-corner/cutoffs", label: "Cutoffs & Exams", icon: BarChart3, group: "Admissions" },
  { to: "/student-corner/resume-checker", label: "Resume Checker", icon: FileCheck, group: "Career" },
  { to: "/student-corner/resume-editor", label: "Resume Editor", icon: FilePenLine, group: "Career" },
] as const;

export default function StudentCornerLayout() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo.png" : "/tmai-logo-dark.png";
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const groups = ["Main", "Write", "Admissions", "Career"] as const;
  const collegeCount = useMemo(() => COLLEGES.length, []);
  const examCount = useMemo(() => EXAM_OPTIONS.length, []);

  const navLink = (
    item: (typeof NAV)[number],
    opts?: { onClick?: () => void; showLabels?: boolean }
  ) => {
    const Icon = item.icon;
    const showLabels = opts?.showLabels ?? !collapsed;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        end={"end" in item ? Boolean(item.end) : false}
        onClick={opts?.onClick}
        title={item.label}
        className={({ isActive }) =>
          cn(
            "group relative flex items-center gap-3 rounded-2xl text-[13px] font-medium transition-all duration-200",
            showLabels ? "px-3 py-2.5" : "justify-center px-2 py-2.5",
            isActive
              ? "bg-foreground text-background shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
          )
        }
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0 bg-muted/50 group-hover:bg-muted transition-colors">
          <Icon className="h-4 w-4" />
        </span>
        {showLabels && <span className="truncate">{item.label}</span>}
      </NavLink>
    );
  };

  const sidebarBody = (opts?: { mobile?: boolean }) => {
    const showLabels = !collapsed || opts?.mobile;
    return (
      <>
        <div
          className={cn(
            "relative overflow-hidden px-4 pt-5 pb-4",
            !showLabels && "px-2 flex flex-col items-center"
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                theme === "dark"
                  ? "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.08), transparent 55%)"
                  : "radial-gradient(ellipse at 20% 0%, rgba(0,0,0,0.05), transparent 55%)",
            }}
          />
          <div className={cn("relative flex items-center gap-3", !showLabels && "justify-center")}>
            <img
              src={logoSrc}
              alt=""
              className="h-9 w-9 rounded-xl object-contain shrink-0 ring-1 ring-border/60 bg-background"
            />
            {showLabels && (
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight truncate">Student Corner</p>
                <p className="text-[11px] text-muted-foreground truncate">Admissions & career</p>
              </div>
            )}
          </div>

          {showLabels && (
            <div className="relative mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-2xl border border-border/80 bg-muted/40 px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                  <Building2 className="h-3 w-3" />
                  <span className="text-[10px] uppercase tracking-wider font-medium">Colleges</span>
                </div>
                <p className="text-lg font-semibold tracking-tight tabular-nums">{collegeCount}</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-muted/40 px-3 py-2.5">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-0.5">
                  <BarChart3 className="h-3 w-3" />
                  <span className="text-[10px] uppercase tracking-wider font-medium">Exams</span>
                </div>
                <p className="text-lg font-semibold tracking-tight tabular-nums">{examCount}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mx-3 h-px bg-border/80" />

        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5">
          {groups.map((group) => {
            const items = NAV.filter((n) => n.group === group);
            if (!items.length) return null;
            return (
              <div key={group}>
                {showLabels && (
                  <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                    {group}
                  </p>
                )}
                <div className="space-y-1">
                  {items.map((item) =>
                    navLink(item, {
                      showLabels,
                      onClick: opts?.mobile ? () => setMobileOpen(false) : undefined,
                    })
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="px-2.5 pb-4 pt-2 border-t border-border/80 space-y-1">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={cn(
              "flex items-center gap-3 w-full rounded-2xl text-[13px] font-medium border border-border text-foreground hover:bg-muted transition-colors",
              !showLabels ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
            )}
            title="Back to website"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {showLabels && <span>Back to website</span>}
          </button>
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
              "flex items-center gap-3 w-full rounded-2xl text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors",
              !showLabels ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
            )}
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {showLabels && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>
          {!opts?.mobile && (
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              className={cn(
                "flex items-center gap-3 w-full rounded-2xl text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
              )}
              title={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              {!collapsed && <span>Collapse</span>}
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 border-r border-border bg-background/90 backdrop-blur-2xl transition-[width] duration-300"
        style={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_W }}
      >
        {sidebarBody()}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[300px] flex flex-col border-r border-border bg-background shadow-2xl">
            <div className="absolute top-3 right-3 z-10">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-muted border border-border"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {sidebarBody({ mobile: true })}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <style>{`
          @media (min-width: 1024px) {
            .sc-main { margin-left: ${collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_W}px; }
          }
        `}</style>
        <div className="sc-main flex-1 flex flex-col min-w-0 transition-[margin] duration-300">
          {/* Desktop top bar with back to website */}
          <header className="hidden lg:flex sticky top-0 z-30 items-center justify-between gap-4 px-6 h-14 border-b border-border bg-background/90 backdrop-blur-xl">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </Link>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl border border-border hover:bg-muted"
              aria-label="Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </header>

          {/* Mobile top bar */}
          <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-4 h-14 border-b border-border bg-background/90 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-xl border border-border hover:bg-muted"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted"
                aria-label="Back to website"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Website
              </Link>
            </div>
            <Link to="/student-corner" className="flex items-center gap-2 min-w-0">
              <img src={logoSrc} alt="" className="h-7 w-7 rounded-md shrink-0" />
              <span className="text-sm font-semibold truncate">Student Corner</span>
            </Link>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl border border-border hover:bg-muted"
              aria-label="Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </header>

          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-24 lg:pb-10">
            <Outlet />
          </main>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch justify-around border-t border-border bg-background/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
        {NAV.filter((n) =>
          ["/student-corner", "/student-corner/college-finder", "/student-corner/cutoffs", "/student-corner/email-writer", "/student-corner/resume-checker"].includes(
            n.to
          )
        ).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={"end" in item ? item.end : false}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center gap-0.5 py-2.5 px-1 text-[10px] min-w-0 flex-1",
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                )
              }
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl",
                  "aria-[current=page]:bg-foreground aria-[current=page]:text-background"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="truncate max-w-full">{item.label.split(" ")[0]}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
