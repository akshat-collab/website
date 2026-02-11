import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F14] flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-xl font-semibold text-white mb-2">Something went wrong</h1>
          <p className="text-slate-400 text-sm max-w-md mb-4">
            An unexpected error occurred. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
