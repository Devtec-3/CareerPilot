import { Link, useLocation } from "wouter";
import { LayoutDashboard, FileText, Map, Mic, Settings, User, Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import generatedImage from '@assets/generated_images/abstract_geometric_tech_pattern_with_blue_and_purple_gradients_for_career_ai_dashboard_background.png';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Resume Analyzer", href: "/resume", icon: FileText },
    { name: "Career Roadmap", href: "/roadmap", icon: Map },
    { name: "Mock Interview", href: "/interview", icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden flex relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <img 
          src={generatedImage} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:relative z-50 w-64 h-screen bg-sidebar/50 backdrop-blur-xl border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-display font-bold text-white text-xl">C</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">CareerPilot</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div 
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden",
                    isActive 
                      ? "bg-sidebar-accent text-primary font-medium" 
                      : "text-sidebar-foreground/70 hover:text-white hover:bg-sidebar-accent/50"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  )}
                  <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-sidebar-foreground/50 group-hover:text-white")} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-sidebar-accent/30 rounded-xl p-4 flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-primary/20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Free Plan</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 px-6 md:px-10 border-b border-border/40 backdrop-blur-md bg-background/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-medium text-muted-foreground hidden md:block">
              {navigation.find(n => n.href === location)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>
            <div className="h-6 w-px bg-border/50" />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 font-medium px-6">
              Upgrade to Pro
            </Button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
