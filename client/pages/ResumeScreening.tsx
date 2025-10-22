import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ResumeScreening() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<null | {
    name: string;
    skills: string[];
    experience: string;
    education: string;
    match: number;
    suggested: string;
  }>(null);

  const handleUpload = (f: File) => {
    setFile(f);
    const base = f.name.replace(/\.(pdf|docx)$/i, "");
    setResult({
      name: base.split("_")[0] || "Candidate",
      skills: ["React", "TypeScript", "Node", "SQL"],
      experience: "5+ years",
      education: "B.S. Computer Science",
      match: 86,
      suggested: "Senior Software Engineer",
    });
    toast({ title: "Resume processed (demo)", description: f.name });
  };

  const download = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "screening-report.json";
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">AI Resume Screening</h1>
          <p className="text-sm text-muted-foreground">
            Upload a resume and view extracted details
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>PDF or DOCX</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  e.target.files && handleUpload(e.target.files[0])
                }
              />
              {file && (
                <div className="text-sm text-muted-foreground">
                  Uploaded: {file.name}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Screening Result</CardTitle>
              <CardDescription>Extracted details</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    <span className="font-medium">{result.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Skills:</span>{" "}
                    {result.skills.join(", ")}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>{" "}
                    {result.experience}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Education:</span>{" "}
                    {result.education}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Match %:</span>{" "}
                    <span className="font-semibold text-primary">
                      {result.match}%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Suggested Role:
                    </span>{" "}
                    {result.suggested}
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="border-border"
                      onClick={download}
                    >
                      Download Report
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No file uploaded
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
