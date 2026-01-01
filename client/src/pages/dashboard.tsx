import { AppLayout } from "@/components/layout/AppLayout";
import { MarketPulse, StatCard } from "@/components/features/dashboard/MarketPulse";
import { Button } from "@/components/ui/button";
import { FileCheck, Target, Zap, ArrowRight, BookOpen, Trophy, Plus, Layout } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [hasData, setHasData] = useState(false);
  const userName = localStorage.getItem("userName") || "User";

  return (
    <AppLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-display font-bold text-white tracking-tight">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{userName}</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          {hasData ? "Your career readiness score is improving. Keep it up!" : "You haven't added any data yet. Start by uploading your resume."}
        </p>
      </div>

      {!hasData ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center py-20 bg-card/20 rounded-2xl border border-dashed border-border/50 backdrop-blur-sm relative overflow-hidden"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
          >
            <Layout className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">Your Dashboard is Empty</h2>
          <p className="text-muted-foreground text-center max-w-sm mb-8 leading-relaxed">
            Upload your first resume to unlock career insights, market pulse data, and roadmap visualizations.
          </p>
          <div className="flex gap-4">
            <Link href="/resume">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 group">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> Add Resume
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="glass" onClick={() => setHasData(true)}>
              Show Demo Data
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="space-y-8"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Resume Score", value: "78/100", sub: "vs last month", icon: FileCheck, trend: "up", tVal: "+12%" },
              { title: "Skills Mastered", value: "12", sub: "skills added", icon: Target, trend: "up", tVal: "+3" },
              { title: "Interview Rate", value: "85%", sub: "confidence", icon: Zap, trend: "up", tVal: "+5%" },
              { title: "Applications", value: "24", sub: "this week", icon: BookOpen, trend: "down", tVal: "-2" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <StatCard 
                  title={stat.title} 
                  value={stat.value} 
                  subtext={stat.sub}
                  icon={stat.icon}
                  trend={stat.trend}
                  trendValue={stat.tVal}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"
          >
            {/* Main Chart */}
            <MarketPulse />

            {/* Readiness Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="col-span-1 rounded-xl glass border border-border/50 p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-lg text-white">Readiness Score</h3>
                  <Trophy className="w-5 h-5 text-yellow-500" />
                </div>
                
                <div className="relative w-40 h-40 mx-auto my-6 flex items-center justify-center">
                  {/* Simple CSS Ring */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: 440 }}
                      animate={{ strokeDashoffset: 440 - (440 * 0.72) }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={440}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                      className="text-4xl font-bold font-display text-white"
                    >
                      72%
                    </motion.span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Ready</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Resume</span>
                    <span className="text-white font-medium">80%</span>
                  </div>
                  <Progress value={80} className="h-1.5" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Technical</span>
                    <span className="text-white font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-1.5" />
                </div>
              </div>

              <Link href="/roadmap">
                <Button className="w-full mt-6 gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Continue Learning <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AppLayout>
  );
}
