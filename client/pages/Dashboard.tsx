import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PlaceholderPage from "@/components/PlaceholderPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  BarChart3,
  TrendingUp,
  Calendar,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Mic,
} from "lucide-react";

const dashboardData = {
  stats: [
    { label: "Total Employees", value: "1,245", change: "+12%", icon: Users },
    {
      label: "This Month Attendance",
      value: "98.5%",
      change: "+2.3%",
      icon: Calendar,
    },
    { label: "Open Positions", value: "23", change: "-5", icon: BarChart3 },
    { label: "AI Score", value: "9.2/10", change: "+0.5", icon: Brain },
  ],
  chartData: [
    { month: "Jan", employees: 1100, performance: 8.2 },
    { month: "Feb", employees: 1150, performance: 8.4 },
    { month: "Mar", employees: 1180, performance: 8.6 },
    { month: "Apr", employees: 1200, performance: 8.8 },
    { month: "May", employees: 1220, performance: 8.9 },
    { month: "Jun", employees: 1245, performance: 9.1 },
  ],
  departmentData: [
    { name: "Engineering", value: 340 },
    { name: "Sales", value: 280 },
    { name: "HR", value: 120 },
    { name: "Marketing", value: 180 },
    { name: "Finance", value: 90 },
  ],
};

const COLORS = ["#3b82f6", "#0ea5e9", "#06b6d4", "#10b981", "#f59e0b"];

const sectionConfig: Record<
  string,
  Record<string, { title: string; description: string; icon: React.ReactNode }>
