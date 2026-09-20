import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import {
  IconHome,
  IconChallenges,
  IconLeaderboard,
  IconShowcase,
  IconCareers,
  IconSignIn,
  IconSun,
  IconMoon,
  IconCollapse,
  IconExpand,
} from "./icons";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "challenges", label: "Challenges", icon: IconChallenges },
  { id: "leaderboard", label: "Leaderboard", icon: IconLeaderboard },
  { id: "showcase", label: "Showcase", icon: IconShowcase },
  { id: "careers", label: "Careers", icon: IconCareers },
  { id: "student", label: "Student", icon: GraduationCap, href: "/student-corner" as string | undefined },
] as const;

interface LandingSidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function LandingSidebar({
  activeSection,
  onNavigate,
  collapsed,
  onCollapsedChange,
}: LandingSidebarProps) {
  const { theme, setTheme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo.png" : "/tmai-logo-dark.png";

  const navButton = (item: (typeof NAV)[number], compact?: boolean) => {
    const Icon = item.icon;
    const active = activeSection === item.id;
    const className = cn(
      "flex items-center gap-3 w-full rounded-xl transition-colors duration-200",
      compact ? "flex-col gap-1 px-2 py-2 text-[10px]" : "px-3 py-2.5 text-sm",
      active
        ? "bg-[var(--tm-text)]/8 text-[var(--tm-text)] font-medium"
        : "text-[var(--tm-muted)] hover:text-[var(--tm-text)] hover:bg-[var(--tm-text)]/5"
    );
    const inner = (
      <>
        <Icon size={compact ? 22 : 20} />
        {(!collapsed || compact) && <span>{item.label}</span>}
      </>
    );
    if ("href" in item && item.href) {
      return (
        <Link key={item.id} to={item.href} title={item.label} className={className}>
          {inner}
        </Link>
      );
    }
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onNavigate(item.id)}
        aria-current={active ? "page" : undefined}
        title={item.label}
        className={className}
      >
        {inner}
      </button>
    );
  };

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 hidden h-screen flex-col border-r transition-[width] duration-300 ease-out min-[820px]:flex"
        )}
        style={{
          width: collapsed ? "var(--tm-sidebar-collapsed)" : "var(--tm-sidebar-w)",
          background: "var(--tm-glass)",
          borderColor: "var(--tm-glass-border)",
        }}
        aria-label="Primary"
      >
        <div
          className={cn(
            "flex items-center gap-3 px-4 pt-5 pb-4",
            collapsed && "justify-center px-2"
          )}
        >
          <img
            src={logoSrc}
            alt=""
            className="h-8 w-8 object-contain shrink-0 rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/tmai-logo.png";
            }}
          />
          {!collapsed && (
            <span className="text-[15px] font-semibold tracking-tight text-[var(--tm-text)]">
              TechMaster
            </span>
          )}
        </div>
        <hr className="tm-divider mx-3" />

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-0.5" aria-label="Sections">
          {NAV.map((item) => navButton(item))}
        </nav>

        <div className="px-2 pb-5 space-y-1 border-t" style={{ borderColor: "var(--tm-border)" }}>
          <div className="pt-3 space-y-1">
            <Link
              to="/login"
              title="Sign in"
              className={cn(
                "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-[var(--tm-muted)] hover:text-[var(--tm-text)] hover:bg-[var(--tm-text)]/5 transition-colors",
                collapsed && "justify-center px-2"
              )}
            >
              <IconSignIn size={20} />
              {!collapsed && <span>Sign in</span>}
            </Link>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              className={cn(
                "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-[var(--tm-muted)] hover:text-[var(--tm-text)] hover:bg-[var(--tm-text)]/5 transition-colors",
                collapsed && "justify-center px-2"
              )}
            >
              {theme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
              {!collapsed && <span>{theme === "dark" ? "Light" : "Dark"}</span>}
            </button>

            <button
              type="button"
              onClick={() => onCollapsedChange(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              className={cn(
                "flex items-center gap-3 w-full rounded-xl px-3 py-2.5 text-sm text-[var(--tm-muted)] hover:text-[var(--tm-text)] hover:bg-[var(--tm-text)]/5 transition-colors",
                collapsed && "justify-center px-2"
              )}
            >
              {collapsed ? <IconExpand size={20} /> : <IconCollapse size={20} />}
              {!collapsed && <span>Collapse</span>}
            </button>
          </div>
        </div>
      </aside>

      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 z-50 flex min-[820px]:hidden h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl"
        style={{
          background: "var(--tm-glass)",
          borderColor: "var(--tm-border)",
          color: "var(--tm-text)",
        }}
        aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      >
        {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
      </button>

      <nav
        className="fixed bottom-0 inset-x-0 z-50 flex min-[820px]:hidden items-stretch justify-around border-t backdrop-blur-2xl px-1 pb-[env(safe-area-inset-bottom)]"
        style={{
          background: "var(--tm-glass)",
          borderColor: "var(--tm-glass-border)",
        }}
        aria-label="Mobile sections"
      >
        {NAV.map((item) => navButton(item, true))}
      </nav>
    </>
  );
}
