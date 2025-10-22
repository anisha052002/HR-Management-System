import { useState } from "react";
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
  Calendar,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
} from "lucide-react";

const leaveRequests = [
  {
    id: "LEAVE001",
    employeeName: "Sarah Johnson",
    type: "Annual Leave",
    startDate: "2024-05-01",
    endDate: "2024-05-05",
    days: 5,
    status: "Approved",
    approvedBy: "John Smith",
  },
  {
    id: "LEAVE002",
    employeeName: "Michael Chen",
    type: "Sick Leave",
    startDate: "2024-04-15",
    endDate: "2024-04-17",
    days: 3,
    status: "Approved",
    approvedBy: "Jane Doe",
  },
  {
    id: "LEAVE003",
    employeeName: "Emily Rodriguez",
    type: "Annual Leave",
    startDate: "2024-05-10",
    endDate: "2024-05-17",
    days: 8,
    status: "Pending",
    approvedBy: "-",
  },
  {
    id: "LEAVE004",
    employeeName: "James Wilson",
    type: "Maternity Leave",
    startDate: "2024-06-01",
    endDate: "2024-09-01",
    days: 92,
    status: "Pending",
    approvedBy: "-",
  },
];

const leaveBalance = [
  { type: "Annual Leave", allocated: 20, used: 5, remaining: 15 },
  { type: "Sick Leave", allocated: 10, used: 3, remaining: 7 },
  { type: "Casual Leave", allocated: 5, used: 0, remaining: 5 },
  { type: "Maternity Leave", allocated: 92, used: 0, remaining: 92 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Rejected":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export default function LeaveManagement() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Leave Management</h1>
            <p className="text-muted-foreground">
              Manage employee leave requests and balances
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

        {/* Leave Balance Summary */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Leave Balance Overview</CardTitle>
            <CardDescription>
              Current leave balances for all employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {leaveBalance.map((balance) => (
                <div
                  key={balance.type}
                  className="p-4 bg-background rounded-lg border border-border"
                >
                  <p className="text-sm font-medium text-primary mb-3">
                    {balance.type}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allocated:</span>
                      <span className="font-semibold">{balance.allocated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Used:</span>
                      <span className="font-semibold text-red-500">
                        {balance.used}
                      </span>
                    </div>
                    <div className="border-t border-border pt-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Remaining:
                        </span>
                        <span className="font-bold text-green-500">
                          {balance.remaining}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-full"
                      style={{
                        width: `${(balance.used / balance.allocated) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>
                  All employee leave requests and approvals
                </CardDescription>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by employee..."
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Input
                type="date"
                className="w-40 bg-background border-border"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Employee</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>From Date</TableHead>
                    <TableHead>To Date</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approved By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow
                      key={request.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {request.employeeName}
                      </TableCell>
                      <TableCell className="text-sm">
                        {request.type}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(request.startDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(request.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm font-semibold">
                        {request.days} days
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(request.status)}
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {request.approvedBy}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {request.status === "Pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-green-500/10 hover:text-green-500"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-red-500/10 hover:text-red-500"
                              >
                                <AlertCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Leave Insights */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Leave Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Pending Approvals
                </p>
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Awaiting review
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Average Usage
                </p>
                <p className="text-2xl font-bold text-primary">45%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Of allocated leave
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-2">
                  Upcoming Leaves
                </p>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Next 30 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
