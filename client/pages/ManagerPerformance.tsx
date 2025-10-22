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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useParams, useNavigate } from "react-router-dom";
import EmployeePerformance from "./EmployeePerformance";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Download, Filter, History, Star, TrendingUp } from "lucide-react";

interface ReviewRow {
  id: string;
  name: string;
  role: string;
  department: string;
  period: string;
  rating: number;
  lastFeedback: string;
}

const EMPLOYEES: ReviewRow[] = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    role: "Product Manager",
    department: "Product",
    period: "Q1 2025",
    rating: 4.6,
    lastFeedback: "2025-03-28",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    role: "Software Engineer",
    department: "Engineering",
    period: "Q1 2025",
    rating: 4.3,
    lastFeedback: "2025-03-21",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    role: "Sales Manager",
    department: "Sales",
    period: "Q1 2025",
    rating: 4.1,
    lastFeedback: "2025-03-30",
  },
  {
    id: "EMP004",
    name: "James Wilson",
    role: "QA Engineer",
    department: "Engineering",
    period: "Q1 2025",
    rating: 3.9,
    lastFeedback: "2025-03-19",
  },
  {
    id: "EMP005",
    name: "Lisa Anderson",
    role: "Designer",
    department: "Design",
    period: "Q1 2025",
    rating: 4.7,
    lastFeedback: "2025-03-27",
  },
];

const TREND = [
  { m: "Oct", value: 3.9 },
  { m: "Nov", value: 4.0 },
  { m: "Dec", value: 4.1 },
  { m: "Jan", value: 4.2 },
  { m: "Feb", value: 4.3 },
  { m: "Mar", value: 4.4 },
];

export default function ManagerPerformance() {
  const { role } = useParams();
  const navigate = useNavigate();

  // If role is employee, show employee-specific performance view
  if (role === "employee") {
    return <EmployeePerformance />;
  }
  const { toast } = useToast();

  const [department, setDepartment] = useState<string>("all");
  const [minRating, setMinRating] = useState<string>("all");
  const [search, setSearch] = useState("");

  const [openReviewFor, setOpenReviewFor] = useState<ReviewRow | null>(null);
  const [historyFor, setHistoryFor] = useState<ReviewRow | null>(null);

  const [comm, setComm] = useState("3");
  const [team, setTeam] = useState("3");
  const [punc, setPunc] = useState("3");
  const [goal, setGoal] = useState("3");
  const [comments, setComments] = useState("");

  const filtered = useMemo(() => {
    return EMPLOYEES.filter(
      (e) =>
        (department === "all" || e.department === department) &&
        (minRating === "all" || e.rating >= Number(minRating)) &&
        (search.trim() === "" ||
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.id.toLowerCase().includes(search.toLowerCase())),
    );
  }, [department, minRating, search]);

  const submitReview = () => {
    const avg = (Number(comm) + Number(team) + Number(punc) + Number(goal)) / 4;
    toast({
      title: `Review submitted for ${openReviewFor?.name}`,
      description: `Average Score: ${avg.toFixed(1)}/5`,
    });
    setOpenReviewFor(null);
    setComm("3");
    setTeam("3");
    setPunc("3");
    setGoal("3");
    setComments("");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Performance Review</h1>
            <p className="text-sm text-muted-foreground">
              Evaluate and track team members' performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-border"
              onClick={() => navigate(`/dashboard/${role}/analytics`)}
            >
              <TrendingUp className="w-4 h-4 mr-2" /> View Detailed Analytics
            </Button>
            <Button variant="outline" className="border-border">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Team Reviews</CardTitle>
              <CardDescription>
                Start a new review or view history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Min Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Review Period</TableHead>
                      <TableHead>Current Rating</TableHead>
                      <TableHead>Last Feedback</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((e) => (
                      <TableRow key={e.id} className="border-border">
                        <TableCell className="font-medium">{e.name}</TableCell>
                        <TableCell>{e.role}</TableCell>
                        <TableCell>{e.department}</TableCell>
                        <TableCell>{e.period}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />{" "}
                            {e.rating.toFixed(1)}
                          </div>
                        </TableCell>
                        <TableCell>{e.lastFeedback}</TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                            onClick={() => setOpenReviewFor(e)}
                          >
                            Start Review
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border"
                            onClick={() => setHistoryFor(e)}
                          >
                            <History className="w-4 h-4 mr-1" /> View Review
                            History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>Past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TREND}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" />
                  <YAxis
                    domain={[3.5, 5]}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Start Review Dialog */}
        <Dialog
          open={!!openReviewFor}
          onOpenChange={(o) => !o && setOpenReviewFor(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Start Review {openReviewFor ? `- ${openReviewFor.name}` : ""}
              </DialogTitle>
              <DialogDescription>
                Rate each category from 1 to 5
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">
                  Communication
                </label>
                <Select value={comm} onValueChange={setComm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Teamwork
                </label>
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Punctuality
                </label>
                <Select value={punc} onValueChange={setPunc}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Goal Achievement
                </label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">
                Comments / Feedback
              </label>
              <textarea
                className="w-full h-28 p-3 bg-background border border-border rounded"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Write feedback..."
              />
            </div>
            <DialogFooter>
              <Button
                onClick={submitReview}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Submit Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* History Dialog */}
        <Dialog
          open={!!historyFor}
          onOpenChange={(o) => !o && setHistoryFor(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Review History - {historyFor?.name}</DialogTitle>
              <DialogDescription>Recent reviews and scores</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              {[
                { d: "2025-03-28", s: 4.6 },
                { d: "2024-12-30", s: 4.3 },
                { d: "2024-09-29", s: 4.1 },
              ].map((r) => (
                <div
                  key={r.d}
                  className="flex items-center justify-between p-2 border border-border rounded"
                >
                  <span>{r.d}</span>
                  <Badge variant="outline" className="font-semibold">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" /> {r.s}
                  </Badge>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