> = {
  admin: {
    employees: {
      title: "Employee Management",
      description:
        "Manage employee information, contracts, and organizational structure",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    recruitment: {
      title: "Recruitment & Onboarding",
      description: "AI-powered candidate screening and employee onboarding",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    analytics: {
      title: "Advanced Analytics",
      description: "Deep dive into HR metrics and organizational insights",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
    },
    payroll: {
      title: "Payroll Management",
      description: "Process payroll, manage benefits, and financial reporting",
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
    },
    "ai-tools": {
      title: "AI Tools & Automation",
      description: "Access all AI-powered features and automation tools",
      icon: <Brain className="w-12 h-12 text-primary" />,
    },
    settings: {
      title: "System Settings",
      description: "Configure system settings and administrative options",
      icon: <Brain className="w-12 h-12 text-primary" />,
    },
  },
  manager: {
    team: {
      title: "Team Management",
      description: "Manage and oversee your team members",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    performance: {
      title: "Performance Reviews",
      description: "Conduct and track performance evaluations",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
    },
    attendance: {
      title: "Attendance Tracking",
      description: "Monitor team attendance and time off requests",
      icon: <Calendar className="w-12 h-12 text-primary" />,
    },
    settings: {
      title: "Settings",
      description: "Manage your preferences",
      icon: <Brain className="w-12 h-12 text-primary" />,
    },
  },
  hr: {
    employees: {
      title: "Employee Directory",
      description: "Manage company-wide employee information",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    recruitment: {
      title: "Recruitment",
      description: "Handle recruitment and candidate management",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    attendance: {
      title: "Attendance",
      description: "Monitor attendance across the organization",
      icon: <Calendar className="w-12 h-12 text-primary" />,
    },
    payroll: {
      title: "Payroll",
      description: "Manage payroll and compensation",
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
    },
    "ai-tools": {
      title: "AI Tools",
      description: "Use AI-powered HR tools",
      icon: <Brain className="w-12 h-12 text-primary" />,
    },
  },
  recruiter: {
    candidates: {
      title: "Candidates",
      description: "Manage job applications and candidates",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    "resume-screening": {
      title: "Resume Screening",
      description: "AI-powered resume analysis and ranking",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    "voice-interview": {
      title: "Voice Interview",
      description: "Conduct voice-based candidate interviews",
      icon: <Mic className="w-12 h-12 text-primary" />,
    },
    pipeline: {
      title: "Recruitment Pipeline",
      description: "Track candidate progression through stages",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
    },
  },
  "hr-recruiter": {
    employees: {
      title: "Employee Directory",
      description: "Manage company-wide employee information",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    recruitment: {
      title: "Recruitment",
      description: "Handle recruitment and candidate management",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    attendance: {
      title: "Attendance",
      description: "Monitor attendance across the organization",
      icon: <Calendar className="w-12 h-12 text-primary" />,
    },
    payroll: {
      title: "Payroll",
      description: "Manage payroll and compensation",
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
    },
    "ai-tools": {
      title: "AI Tools",
      description: "Use AI-powered HR tools",
      icon: <Brain className="w-12 h-12 text-primary" />,
    },
    candidates: {
      title: "Candidates",
      description: "Manage job applications and candidates",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    "resume-screening": {
      title: "Resume Screening",
      description: "AI-powered resume analysis and ranking",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    "voice-interview": {
      title: "Voice Interview",
      description: "Conduct voice-based candidate interviews",
      icon: <Mic className="w-12 h-12 text-primary" />,
    },
    pipeline: {
      title: "Recruitment Pipeline",
      description: "Track candidate progression through stages",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
    },
  },
  employee: {
    documents: {
      title: "My Documents",
      description: "Access your employment documents and contracts",
      icon: <FileText className="w-12 h-12 text-primary" />,
    },
    attendance: {
      title: "Attendance",
      description: "View your attendance and time off requests",
      icon: <Calendar className="w-12 h-12 text-primary" />,
    },
    performance: {
      title: "Performance",
      description: "View your performance reviews and feedback",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
    },
    payslips: {
      title: "Payslips",
      description: "Download and view your payslips",
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
    },
  },
};

export default function Dashboard() {
  const { role, section } = useParams<{ role: string; section?: string }>();
  const currentRole = (role || "employee") as keyof typeof sectionConfig;

  const getRoleGreeting = () => {
    const greetings: Record<string, string> = {
      admin: "Admin Overview",
      manager: "Team Overview",
      hr: "HR Operations",
      recruiter: "Recruitment Pipeline",
      "hr-recruiter": "HR & Recruitment",
      employee: "My Dashboard",
    };
    return greetings[currentRole] || "Dashboard";
  };

  // Show placeholder if section is specified and not "overview"
  if (section && section !== "overview") {
    const config = sectionConfig[currentRole];
    const sectionData = config?.[section as keyof typeof config];

    if (sectionData) {
      return (
        <DashboardLayout>
          <PlaceholderPage
            title={sectionData.title}
            description={sectionData.description}
            icon={sectionData.icon}
          />
        </DashboardLayout>
      );
    }
  }

  const { toast } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const submit = (type: string) => {
    toast({
      title: `${type} submitted`,
      description: "This is a demo submission.",
    });
    setOpen(null);
    setForm({});
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{getRoleGreeting()}</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your organization today.
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                onClick={() => setOpen("Add Employee")}
              >
                Add Employee
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => setOpen("Run Payroll")}
              >
                Run Payroll
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => setOpen("Schedule Interview")}
              >
                Schedule Interview
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => setOpen("Generate Report")}
              >
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Sections</CardTitle>
            <CardDescription>Jump directly to a module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => navigate(`/dashboard/${role}/recruitment`)}
              >
                Recruitment
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => navigate(`/dashboard/${role}/leave`)}
              >
                Leave Management
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => navigate(`/dashboard/${role}/payroll`)}
              >
                Payroll
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => navigate(`/dashboard/${role}/benefits`)}
              >
                Benefits
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={() => navigate(`/dashboard/${role}/analytics`)}
              >
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith("+");
            return (
              <Card key={stat.label} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div
                    className={`flex items-center text-sm ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Manager Widgets */}
        {currentRole === "manager" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Payroll Processing</CardTitle>
                <CardDescription>
                  Run payroll for your department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Employees</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                  <Button
                    onClick={() => setOpen("Process Payroll")}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  >
                    Process Payroll
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Performance Review</CardTitle>
                <CardDescription>Rate and send feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted-foreground">
                        <th className="py-2">Employee</th>
                        <th className="py-2">Rating</th>
                        <th className="py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Sarah Johnson", rating: "8.9/10" },
                        { name: "Michael Chen", rating: "9.1/10" },
                        { name: "Emily Rodriguez", rating: "8.4/10" },
                      ].map((e) => (
                        <tr key={e.name} className="border-t border-border">
                          <td className="py-2 font-medium">{e.name}</td>
                          <td className="py-2">{e.rating}</td>
                          <td className="py-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-border"
                              onClick={() => setOpen(`Send Feedback:${e.name}`)}
                            >
                              Send Feedback
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle>Growth Trend</CardTitle>
              <CardDescription>
                Employee growth and performance metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="hsl(var(--primary))"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>By Department</CardTitle>
              <CardDescription>Employee distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dashboardData.departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {dashboardData.departmentData.map((dept, index) => (
                  <div
                    key={dept.name}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-muted-foreground">{dept.name}</span>
                    <span className="ml-auto font-semibold">{dept.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <CardTitle>AI Insights</CardTitle>
            </div>
            <CardDescription>
              Powered by machine learning analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Attrition Prediction
                </p>
                <p className="text-2xl font-bold text-primary">4.2%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Expected turnover next quarter
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Hiring Needs
                </p>
                <p className="text-2xl font-bold text-primary">+89</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Predicted positions to fill
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Performance Trend
                </p>
                <p className="text-2xl font-bold text-primary">↑ 12%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Improvement vs last period
                </p>
              </div>
            </div>
            <Button
              className="mt-4 w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
              onClick={() => navigate(`/dashboard/${role}/analytics`)}
            >
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                Add Employee
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                Run Payroll
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                Schedule Review
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Action Dialog */}
        <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{open}</DialogTitle>
              <DialogDescription>Fill the short form below.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {open === "Add Employee" && (
                <>
                  <Input
                    placeholder="Full Name"
                    value={form.name || ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    value={form.email || ""}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Department"
                    value={form.department || ""}
                    onChange={(e) =>
                      setForm({ ...form, department: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Position"
                    value={form.position || ""}
                    onChange={(e) =>
                      setForm({ ...form, position: e.target.value })
                    }
                  />
                </>
              )}
              {open === "Run Payroll" && (
                <>
                  <Input
                    placeholder="Month (e.g., 2024-04)"
                    value={form.month || ""}
                    onChange={(e) =>
                      setForm({ ...form, month: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Department (optional)"
                    value={form.pdept || ""}
                    onChange={(e) =>
                      setForm({ ...form, pdept: e.target.value })
                    }
                  />
                </>
              )}
              {open === "Schedule Interview" && (
                <>
                  <Input
                    placeholder="Candidate Name"
                    value={form.cname || ""}
                    onChange={(e) =>
                      setForm({ ...form, cname: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Role"
                    value={form.crole || ""}
                    onChange={(e) =>
                      setForm({ ...form, crole: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Date & Time"
                    value={form.datetime || ""}
                    onChange={(e) =>
                      setForm({ ...form, datetime: e.target.value })
                    }
                  />
                </>
              )}
              {open?.startsWith("Send Feedback:") && (
                <>
                  <div className="text-sm text-muted-foreground">
                    To: {open.split(":")[1]}
                  </div>
                  <Input
                    placeholder="Message to employee"
                    value={form.msg || ""}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  />
                </>
              )}
              {open === "Process Payroll" && (
                <>
                  <div className="text-sm text-muted-foreground">
                    Department: Engineering
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Employees: 18
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Amount: $142,300
                  </div>
                  <Input
                    placeholder="Confirm Date (YYYY-MM-DD)"
                    value={form.date || ""}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </>
              )}
              {open === "Generate Report" && (
                <>
                  <Input
                    placeholder="Report Type (e.g., Analytics)"
                    value={form.rtype || ""}
                    onChange={(e) =>
                      setForm({ ...form, rtype: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Period (e.g., Q1 2025)"
                    value={form.rperiod || ""}
                    onChange={(e) =>
                      setForm({ ...form, rperiod: e.target.value })
                    }
                  />
                </>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={() => submit(open || "Action")}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
