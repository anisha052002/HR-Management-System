import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { FileText, Edit3, Trash2, Search } from "lucide-react";

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  status: "Shortlisted" | "Rejected" | "Interview Scheduled" | "Applied";
  applied: string;
}

const CANDIDATES: Candidate[] = Array.from({ length: 30 }).map((_, i) => {
  const idx = (i + 1).toString().padStart(3, "0");
  const statuses = [
    "Applied",
    "Shortlisted",
    "Interview Scheduled",
    "Rejected",
  ] as const;
  const status = statuses[i % statuses.length];
  const titles = [
    "Software Engineer",
    "Product Manager",
    "UI Designer",
    "QA Engineer",
    "Sales Manager",
  ];
  return {
    id: `CAND${idx}`,
    name:
      [
        `Sarah Johnson`,
        `Michael Chen`,
        `Emily Rodriguez`,
        `James Wilson`,
        `Lisa Anderson`,
      ][i % 5] + ` ${i + 1}`,
    email: `candidate${idx}@mail.com`,
    phone: "+1 (555) 123-" + (1000 + i),
    title: titles[i % titles.length],
    status,
    applied: `2025-03-${((i % 28) + 1).toString().padStart(2, "0")}`,
  };
});

export default function Candidates() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [title, setTitle] = useState("all");

  const [viewing, setViewing] = useState<Candidate | null>(null);
  const [editing, setEditing] = useState<Candidate | null>(null);
  const [form, setForm] = useState<Partial<Candidate>>({});

  const filtered = useMemo(() => {
    return CANDIDATES.filter(
      (c) =>
        (query === "" || c.name.toLowerCase().includes(query.toLowerCase())) &&
        (status === "all" || c.status === status) &&
        (title === "all" || c.title === title),
    );
  }, [query, status, title]);

  const submitEdit = () => {
    toast({
      title: "Candidate updated (demo)",
      description: form.name as string,
    });
    setEditing(null);
    setForm({});
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Candidates</h1>
            <p className="text-sm text-muted-foreground">
              Search, filter and manage applicants
            </p>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Manage Candidates</CardTitle>
            <CardDescription>20–50 candidates list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select value={title} onValueChange={setTitle}>
                <SelectTrigger className="w-full md:w-56">
                  <SelectValue placeholder="Job Title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Titles</SelectItem>
                  <SelectItem value="Software Engineer">
                    Software Engineer
                  </SelectItem>
                  <SelectItem value="Product Manager">
                    Product Manager
                  </SelectItem>
                  <SelectItem value="UI Designer">UI Designer</SelectItem>
                  <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                  <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full md:w-56">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Interview Scheduled">
                    Interview Scheduled
                  </SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="border-border">
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.email}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.phone}
                      </TableCell>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>{c.status}</TableCell>
                      <TableCell>{c.applied}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border"
                          onClick={() => setViewing(c)}
                        >
                          <FileText className="w-4 h-4 mr-1" /> View Resume
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border"
                          onClick={() => {
                            setEditing(c);
                            setForm(c);
                          }}
                        >
                          <Edit3 className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border hover:bg-red-500/10"
                          onClick={() =>
                            toast({
                              title: "Candidate deleted (demo)",
                              description: c.name,
                            })
                          }
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Resume Dialog */}
        <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Resume - {viewing?.name}</DialogTitle>
              <DialogDescription>{viewing?.title}</DialogDescription>
            </DialogHeader>
            <div className="text-sm text-muted-foreground">
              Preview unavailable in demo. Use "Download" in real app.
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => setViewing(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Candidate</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Job Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={submitEdit}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
