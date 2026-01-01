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
import { useEffect, useState } from "react";

// Mock Auth Hook
function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const status = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(status);
    };
    checkAuth();
    // Simple polling for mock behavior
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return { isLoggedIn };
}

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === null) return null; // Loading state

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
      {/* Public Routes */}
      <Route path="/">
        {isLoggedIn ? <Redirect to="/dashboard" /> : <LandingPage />}
      </Route>
      <Route path="/sign-in">
        <AuthPage mode="sign-in" />
      </Route>
      <Route path="/sign-up">
        <AuthPage mode="sign-up" />
      </Route>

      {/* Protected Routes */}
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/resume" component={ResumePage} />
      <ProtectedRoute path="/roadmap" component={RoadmapPage} />
      <ProtectedRoute path="/interview" component={InterviewPage} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
