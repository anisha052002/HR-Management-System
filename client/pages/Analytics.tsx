import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Clock,
  DollarSign,
  Brain,
} from "lucide-react";

const employeeGrowth = [
  { month: "Jan", employees: 1100, growth: 0 },
  { month: "Feb", employees: 1120, growth: 1.8 },
  { month: "Mar", employees: 1150, growth: 2.7 },
  { month: "Apr", employees: 1180, growth: 2.6 },
  { month: "May", employees: 1210, growth: 2.5 },
  { month: "Jun", employees: 1245, growth: 2.9 },
];

const performanceData = [
  { name: "Engineering", average: 8.7 },
  { name: "Sales", average: 8.2 },
  { name: "Marketing", average: 8.5 },
  { name: "HR", average: 8.9 },
  { name: "Finance", average: 8.6 },
];

const attritionForecast = [
  { month: "Jul", predicted: 2.1, historical: 2.3 },
  { month: "Aug", predicted: 2.4, historical: 2.1 },
  { month: "Sep", predicted: 2.2, historical: 2.8 },
  { month: "Oct", predicted: 2.8, historical: 2.5 },
  { month: "Nov", predicted: 3.1, historical: 3.2 },
  { month: "Dec", predicted: 2.9, historical: 2.7 },
];

const departmentMetrics = [
  { name: "Engineering", value: 28 },
  { name: "Sales", value: 22 },
  { name: "Marketing", value: 14 },
  { name: "HR", value: 10 },
  { name: "Finance", value: 7 },
  { name: "Operations", value: 19 },
];

const COLORS = ["#3b82f6", "#0ea5e9", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export default function Analytics() {
  const { role } = useParams();
  const navigate = useNavigate();

  const kpis = [
    {
      label: "Employee Retention",
      value: "94.2%",
      change: "+2.1%",
      icon: Users,
      trend: "up",
    },
    {
      label: "Avg Performance Score",
      value: "8.6/10",
      change: "+0.3",
      icon: Target,
      trend: "up",
    },
    {
      label: "Time to Hire",
      value: "18 days",
      change: "-3 days",
      icon: Clock,
      trend: "up",
    },
    {
      label: "Payroll Accuracy",
      value: "99.8%",
      change: "+0.2%",
      icon: DollarSign,
      trend: "up",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Analytics & Insights</h1>
            <p className="text-muted-foreground">
              Data-driven insights into your organization
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

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <p
                    className={`text-sm mt-2 flex items-center gap-1 ${
                      kpi.trend === "up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {kpi.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Employee Growth */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Employee Growth Trend</CardTitle>
              <CardDescription>
                Year-over-year employee count and growth rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={employeeGrowth}>
                  <defs>
                    <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="employees"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorEmployees)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>Employee count by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentMetrics.map((entry, index) => (
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
            </CardContent>
          </Card>

          {/* Performance by Department */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Performance by Department</CardTitle>
              <CardDescription>Average performance scores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="average"
                    fill="hsl(var(--primary))"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attrition Forecast */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Attrition Forecast</CardTitle>
              <CardDescription>Predicted vs historical attrition rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attritionForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="historical"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Predictive Insights */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Predictive Insights
            </CardTitle>
            <CardDescription>
              Machine learning predictions for your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Next Quarter Hiring
                </p>
                <p className="text-2xl font-bold text-primary">+127 positions</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommendation: Begin recruiting now
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Attrition Risk
                </p>
                <p className="text-2xl font-bold text-primary">4.2%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  3 high-risk employees identified
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Skill Gaps
                </p>
                <p className="text-2xl font-bold text-primary">18 areas</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Training recommendations ready
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export & Reports */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Reports & Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                📊 Generate PDF Report
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                📈 Export to Excel
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                📧 Email Report
              </Button>
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10 hover:border-primary/50"
              >
                🔔 Schedule Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
