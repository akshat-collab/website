/**
 * DevTools Blocker - Deters casual users from opening browser devtools.
 * NOTE: Complete blocking is impossible - users can always use browser menu or disable JS.
 * This provides basic protection for exam/assessment scenarios.
 */
import { useEffect } from "react";

export function DevToolsBlocker() {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
      }
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
        e.preventDefault();
      }
      if (e.metaKey && e.altKey && e.key.toUpperCase() === "I") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
