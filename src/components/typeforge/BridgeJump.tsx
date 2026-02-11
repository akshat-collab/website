import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Maximize2, Minimize2, Play, ChevronDown, ChevronUp, Code2 } from "lucide-react";

type FunDifficulty = "newbie" | "mid" | "pro";

const PLATFORM_CONTENT: Record<FunDifficulty, string[]> = {
  newbie: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
  mid: ["cat", "dog", "run", "key", "code", "type", "fast", "test", "loop", "var", "let", "map", "get", "set"],
  pro: ["function", "variable", "algorithm", "recursion", "polymorphism", "encapsulation", "implementation"],
};

const SPEED: Record<FunDifficulty, number> = { newbie: 1.2, mid: 1.8, pro: 2.5 };

interface Platform {
  id: number;
  x: number;
  y: number;
  width: number;
  text: string;
}

export function BridgeJump({
  difficulty,
  onClose,
}: {
  difficulty: FunDifficulty;
  onClose: () => void;
}) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [playerX, setPlayerX] = useState(80);
  const [playerY, setPlayerY] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [input, setInput] = useState("");
  const [state, setState] = useState<"playing" | "fall" | "win">("playing");
  const [animating, setAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [code, setCode] = useState("console.log('Hello!');\nconsole.log(2 + 3);");
  const [codeOutput, setCodeOutput] = useState<string[]>([]);
  const [codeError, setCodeError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const words = PLATFORM_CONTENT[difficulty];

  const initPlatforms = useCallback(() => {
    const list: Platform[] = [];
    const fs = !!document.fullscreenElement;
    let x = 40;
    const yBase = fs ? 320 : 180;
    for (let i = 0; i < 12; i++) {
      const word = words[i % words.length];
      list.push({
        id: i,
        x,
        y: yBase - (i % 3) * (fs ? 48 : 28),
        width: Math.max(60, word.length * (fs ? 14 : 10)),
        text: word,
      });
      x += 70 + (word.length * (fs ? 6 : 4));
    }
    setPlatforms(list);
    setPlayerX(80);
    setPlayerY(list[0] ? list[0].y - 20 : 0);
    setTargetIndex(0);
    setInput("");
    setState("playing");
    setAnimating(false);
  }, [words]);

  useEffect(() => {
    initPlatforms();
  }, [initPlatforms]);

  useEffect(() => {
    if (isFullscreen) initPlatforms();
  }, [isFullscreen, initPlatforms]);

  useEffect(() => {
    if (state !== "playing" || animating || targetIndex >= platforms.length) return;
    const target = platforms[targetIndex];
    if (!target) return;
    const expected = target.text.toLowerCase();
    if (input.toLowerCase() === expected) {
      setAnimating(true);
      setInput("");
      setPlayerX(target.x + target.width / 2 - 10);
      setPlayerY(target.y - 20);
      setTimeout(() => {
        setTargetIndex((i) => i + 1);
        setAnimating(false);
        if (targetIndex + 1 >= platforms.length) setState("win");
      }, 200);
    } else if (expected.startsWith(input.toLowerCase()) === false && input.length > 0) {
      setState("fall");
    }
  }, [input, targetIndex, platforms, state, animating]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const runCode = useCallback(() => {
    setCodeError(null);
    setCodeOutput([]);
    const logs: string[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
    };
    try {
      const fn = new Function(code);
      fn();
      setCodeOutput(logs.length ? logs : ["(no output)"]);
    } catch (err) {
      setCodeError(err instanceof Error ? err.message : String(err));
    } finally {
      console.log = originalLog;
    }
  }, [code]);

  const currentTarget = platforms[targetIndex];
  const isWrong = currentTarget && input.length > 0 && !currentTarget.text.toLowerCase().startsWith(input.toLowerCase());

  const gameHeight = isFullscreen ? 500 : 200;
  const gameWidth = isFullscreen ? "100%" : 360;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-xl border border-white/10 bg-[#0f1116] overflow-hidden font-sans flex flex-col",
        isFullscreen && "min-h-screen w-screen rounded-none border-0"
      )}
      style={{ width: isFullscreen ? "100%" : 360, height: isFullscreen ? "100vh" : 400 }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex justify-between items-center px-3 py-1.5 border-b border-white/10 shrink-0">
          <span className="text-cyan-400 text-sm font-semibold">Bridge Jump</span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-slate-400 hover:text-cyan-400"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit full screen" : "Full screen"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-slate-400 hover:text-cyan-400"
              onClick={() => setShowCodePanel((s) => !s)}
              title={showCodePanel ? "Hide code" : "Code execution"}
            >
              <Code2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-slate-400" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="relative flex-1 bg-gradient-to-b from-[#0a0c10] to-[#12151c]" style={{ minHeight: gameHeight }}>
            {state === "fall" && (
              <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10">
                <p className="text-red-400 font-semibold">Stumble! Try again.</p>
                <Button size="sm" className="ml-2" onClick={initPlatforms}>Retry</Button>
              </div>
            )}
            {state === "win" && (
              <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center z-10">
                <p className="text-cyan-400 font-semibold">You made it!</p>
                <Button size="sm" className="ml-2" onClick={initPlatforms}>Again</Button>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cyan-900/40 to-transparent" />
            {platforms.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-md border border-cyan-500/50 bg-cyan-500/10 flex items-center justify-center text-cyan-300 font-mono"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.width,
                  height: isFullscreen ? 32 : 22,
                  fontSize: isFullscreen ? 14 : 12,
                  boxShadow: "0 0 12px rgba(34, 211, 238, 0.2)",
                }}
              >
                {p.text}
              </div>
            ))}
            <div
              className={cn(
                "absolute rounded-sm bg-cyan-400 flex items-center justify-center font-bold text-[#0f1116] transition-all duration-150",
                isWrong && "bg-red-400 animate-pulse"
              )}
              style={{
                left: playerX,
                top: playerY,
                width: isFullscreen ? 28 : 20,
                height: isFullscreen ? 32 : 24,
                fontSize: isFullscreen ? 12 : 10,
                boxShadow: "0 0 14px rgba(34, 211, 238, 0.5)",
              }}
            >
              ?
            </div>
          </div>
          <div className="px-3 py-2 border-t border-white/10 bg-[#1E2026] shrink-0">
            <p className="text-slate-500 text-xs mb-1">Type the word on the next platform:</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && currentTarget && (input.toLowerCase() === currentTarget.text.toLowerCase()) && setInput("")}
              placeholder={currentTarget ? currentTarget.text : ""}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
              autoFocus
              readOnly={state !== "playing"}
              autoComplete="off"
            />
          </div>
          {showCodePanel && (
            <div className="border-t border-white/10 bg-[#0a0c10] shrink-0">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-cyan-400 text-sm"
                onClick={() => setShowCodePanel(false)}
              >
                <span className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Code execution (JavaScript)
                </span>
                <ChevronUp className="h-4 w-4" />
              </button>
              <div className="px-3 pb-3 space-y-2">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-24 px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder="// Try: console.log('Hello');"
                  spellCheck={false}
                />
                <Button size="sm" onClick={runCode} className="gap-2">
                  <Play className="h-3 w-3" />
                  Run
                </Button>
                {codeError && (
                  <pre className="text-red-400 text-xs font-mono bg-red-500/10 p-2 rounded overflow-auto">{codeError}</pre>
                )}
                {codeOutput.length > 0 && !codeError && (
                  <pre className="text-cyan-300 text-xs font-mono bg-cyan-500/10 p-2 rounded overflow-auto">
                    {codeOutput.join("\n")}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
