import { useEffect, useState } from "react";
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

export default function VoiceInterview() {
  const { toast } = useToast();
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    let t: any;
    if (recording) {
      const phrases = [
        "Answering question...",
        "Discussing experience...",
        "Providing examples...",
      ];
      let i = 0;
      t = setInterval(
        () =>
          setTranscript(
            (prev) => prev + (prev ? "\n" : "") + phrases[i++ % phrases.length],
          ),
        1200,
      );
    }
    return () => clearInterval(t);
  }, [recording]);

  const stop = () => {
    setRecording(false);
    setSummary("Confidence: 82% • Communication: 78% • Technical: 80%");
    toast({
      title: "Interview saved (demo)",
      description: "AI feedback generated",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Voice Interview</h1>
          <p className="text-sm text-muted-foreground">
            Record responses and view AI feedback
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Interview Controls</CardTitle>
              <CardDescription>
                Start and stop recording (simulated)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-x-2">
              <Button
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                onClick={() => setRecording(true)}
                disabled={recording}
              >
                Start Interview
              </Button>
              <Button
                variant="outline"
                className="border-border"
                onClick={stop}
                disabled={!recording}
              >
                Stop Recording
              </Button>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => toast({ title: "Response saved (demo)" })}
              >
                Save Response
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Transcript / Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-56 p-3 bg-background border border-border rounded"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
              {summary && (
                <div className="mt-3 text-sm text-muted-foreground">
                  AI Summary:{" "}
                  <span className="font-medium text-primary">{summary}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
