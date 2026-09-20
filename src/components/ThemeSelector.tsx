import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import type { Theme } from "@/contexts/ThemeContext";

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-sm transition-colors",
        "border-border bg-muted/60"
      )}
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          className={cn(
            "h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300",
            theme === value
              ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.45)]"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
          aria-label={`${label} theme`}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
