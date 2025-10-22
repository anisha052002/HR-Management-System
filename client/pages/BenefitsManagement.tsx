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
  Heart,
  Briefcase,
  Home,
  TrendingUp,
  Plus,
  Search,
  CheckCircle,
} from "lucide-react";

const benefitPlans = [
  {
    id: "PLAN001",
    name: "Health Insurance",
    icon: Heart,
    description: "Comprehensive medical coverage",
    coverage: "Employee + Family",
    premium: "$500/month",
    deduction: "$250/month",
    employees: 145,
    status: "Active",
  },
  {
    id: "PLAN002",
    name: "401(k) Plan",
    icon: TrendingUp,
    description: "Retirement savings plan",
    coverage: "Up to 6% match",
    premium: "Variable",
    deduction: "Variable",
    employees: 132,
    status: "Active",
  },
  {
    id: "PLAN003",
    name: "Life Insurance",
    icon: Briefcase,
    description: "Life insurance coverage",
    coverage: "3x annual salary",
    premium: "$100/month",
    deduction: "$50/month",
    employees: 140,
    status: "Active",
  },
  {
    id: "PLAN004",
    name: "Housing Loan",
    icon: Home,
    description: "Home loan assistance",
    coverage: "Up to 25 lakhs",
    premium: "Custom",
    deduction: "EMI",
    employees: 45,
    status: "Active",
  },
];

const employeeBenefits = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    health: "Active",
    retirement: "6% match",
    life: "Active",
    housing: "Applied",
    totalValue: "$8,500",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    health: "Active",
    retirement: "4% match",
    life: "Active",
    housing: "Active",
    totalValue: "$10,200",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    health: "Active",
    retirement: "6% match",
    life: "Active",
    housing: "-",
    totalValue: "$7,800",
  },
];

export default function BenefitsManagement() {
  const { role } = useParams();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Benefits Management</h1>
            <p className="text-muted-foreground">
              Manage employee benefits and compensation packages
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

        {/* Benefits Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefitPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="w-8 h-8 text-primary" />
                    <Badge
                      variant="outline"
                      className="bg-green-500/10 text-green-500 border-green-500/20"
                    >
                      Active
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {plan.description}
                  </p>
                  <div className="text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">
                        {plan.employees}
                      </span>{" "}
                      employees enrolled
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefit Plans Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Available Benefit Plans</CardTitle>
            <CardDescription>
              All active benefit plans and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Company Premium</TableHead>
                    <TableHead>Employee Deduction</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benefitPlans.map((plan) => (
                    <TableRow
                      key={plan.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {plan.description}
                      </TableCell>
                      <TableCell className="text-sm">{plan.coverage}</TableCell>
                      <TableCell className="text-sm font-semibold">
                        {plan.premium}
                      </TableCell>
                      <TableCell className="text-sm">
                        {plan.deduction}
                      </TableCell>
                      <TableCell className="text-sm font-semibold">
                        {plan.employees}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Employee Benefits */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Benefits</CardTitle>
                <CardDescription>Individual employee benefit enrollments</CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Enroll Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search employees..."
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Employee</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead>Retirement</TableHead>
                    <TableHead>Life Insurance</TableHead>
                    <TableHead>Housing</TableHead>
                    <TableHead>Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeBenefits.map((emp) => (
                    <TableRow
                      key={emp.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {emp.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500 border-green-500/20"
                        >
                          {emp.health}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{emp.retirement}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                        >
                          {emp.life}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            emp.housing === "-"
                              ? "bg-gray-500/10 text-muted-foreground border-gray-500/20"
                              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          }
                        >
                          {emp.housing}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        {emp.totalValue}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Analytics */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle>Benefits Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: "Total Coverage Value", value: "$1,245,000" },
                { label: "Avg Benefit Per Employee", value: "$8,540" },
                { label: "Enrollment Rate", value: "94.2%" },
                { label: "Monthly Cost", value: "$156,300" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-background/50 rounded-lg border border-primary/20"
                >
                  <p className="text-sm text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
