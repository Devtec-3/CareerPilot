import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Rocket, Sparkles, Target, Zap, ChevronRight, Play, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      {/* Decorative background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-display font-bold text-white text-xl">C</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">CareerPilot</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" onClick={(e) => {
            e.preventDefault();
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }} className="text-sm text-muted-foreground hover:text-white transition-colors">Features</a>
          <a href="#pricing" onClick={(e) => {
            e.preventDefault();
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          }} className="text-sm text-muted-foreground hover:text-white transition-colors">Pricing</a>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm font-medium">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 font-medium px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
                <Sparkles className="w-3 h-3" /> AI-Powered Career Ecosystem
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-[1.1]">
                Launch Your Career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Intelligent Precision</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Analyze resumes, visualize custom career roadmaps, and practice with AI-driven interview simulators. Your senior-level career starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                  Start Free Trial <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold glass">
                <Play className="mr-2 w-4 h-4 fill-current" /> Watch Demo
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Preview */}
        <section id="features" className="py-24 px-6 bg-card/30 backdrop-blur-sm border-y border-border/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: "Resume Analysis", desc: "Get real-time ATS scoring and keyword suggestions." },
              { icon: Target, title: "Career Roadmaps", desc: "Interactive flows to guide your skill development." },
              { icon: Zap, title: "AI Interviews", desc: "Live streaming feedback on your technical answers." }
            ].map((feature, i) => (
              <Card key={i} className="glass border-border/50 hover:border-primary/50 transition-colors group">
                <CardContent className="pt-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground text-lg">Choose the plan that fits your career goals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="glass border-border/50 p-8 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Free</h3>
                  <p className="text-muted-foreground">Perfect for getting started.</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> 3 CV Scans per day
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Basic Roadmap
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Community Support
                  </li>
                </ul>
                <Link href="/sign-up">
                  <Button variant="outline" className="w-full h-12 glass">Get Started</Button>
                </Link>
              </Card>

              {/* Pro Plan */}
              <Card className="glass border-primary/50 p-8 flex flex-col h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-primary px-4 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-bl-lg">Most Popular</div>
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Pro</h3>
                  <p className="text-muted-foreground">For serious career growth.</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold text-white">$19</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex items-center gap-2 text-sm text-white font-medium">
                    <Sparkles className="w-4 h-4 text-primary" /> Unlimited CV Scans
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white font-medium">
                    <Sparkles className="w-4 h-4 text-primary" /> Deep AI Analysis
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white font-medium">
                    <Sparkles className="w-4 h-4 text-primary" /> Unlimited AI Interviews
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white font-medium">
                    <Sparkles className="w-4 h-4 text-primary" /> Personalized Mentorship
                  </li>
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">Go Pro</Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-20 px-6 border-t border-border/50 bg-card/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="font-display font-bold text-white text-xl">C</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">CareerPilot</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              The intelligent, data-driven career ecosystem for modern engineers. Build your roadmap, ace your interviews, and land your dream role.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><Link href="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">Roadmaps</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Devtec. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
