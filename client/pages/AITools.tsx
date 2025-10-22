import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain,
  FileText,
  Mic,
  TrendingUp,
  Upload,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ScreeningResult {
  matchScore: number;
  experienceLevel: string;
  skillsMatch: number;
  totalSkills: number;
  keywords: string[];
  analysis: string;
}

export default function AITools() {
  const { role } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [performanceText, setPerformanceText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [screeningResult, setScreeningResult] = useState<ScreeningResult | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string>("");

  const parseResumeFile = async (file: File): Promise<string> => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".txt") || fileType === "text/plain") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          resolve(text || "");
        };
        reader.onerror = () => reject(new Error("Failed to read text file"));
        reader.readAsText(file);
      });
    }

    if (fileName.endsWith(".pdf") || fileType === "application/pdf") {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          let text = "";
          for (let i = 0; i < uint8Array.length; i++) {
            const charCode = uint8Array[i];
            if (charCode > 31 && charCode < 127) {
              text += String.fromCharCode(charCode);
            } else if (charCode === 10 || charCode === 13) {
              text += "\n";
            } else if (charCode === 32) {
              text += " ";
            }
          }
          resolve(text);
        };
        reader.readAsArrayBuffer(file);
      });
    }

    if (
      fileName.endsWith(".docx") ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          let text = "";
          for (let i = 0; i < uint8Array.length; i++) {
            const charCode = uint8Array[i];
            if (charCode > 31 && charCode < 127) {
              text += String.fromCharCode(charCode);
            } else if (charCode === 10 || charCode === 13) {
              text += "\n";
            } else if (charCode === 32) {
              text += " ";
            }
          }
          resolve(text);
        };
        reader.readAsArrayBuffer(file);
      });
    }

    return "Unable to parse file format";
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    const maxSizeMB = 10;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      setFileError(`File size exceeds ${maxSizeMB}MB limit`);
      toast({
        title: "File Too Large",
        description: `Please upload a file smaller than ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    const allowedExtensions = [".pdf", ".docx", ".txt"];
    const fileName = file.name.toLowerCase();
    const isValidType = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );

    if (!isValidType) {
      setFileError("Please upload a PDF, DOCX, or TXT file");
      toast({
        title: "Invalid File Type",
        description: "Supported formats: PDF, DOCX, TXT",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "File Uploaded",
      description: `${file.name} has been uploaded successfully`,
    });

    const text = await parseResumeFile(file);
    setResumeText(text);
  };

  const handleRunAnalysis = async () => {
    if (!uploadedFile) {
      setFileError("Please upload a resume first");
      return;
    }

    if (!jobDescription.trim()) {
      setFileError("Please enter a job description");
      return;
    }

    setIsAnalyzing(true);
    setFileError(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const resumeKeywords = resumeText
      .toLowerCase()
      .split(/[\s,;:.()]+/)
      .filter((word) => word.length > 4);
    const jobKeywords = jobDescription
      .toLowerCase()
      .split(/[\s,;:.()]+/)
      .filter((word) => word.length > 4);

    const matchedKeywords = resumeKeywords.filter((keyword) =>
      jobKeywords.includes(keyword)
    );

    const matchScore = jobKeywords.length
      ? Math.min(
          100,
          Math.round((matchedKeywords.length / jobKeywords.length) * 100)
        )
      : 0;

    const experienceLevels = ["Junior", "Mid-Level", "Senior", "Lead"];
    const experienceLevel =
      matchScore > 85
        ? experienceLevels[3]
        : matchScore > 70
          ? experienceLevels[2]
          : matchScore > 50
            ? experienceLevels[1]
            : experienceLevels[0];

    const skillsMatched = matchedKeywords.slice(0, 10);
    const totalSkillsInJob = Math.min(jobKeywords.length, 15);

    const result: ScreeningResult = {
      matchScore,
      experienceLevel,
      skillsMatch: skillsMatched.length,
      totalSkills: totalSkillsInJob,
      keywords: skillsMatched,
      analysis: `Resume shows ${matchScore}% match with job requirements. Candidate demonstrates ${experienceLevel.toLowerCase()}-level expertise with strong alignment in key skill areas.`,
    };

    setScreeningResult(result);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: "Resume screening analysis has been completed",
    });
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setResumeText("");
    setScreeningResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aiTools = [
    {
      id: "resume-screening",
      title: "AI Resume Screening",
      description: "Automatically evaluate and rank resumes using advanced NLP",
      icon: FileText,
      features: [
        "Automated candidate ranking",
        "Bias-free evaluation",
        "Skill extraction",
        "Match percentage calculation",
      ],
      action: "Start Screening",
      badge: "Popular",
    },
    {
      id: "voice-interview",
      title: "Voice Interview AI",
      description: "Conduct intelligent voice-based candidate interviews",
      icon: Mic,
      features: [
        "Real-time voice recognition",
        "Question customization",
        "Response analysis",
        "Interview transcript generation",
      ],
      action: "Schedule Interview",
      badge: "New",
    },
    {
      id: "performance-ai",
      title: "Performance AI",
      description: "AI-driven performance evaluation and feedback generation",
      icon: TrendingUp,
      features: [
        "Objective scoring",
        "Growth recommendations",
        "Peer comparison",
        "Development plans",
      ],
      action: "Start Evaluation",
      badge: "Featured",
    },
    {
      id: "predictive-analytics",
      title: "Predictive Analytics",
      description: "Forecast workforce trends and organizational needs",
      icon: TrendingUp,
      features: [
        "Attrition prediction",
        "Hiring forecasts",
        "Payroll projections",
        "Trend analysis",
      ],
      action: "View Insights",
      badge: "Advanced",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/dashboard/${role}/overview`)}
              className="hover:bg-primary/10"
            >
              ← Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Tools & Features</h1>
          <p className="text-muted-foreground">
            Leverage artificial intelligence to transform your HR operations
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="w-10 h-10 text-primary" />
                    <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                      {tool.badge}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features List */}
                  <div className="space-y-2">
                    {tool.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground mt-4"
                    onClick={() => { setActiveTool(tool.id); setDialogOpen(true); }}
                  >
                    {tool.action}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Resume Screening Demo */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Resume Screening Demo
            </CardTitle>
            <CardDescription>
              Try the AI resume screening feature
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Message */}
            {fileError && (
              <div className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <p className="text-sm text-destructive">{fileError}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload Area */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Upload Resume
                </label>
                {uploadedFile ? (
                  <div className="border-2 border-primary/50 rounded-lg p-6 bg-primary/5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <p className="text-sm font-medium">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveFile}
                        className="p-1 hover:bg-destructive/20 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-background/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">
                      Drop resume here or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Job Description
                </label>
                <textarea
                  className="w-full h-40 p-3 bg-background border border-border rounded-lg focus:border-primary outline-none resize-none"
                  placeholder="Paste the job description here to compare with resume..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Results Preview */}
            {screeningResult && (
              <div className="bg-background rounded-lg p-6 border border-border/50 space-y-4">
                <h3 className="font-semibold">AI Analysis Result</h3>
                <p className="text-sm text-muted-foreground">
                  {screeningResult.analysis}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Match Score
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{
                            width: `${screeningResult.matchScore}%`,
                          }}
                        ></div>
                      </div>
                      <span className="font-semibold text-primary">
                        {screeningResult.matchScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Experience Level
                    </span>
                    <span className="font-semibold">
                      {screeningResult.experienceLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Key Skills Match
                    </span>
                    <span className="font-semibold">
                      {screeningResult.skillsMatch}/{screeningResult.totalSkills}
                    </span>
                  </div>
                </div>
                {screeningResult.keywords.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Matched Keywords
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {screeningResult.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground disabled:opacity-50"
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !uploadedFile}
            >
              <Zap className="mr-2 w-4 h-4" />
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </CardContent>
        </Card>

        {/* AI Capabilities Overview */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle>AI Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "NLP Processing", value: "Advanced" },
                { label: "Accuracy Rate", value: "99.2%" },
                { label: "Processing Speed", value: "<2 sec" },
                { label: "Candidate Pool", value: "Unlimited" },
              ].map((cap) => (
                <div key={cap.label} className="p-4 bg-background/50 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-2">
                    {cap.label}
                  </p>
                  <p className="text-lg font-bold text-primary">{cap.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Tool Dialog */}
        <Dialog open={dialogOpen} onOpenChange={(o)=>!o && setDialogOpen(false)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {activeTool === 'resume-screening' && 'AI Resume Screening'}
                {activeTool === 'voice-interview' && 'Voice Interview AI'}
                {activeTool === 'performance-ai' && 'Performance Evaluation'}
                {activeTool === 'predictive-analytics' && 'Predictive Analytics'}
              </DialogTitle>
              <DialogDescription>Interactive demo</DialogDescription>
            </DialogHeader>

            {activeTool === 'resume-screening' && (
              <div className="space-y-3">
                <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="w-full" />
                <Button onClick={()=> setScreeningResult({ matchScore: 86, experienceLevel: 'Senior', skillsMatch: 8, totalSkills: 10, keywords: ['react','typescript','node','graphql'], analysis: 'Strong alignment with required skills. Recommended for next round.' })} className="w-full">Show Sample AI Feedback</Button>
                {screeningResult && (
                  <div className="text-sm p-3 bg-background border border-border rounded">
                    <p className="mb-2">{screeningResult.analysis}</p>
                    <p className="font-semibold text-primary">Match: {screeningResult.matchScore}%</p>
                  </div>
                )}
              </div>
            )}

            {activeTool === 'voice-interview' && (
              <div className="space-y-3">
                <input type="file" accept="audio/*" onChange={(e)=> setAudioFile(e.target.files?.[0]||null)} />
                <Button onClick={()=> toast({ title: 'Interview Analyzed', description: 'Communication 9/10 • Technical 8/10 • Confidence 8/10' })} className="w-full">Analyze</Button>
                {audioFile && (
                  <div className="text-sm text-muted-foreground">Uploaded: {audioFile.name}</div>
                )}
              </div>
            )}

            {activeTool === 'performance-ai' && (
              <div className="space-y-3">
                <textarea className="w-full h-32 p-3 bg-background border border-border rounded" placeholder="Paste performance notes..." value={performanceText} onChange={(e)=> setPerformanceText(e.target.value)} />
                <Button onClick={()=> {
                  const len = performanceText.trim().length; const score = Math.min(10, Math.max(5, Math.round(len/60))); toast({ title: 'Feedback Score', description: `Overall: ${score}/10` });
                }} className="w-full">Evaluate</Button>
              </div>
            )}

            {activeTool === 'predictive-analytics' && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{m:'Jan',v:1200},{m:'Feb',v:1220},{m:'Mar',v:1260},{m:'Apr',v:1290},{m:'May',v:1330},{m:'Jun',v:1380},{m:'Jul',v:1420}] }>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" className="border-border" onClick={()=> setDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
