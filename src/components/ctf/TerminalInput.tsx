import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TerminalInputProps {
  onSubmit: (value: string) => void;
  onCommandRun?: (cmd: string) => void;
  outputs: Record<string, string>;
  disabled?: boolean;
  className?: string;
}

export function TerminalInput({
  onSubmit,
  onCommandRun,
  outputs,
  disabled,
  className,
}: TerminalInputProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const output = outputs[cmd] ?? `command not found: ${cmd}`;
    setHistory((h) => [...h, { cmd, output }]);
    onCommandRun?.(cmd);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-emerald-500/30 bg-[#0a0f0a] font-mono text-sm overflow-hidden",
        "shadow-[inset_0_0_60px_rgba(16,185,129,0.03)]",
        className
      )}
    >
      <div className="px-3 py-2 border-b border-emerald-500/20 bg-emerald-950/30 text-emerald-400/90 text-xs flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
        ~/ctf-challenge
      </div>
      <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="text-emerald-400">
              <span className="text-emerald-600">$</span> {h.cmd}
            </div>
            <div className="text-slate-300 whitespace-pre-wrap pl-2">{h.output}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-emerald-500/20">
        <span className="text-emerald-500/80 select-none">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Enter command..."
          className="flex-1 bg-transparent text-emerald-400 outline-none placeholder:text-slate-600 caret-emerald-400"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
