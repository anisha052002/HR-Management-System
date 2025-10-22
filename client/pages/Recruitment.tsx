import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Brain,
  FileText,
  Star,
  CheckCircle,
  Clock,
  X,
  TrendingUp,
} from "lucide-react";

const candidateData = [
  {
    id: "CAN001",
    name: "Alex Thompson",
    position: "Senior Engineer",
    email: "alex.thompson@email.com",
    aiScore: 92,
    stage: "Interview",
    appliedDate: "2024-01-15",
    resume: "alex-thompson-resume.pdf",
  },
  {
    id: "CAN002",
    name: "Jessica Lee",
    position: "Product Manager",
    email: "jessica.lee@email.com",
    aiScore: 88,
    stage: "Screening",
    appliedDate: "2024-01-18",
    resume: "jessica-lee-resume.pdf",
  },
  {
    id: "CAN003",
    name: "Marcus Johnson",
    position: "Senior Engineer",
    email: "marcus.johnson@email.com",
    aiScore: 85,
    stage: "Interview",
    appliedDate: "2024-01-20",
    resume: "marcus-johnson-resume.pdf",
  },
  {
    id: "CAN004",
    name: "Nina Patel",
    position: "UI/UX Designer",
    email: "nina.patel@email.com",
    aiScore: 78,
    stage: "Applied",
    appliedDate: "2024-01-22",
    resume: "nina-patel-resume.pdf",
  },
  {
    id: "CAN005",
    name: "David Smith",
    position: "Senior Engineer",
    email: "david.smith@email.com",
    aiScore: 95,
    stage: "Offer",
    appliedDate: "2024-01-10",
    resume: "david-smith-resume.pdf",
  },
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Applied":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "Screening":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "Interview":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Offer":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Rejected":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

const getScoreBadgeColor = (score: number) => {
  if (score >= 90) return "text-green-500";
  if (score >= 80) return "text-blue-500";
  if (score >= 70) return "text-yellow-500";
  return "text-orange-500";
};

export default function Recruitment() {
  const { role } = useParams();
  const navigate = useNavigate();

  const openPositions = [
    { id: 1, title: "Senior Engineer", applicants: 42, status: "Open" },
    { id: 2, title: "Product Manager", applicants: 28, status: "Open" },
    { id: 3, title: "UI/UX Designer", applicants: 35, status: "Open" },
    { id: 4, title: "Data Analyst", applicants: 19, status: "Closed" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Recruitment</h1>
            <p className="text-muted-foreground">
              Manage job openings and candidates with AI-powered screening
            </p>
          </div>
          <Button
            onClick={() => navigate(`/dashboard/${role}`)}
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            ← Back
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
            <Plus className="mr-2 w-4 h-4" />
            New Position
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Applicants", value: "145", icon: null },
            { label: "Screening In Progress", value: "28", icon: Brain },
            { label: "In Interview", value: "12", icon: Clock },
            { label: "Offers Extended", value: "3", icon: CheckCircle },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      {stat.value}
                    </p>
                  </div>
                  {stat.icon && (
                    <stat.icon className="w-8 h-8 text-primary/50" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Open Positions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Open Positions</CardTitle>
            <CardDescription>Job openings and applicant counts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="p-4 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{position.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {position.applicants} Applicants
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      position.status === "Open"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }
                  >
                    {position.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Candidates</CardTitle>
            <CardDescription>
              Candidates ranked by AI screening score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidateData.map((candidate) => (
                    <TableRow
                      key={candidate.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {candidate.name}
                      </TableCell>
                      <TableCell className="text-sm">
                        {candidate.position}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Star
                            className={`w-4 h-4 ${getScoreBadgeColor(
                              candidate.aiScore
                            )}`}
                          />
                          <span
                            className={`font-semibold ${getScoreBadgeColor(
                              candidate.aiScore
                            )}`}
                          >
                            {candidate.aiScore}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStageColor(candidate.stage)}
                        >
                          {candidate.stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(candidate.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary/10"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Recruitment Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Best Candidate Match
                </p>
                <p className="text-lg font-bold text-primary">David Smith</p>
                <p className="text-xs text-muted-foreground mt-1">95% Match</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Avg Processing Time
                </p>
                <p className="text-lg font-bold text-primary">2.3 min</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Per resume
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Recommendation
                </p>
                <p className="text-lg font-bold text-primary">Fast Track</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Top 3 candidates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
