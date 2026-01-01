import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import DashboardPage from "@/pages/dashboard";
import ResumePage from "@/pages/resume";
import RoadmapPage from "@/pages/roadmap";
import InterviewPage from "@/pages/interview";
import LandingPage from "@/pages/landing";
import AuthPage from "@/pages/auth";
import { useEffect, useState, createContext, useContext } from "react";

// Auth Context for better hook usage
const AuthContext = createContext<{ isLoggedIn: boolean | null }>({ isLoggedIn: null });

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const status = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(status);
    };
    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) return null;

  return (
    <Route {...rest}>
      {isLoggedIn ? <Component /> : <Redirect to="/sign-in" />}
    </Route>
  );
}

function Router() {
  const { isLoggedIn } = useAuth();

  return (
    <Switch>
      <Route path="/">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
      </Route>
      <Route path="/sign-in">
        <AuthPage mode="sign-in" />
      </Route>
      <Route path="/sign-up">
        <AuthPage mode="sign-up" />
      </Route>

      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/resume" component={ResumePage} />
      <ProtectedRoute path="/roadmap" component={RoadmapPage} />
      <ProtectedRoute path="/interview" component={InterviewPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
