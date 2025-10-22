import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  "Applied",
  "Shortlisted",
  "Interviewed",
  "Hired",
  "Rejected",
] as const;

type Stage = (typeof STAGES)[number];
interface Item {
  id: string;
  name: string;
  role: string;
  stage: Stage;
}

const initial: Item[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `C${i + 1}`,
  name: ["Sarah", "Michael", "Emily", "James", "Lisa"][i % 5] + " Candidate",
  role: ["SE", "PM", "Designer", "QA", "Sales"][i % 5],
  stage: STAGES[i % STAGES.length],
}));

export default function Pipeline() {
  const [items, setItems] = useState<Item[]>(initial);
  const onDrop = (e: React.DragEvent<HTMLDivElement>, stage: Stage) => {
    const id = e.dataTransfer.getData("text/plain");
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, stage } : it)),
    );
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Recruitment Pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Drag candidates between stages
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {STAGES.map((stage) => (
            <Card
              key={stage}
              className="bg-card border-border min-h-[320px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, stage)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  {stage}
                  <Badge variant="outline">
                    {items.filter((i) => i.stage === stage).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {items
                  .filter((i) => i.stage === stage)
                  .map((it) => (
                    <div
                      key={it.id}
                      draggable
                      onDragStart={(e) =>
                        e.dataTransfer.setData("text/plain", it.id)
                      }
                      className="p-3 rounded-lg border border-border bg-background cursor-move"
                    >
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {it.role}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
