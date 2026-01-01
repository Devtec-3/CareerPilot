import { AppLayout } from "@/components/layout/AppLayout";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, CheckCircle, AlertCircle, X, Loader2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      // Simulate analysis
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setResult({
          score: 78,
          keywords: {
            missing: ["TypeScript", "GraphQL", "CI/CD", "AWS"],
            found: ["React", "JavaScript", "Tailwind", "Git"]
          },
          feedback: [
            "Strong action verbs used in experience section.",
            "Summary is a bit generic, consider tailoring to specific role.",
            "Formatting is clean and ATS-friendly."
          ]
        });
      }, 2500);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx']
    },
    maxFiles: 1
  });

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">Resume Analyzer</h1>
        <p className="text-muted-foreground">
          Upload your CV to get an AI-powered score and ATS keyword analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
        {/* Left: Upload Area */}
        <div className="flex flex-col gap-6">
          {!file ? (
            <div 
              {...getRootProps()} 
              className={cn(
                "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-10 cursor-pointer transition-all duration-300 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/50",
                isDragActive ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              <input {...getInputProps()} />
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UploadCloud className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Drag & Drop your Resume</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-6">
                Supports PDF, DOC, DOCX. Max file size 10MB.
              </p>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" /> Browse Files
              </Button>
            </div>
          ) : (
            <div className="flex-1 bg-card/30 backdrop-blur-sm rounded-xl border border-border p-8 flex flex-col items-center justify-center relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
                onClick={reset}
              >
                <X className="w-5 h-5" />
              </Button>
              
              <FileText className="w-24 h-24 text-primary mb-6 animate-pulse" />
              <h3 className="text-xl font-medium text-white mb-2">{file.name}</h3>
              <p className="text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>

              {analyzing && (
                <div className="w-full max-w-xs mt-8 space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Analyzing content...</span>
                    <span>Parsing PDF</span>
                  </div>
                  <Progress value={66} className="h-2 animate-pulse" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Results Area */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {!result && !analyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-10 text-muted-foreground border border-border/30 rounded-xl bg-card/20"
              >
                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 opacity-50" />
                </div>
                <p>Upload a resume to see the detailed analysis report here.</p>
              </motion.div>
            )}

            {analyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center p-10"
              >
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="text-xl font-medium text-white">AI is reading your resume...</h3>
                <p className="text-muted-foreground mt-2">Checking against thousands of job descriptions.</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col gap-6 overflow-y-auto pr-2"
              >
                {/* Score Card */}
                <Card className="bg-gradient-to-br from-card to-card/50 border-border">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-muted-foreground mb-1">ATS Score</h3>
                      <p className="text-4xl font-display font-bold text-white">{result.score}/100</p>
                    </div>
                    <div className="w-20 h-20 relative flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          stroke="hsl(var(--primary))"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={226}
                          strokeDashoffset={226 - (226 * (result.score / 100))}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                    </div>
                  </CardContent>
                </Card>

                {/* Keywords Analysis */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <h4 className="flex items-center gap-2 text-green-500 font-medium mb-3">
                      <CheckCircle className="w-4 h-4" /> Found
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.found.map((k: string) => (
                        <span key={k} className="px-2 py-1 rounded bg-green-500/20 text-green-300 text-xs">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <h4 className="flex items-center gap-2 text-red-500 font-medium mb-3">
                      <AlertCircle className="w-4 h-4" /> Missing
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.missing.map((k: string) => (
                        <span key={k} className="px-2 py-1 rounded bg-red-500/20 text-red-300 text-xs">
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="space-y-3">
                  <h4 className="font-medium text-white">AI Suggestions</h4>
                  {result.feedback.map((item: string, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-card/50 border border-border text-sm text-muted-foreground flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}
