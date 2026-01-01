import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Github, Chrome } from "lucide-react";

export default function AuthPage({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email")?.toString() || "";
    const name = email.includes("@") ? email.split("@")[0] : (email || "User");
    
    // Mock successful auth
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", name.charAt(0).toUpperCase() + name.slice(1));
      setLocation("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md relative z-10 glass border-border/50 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="font-display font-bold text-white text-2xl">C</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-display font-bold text-white tracking-tight">
            {mode === 'sign-in' ? 'Welcome back' : 'Create an account'}
          </CardTitle>
          <CardDescription>
            {mode === 'sign-in' ? 'Enter your credentials to access your dashboard' : 'Join thousands of engineers building their future'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="name@example.com" className="pl-10 glass" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="glass" required />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 h-11 shadow-lg shadow-primary/20" disabled={isLoading}>
              {isLoading ? 'Processing...' : (mode === 'sign-in' ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="glass h-11" onClick={handleSubmit}>
              <Github className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button variant="outline" className="glass h-11" onClick={handleSubmit}>
              <Chrome className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {mode === 'sign-in' ? (
              <>Don&apos;t have an account? <Link href="/sign-up" className="text-primary hover:underline font-medium">Sign up</Link></>
            ) : (
              <>Already have an account? <Link href="/sign-in" className="text-primary hover:underline font-medium">Log in</Link></>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
