import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

// Page transition wrapper - smooth fade when switching routes
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition-wrapper animate-page-in">
      {children}
    </div>
  );
};
import { ThemeProvider } from "./contexts/ThemeContext";
import { DsaAuthProvider } from "./features/dsa/auth/DsaAuthContext";
import { DsaLayout } from "./layouts/DsaLayout";
import Index from "./pages/Index";

// Lazy load non-critical routes
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const JoinUs = lazy(() => import("./pages/JoinUs"));
const TypingTest = lazy(() => import("./pages/TypingTest"));
const AstroTypePage = lazy(() => import("./pages/AstroTypePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ChatBot = lazy(() => import("./components/ChatBot"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const PressKit = lazy(() => import("./pages/PressKit"));
const Legal = lazy(() => import("./pages/Legal"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Security = lazy(() => import("./pages/Security"));
const Cookies = lazy(() => import("./pages/Cookies"));

// DSA Practice section
const DsaLogin = lazy(() => import("./pages/dsa/DsaLogin"));
const DsaRegister = lazy(() => import("./pages/dsa/DsaRegister"));
const DsaDashboard = lazy(() => import("./pages/dsa/DsaDashboard"));
const DsaProblems = lazy(() => import("./pages/dsa/DsaProblems"));
const DsaProblemDetail = lazy(() => import("./pages/dsa/DsaProblemDetail"));
const DsaSubmissions = lazy(() => import("./pages/dsa/DsaSubmissions"));
const DsaLeaderboard = lazy(() => import("./pages/dsa/DsaLeaderboard"));
const DsaProfile = lazy(() => import("./pages/dsa/DsaProfile"));
const DsaDuelsLobby = lazy(() => import("./pages/dsa/DsaDuelsLobby"));
const DsaDuelRoom = lazy(() => import("./pages/dsa/DsaDuelRoom"));
const DsaSoloChallenge = lazy(() => import("./pages/dsa/DsaSoloChallenge"));
const DsaDailyChallenge = lazy(() => import("./pages/dsa/DsaDailyChallenge"));
const DsaCalendar = lazy(() => import("./pages/dsa/DsaCalendar"));

// TypeForge
const TypeForgeLayout = lazy(() => import("./layouts/TypeForgeLayout"));
const TypeForgeCode = lazy(() => import("./pages/typeforge/TypeForgeCode"));
const TypeForgeSpells = lazy(() => import("./pages/typeforge/TypeForgeSpells"));
const TypeForgeFun = lazy(() => import("./pages/typeforge/TypeForgeFun"));
const TypeForgeLiveCoding = lazy(() => import("./pages/typeforge/TypeForgeLiveCoding"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      refetchOnWindowFocus: false,
    },
  },
});

// Component to conditionally render ChatBot based on route
const ConditionalChatBot = () => {
  const location = useLocation();
  
  // Hide chatbot on DSA problem pages and problems list (avoids overlapping pagination Next button)
  const hideChatBot = location.pathname.startsWith('/dsa/problem/') || 
                      location.pathname.startsWith('/dsa/duels/') ||
                      location.pathname === '/dsa/problems';
  
  if (hideChatBot) return null;
  
  return <ChatBot />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm">Loading...</p>
              </div>
            </div>
          }>
            <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/typing-test" element={<TypingTest />} />
              <Route path="/astrotype" element={<AstroTypePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/press-kit" element={<PressKit />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/security" element={<Security />} />
              <Route path="/cookies" element={<Cookies />} />

              {/* TypeForge */}
              <Route path="/typeforge" element={<TypeForgeLayout />}>
                <Route index element={<Navigate to="/typeforge/code" replace />} />
                <Route path="code" element={<TypeForgeCode />} />
                <Route path="spells" element={<TypeForgeSpells />} />
                <Route path="fun" element={<TypeForgeFun />} />
                <Route path="live-coding" element={<TypeForgeLiveCoding />} />
              </Route>

              {/* DSA Practice section */}
              <Route
                path="/dsa"
                element={
                  <DsaAuthProvider>
                    <DsaLayout />
                  </DsaAuthProvider>
                }
              >
                <Route index element={<Navigate to="/dsa/problems" replace />} />
                <Route path="login" element={<DsaLogin />} />
                <Route path="register" element={<DsaRegister />} />
                <Route path="dashboard" element={<DsaDashboard />} />
                <Route path="problems" element={<DsaProblems />} />
                <Route path="practice" element={<Navigate to="/dsa/problems" replace />} />
                <Route path="problem/:id" element={<DsaProblemDetail />} />
                <Route path="submissions" element={<DsaSubmissions />} />
                {/* Shortcut redirects */}
                <Route path="solo" element={<Navigate to="/dsa/duels/solo" replace />} />
                <Route path="daily" element={<Navigate to="/dsa/duels/daily" replace />} />
                <Route path="duel" element={<Navigate to="/dsa/duels" replace />} />
                <Route path="arena" element={<Navigate to="/dsa/duels" replace />} />
                {/* Duels: nested so /dsa/duels, /dsa/duels/solo, /dsa/duels/daily, /dsa/duels/room/:id work */}
                <Route path="duels" element={<Outlet />}>
                  <Route index element={<DsaDuelsLobby />} />
                  <Route path="solo" element={<DsaSoloChallenge />} />
                  <Route path="daily" element={<DsaDailyChallenge />} />
                  <Route path="room" element={<Navigate to="/dsa/duels" replace />} />
                  <Route path="room/:roomId" element={<DsaDuelRoom />} />
                </Route>
                <Route path="leaderboard" element={<DsaLeaderboard />} />
                <Route path="profile" element={<DsaProfile />} />
                <Route path="live" element={<ComingSoon />} />
                <Route path="contest" element={<ComingSoon />} />
                <Route path="discuss" element={<ComingSoon />} />
                <Route path="calendar" element={<DsaCalendar />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            </PageTransition>
            <ConditionalChatBot />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
