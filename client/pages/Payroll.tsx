import { useNavigate, useParams } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
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
  DollarSign,
  Search,
  Play,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

const payrollData = [
  {
    id: 1,
    month: "January 2024",
    date: "2024-01-31",
    status: "Processed",
    totalAmount: "$185,450",
    employeeCount: 145,
    accuracy: 99.8,
  },
  {
    id: 2,
    month: "February 2024",
    date: "2024-02-29",
    status: "Processed",
    totalAmount: "$187,230",
    employeeCount: 148,
    accuracy: 99.9,
  },
  {
    id: 3,
    month: "March 2024",
    date: "2024-03-31",
    status: "In Review",
    totalAmount: "$189,670",
    employeeCount: 151,
    accuracy: 99.7,
  },
  {
    id: 4,
    month: "April 2024",
    date: "2024-04-30",
    status: "Pending",
    totalAmount: "$192,450",
    employeeCount: 154,
    accuracy: 0,
  },
];

const employeeSalaries = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    position: "Senior Engineer",
    salary: "$8,500",
    baseSalary: "$8,000",
    bonus: "$500",
    deductions: "$200",
    netSalary: "$8,300",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    position: "Product Manager",
    salary: "$7,500",
    baseSalary: "$7,000",
    bonus: "$500",
    deductions: "$180",
    netSalary: "$7,320",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    position: "Sales Manager",
    salary: "$7,000",
    baseSalary: "$6,500",
    bonus: "$500",
    deductions: "$150",
    netSalary: "$6,850",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processed":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "In Review":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Pending":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export default function Payroll() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const stats = [
    {
      label: "Total Monthly Payroll",
      value: "$192,450",
      change: "+1.5%",
      icon: DollarSign,
    },
    {
      label: "Active Employees",
      value: "154",
      change: "+3",
      icon: null,
    },
    {
      label: "Processed Payrolls",
      value: "3",
      change: "100%",
      icon: CheckCircle,
    },
    {
      label: "Payroll Accuracy",
      value: "99.8%",
      change: "+0.1%",
      icon: TrendingUp,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Payroll Management</h1>
            <p className="text-muted-foreground">
              Manage payroll processing and employee compensation
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

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    {Icon && <Icon className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-500 mt-2">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payroll Controls */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Payroll Processing</CardTitle>
            <CardDescription>
              Run and manage monthly payroll cycles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">April 2024 Payroll</p>
                  <p className="text-sm text-muted-foreground">
                    Ready to process
                  </p>
                </div>
                <Button
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                  onClick={() => setOpen(true)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Process Now
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">
                  Processing Month
                </p>
                <p className="font-semibold">April 2024</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Amount
                </p>
                <p className="font-semibold">$192,450</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-1">Employees</p>
                <p className="font-semibold">154</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payroll History */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Payroll History</CardTitle>
            <CardDescription>
              Previous payroll cycles and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Month</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollData.map((payroll) => (
                    <TableRow
                      key={payroll.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {payroll.month}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(payroll.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{payroll.employeeCount}</TableCell>
                      <TableCell className="font-semibold">
                        {payroll.totalAmount}
                      </TableCell>
                      <TableCell>
                        {payroll.accuracy > 0 ? (
                          <span className="text-green-500 font-semibold">
                            {payroll.accuracy}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(payroll.status)}
                        >
                          {payroll.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Employee Salary Details */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>April 2024 Salary Details</CardTitle>
                <CardDescription>
                  Employee-wise salary breakdown
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search employees..."
                    className="pl-10 w-64 bg-background border-border"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Bonus</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Salary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeSalaries.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {employee.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {employee.position}
                      </TableCell>
                      <TableCell>{employee.baseSalary}</TableCell>
                      <TableCell className="text-green-500">
                        {employee.bonus}
                      </TableCell>
                      <TableCell className="text-red-500">
                        -{employee.deductions}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {employee.netSalary}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Features */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle>Payroll Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: "✓",
                  label: "Tax Calculation",
                  desc: "Auto-calculated taxes",
                },
                {
                  icon: "✓",
                  label: "Bonus Management",
                  desc: "Track and manage bonuses",
                },
                {
                  icon: "✓",
                  label: "Compliance",
                  desc: "Meets all regulations",
                },
                {
                  icon: "✓",
                  label: "Direct Deposit",
                  desc: "Automated transfers",
                },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="p-4 bg-background/50 rounded-lg border border-primary/20"
                >
                  <p className="text-lg font-bold text-primary mb-1">
                    {feature.icon}
                  </p>
                  <p className="font-semibold text-sm">{feature.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={(o) => !o && setOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Payroll Processing</DialogTitle>
              <DialogDescription>
                April 2024 • Employees: 154 • Amount: $192,450 • Deductions:
                $12,430
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                onClick={() => {
                  setOpen(false);
                  toast({ title: "Payroll Successfully Processed" });
                }}
              >
                Confirm & Process
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
