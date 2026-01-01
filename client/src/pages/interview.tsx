import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Volume2, Cpu, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("Tell me about a challenging technical problem you solved recently.");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingFeedback, setStreamingFeedback] = useState("");
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(20).fill(10));
  
  const timerRef = useRef<any>(null);

  const fullFeedback = "Your response effectively demonstrated technical leadership and problem-solving skills. Using the STAR method (Situation, Task, Action, Result) helped clarify your impact. You successfully highlighted how optimizing the React rendering cycle led to a 40% performance gain, which is a significant technical achievement. To improve, try to mention the specific tools used for profiling (e.g., Chrome DevTools or React Profiler) to add more technical depth.";

  const streamFeedback = () => {
    setIsStreaming(true);
    setStreamingFeedback("");
    const words = fullFeedback.split(" ");
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < words.length) {
        setStreamingFeedback(prev => prev + (i === 0 ? "" : " ") + words[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setFeedback(fullFeedback);
      }
    }, 50);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      clearInterval(timerRef.current);
      // Start streaming simulation after a short processing pause
      setTimeout(() => {
        streamFeedback();
      }, 1000);
    } else {
      setIsRecording(true);
      setTranscript("");
      setFeedback(null);
      setStreamingFeedback("");
      // Simulate audio visualizer
      timerRef.current = setInterval(() => {
        setAudioLevel(prev => prev.map(() => Math.random() * 80 + 10));
        setTranscript(prev => prev + " " + getRandomWord());
      }, 200);
    }
  };

  const getRandomWord = () => {
    const words = ["I", "optimized", "the", "React", "rendering", "cycle", "using", "memoization", "reducing", "load", "times", "by", "40%", "effectively", "improving", "UX"];
    return words[Math.floor(Math.random() * words.length)];
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">AI Interview Simulator</h1>
        <p className="text-muted-foreground">
          Practice behavioral and technical questions with real-time AI feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
        {/* Left: AI Avatar & Question */}
        <div className="flex flex-col gap-6">
          <div className="relative flex-1 bg-card/40 backdrop-blur-xl border border-border rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 shadow-2xl">
            {/* AI Avatar Animation */}
            <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
               <div className="relative w-full h-full bg-gradient-to-b from-primary to-blue-600 rounded-full flex items-center justify-center shadow-inner ring-1 ring-white/10">
                 <Cpu className="w-16 h-16 text-white" />
               </div>
               {isRecording && (
                 <div className="absolute -inset-4 border border-primary/30 rounded-full animate-ping" />
               )}
            </div>

            <div className="text-center space-y-4 max-w-md z-10">
              <span className="text-xs font-medium tracking-widest text-primary uppercase">Current Question</span>
              <h2 className="text-2xl font-display font-medium text-white leading-relaxed">
                "{currentQuestion}"
              </h2>
            </div>

             {/* Background decorative lines */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
               <svg className="w-full h-full">
                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#grid)" />
               </svg>
             </div>
          </div>
        </div>

        {/* Right: User Interaction */}
        <div className="flex flex-col gap-6">
          <div className="flex-1 bg-card border border-border rounded-2xl p-8 flex flex-col relative overflow-hidden">
             <div className="flex-1 flex flex-col">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                   <div className={cn("w-3 h-3 rounded-full", isRecording ? "bg-red-500 animate-pulse" : "bg-muted")} />
                   <span className="text-sm font-medium text-muted-foreground">
                     {isRecording ? "Listening..." : "Ready to record"}
                   </span>
                 </div>
                 <Volume2 className="w-5 h-5 text-muted-foreground" />
               </div>

               {/* Audio Visualizer */}
               <div className="h-32 flex items-center justify-center gap-1 mb-6">
                 {audioLevel.map((height, i) => (
                   <motion.div
                     key={i}
                     className="w-2 bg-gradient-to-t from-primary to-accent rounded-full"
                     animate={{ height: isRecording ? `${height}%` : '10%' }}
                     transition={{ duration: 0.1 }}
                   />
                 ))}
               </div>

               {/* Transcript Area */}
               <div className="flex-1 bg-muted/20 rounded-xl p-4 mb-6 font-mono text-sm text-muted-foreground overflow-y-auto">
                 {transcript || "Speak clearly into your microphone..."}
               </div>
             </div>

             <div className="flex justify-center">
               <Button 
                 size="lg" 
                 variant={isRecording ? "destructive" : "default"}
                 className={cn("h-14 px-8 rounded-full shadow-lg transition-all", isRecording ? "shadow-red-500/20" : "shadow-primary/20")}
                 onClick={toggleRecording}
                 disabled={isStreaming}
               >
                 {isRecording ? (
                   <>
                     <Square className="w-5 h-5 mr-2 fill-current" /> Stop Answer
                   </>
                 ) : (
                   <>
                     <Mic className="w-5 h-5 mr-2" /> Start Answer
                   </>
                 )}
               </Button>
             </div>
          </div>

          {/* Feedback Section with Streaming UI */}
          <AnimatePresence>
            {(isStreaming || feedback) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/20 rounded-full text-primary mt-1">
                    {isStreaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white">AI Analysis</h4>
                      {isStreaming && <span className="text-[10px] text-primary animate-pulse font-mono">STREAMING_REALTIME...</span>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {streamingFeedback}
                      {isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse align-middle" />}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}
