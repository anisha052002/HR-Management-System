import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import EmployeeAttendance from "./EmployeeAttendance";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
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
  Search,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const attendanceData = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    date: "2024-04-15",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    duration: "8h 30m",
    status: "Present",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    date: "2024-04-15",
    checkIn: "09:15 AM",
    checkOut: "05:45 PM",
    duration: "8h 30m",
    status: "Present",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    date: "2024-04-15",
    checkIn: "-",
    checkOut: "-",
    duration: "-",
    status: "On Leave",
  },
  {
    id: "EMP004",
    name: "James Wilson",
    date: "2024-04-15",
    checkIn: "10:00 AM",
    checkOut: "04:30 PM",
    duration: "6h 30m",
    status: "Late",
  },
  {
    id: "EMP005",
    name: "Lisa Anderson",
    date: "2024-04-15",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    duration: "8h",
    status: "Present",
  },
  {
    id: "EMP006",
    name: "Daniel Kim",
    date: "2024-04-15",
    checkIn: "09:05 AM",
    checkOut: "05:10 PM",
    duration: "8h 5m",
    status: "Present",
  },
  {
    id: "EMP007",
    name: "Priya Patel",
    date: "2024-04-15",
    checkIn: "09:20 AM",
    checkOut: "05:40 PM",
    duration: "8h 20m",
    status: "Present",
  },
  {
    id: "EMP008",
    name: "Robert Brown",
    date: "2024-04-15",
    checkIn: "09:10 AM",
    checkOut: "05:15 PM",
    duration: "8h 5m",
    status: "Present",
  },
  {
    id: "EMP009",
    name: "Aisha Khan",
    date: "2024-04-15",
    checkIn: "08:55 AM",
    checkOut: "05:05 PM",
    duration: "8h 10m",
    status: "Present",
  },
  {
    id: "EMP010",
    name: "Tom Lee",
    date: "2024-04-15",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    duration: "8h",
    status: "Present",
  },
  {
    id: "EMP011",
    name: "Maria Garcia",
    date: "2024-04-15",
    checkIn: "09:30 AM",
    checkOut: "06:00 PM",
    duration: "8h 30m",
    status: "Late",
  },
  {
    id: "EMP012",
    name: "Chen Wei",
    date: "2024-04-15",
    checkIn: "09:05 AM",
    checkOut: "05:20 PM",
    duration: "8h 15m",
    status: "Present",
  },
  {
    id: "EMP013",
    name: "Olivia Smith",
    date: "2024-04-15",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    duration: "8h",
    status: "Present",
  },
  {
    id: "EMP014",
    name: "Liam Johnson",
    date: "2024-04-15",
    checkIn: "08:50 AM",
    checkOut: "05:10 PM",
    duration: "8h 20m",
    status: "Present",
  },
  {
    id: "EMP015",
    name: "Sofia Rossi",
    date: "2024-04-15",
    checkIn: "09:10 AM",
    checkOut: "05:30 PM",
    duration: "8h 20m",
    status: "Present",
  },
  {
    id: "EMP016",
    name: "Noah Davis",
    date: "2024-04-15",
    checkIn: "-",
    checkOut: "-",
    duration: "-",
    status: "On Leave",
  },
  {
    id: "EMP017",
    name: "Emma Wilson",
    date: "2024-04-15",
    checkIn: "09:00 AM",
    checkOut: "05:00 PM",
    duration: "8h",
    status: "Present",
  },
  {
    id: "EMP018",
    name: "Yuki Tanaka",
    date: "2024-04-15",
    checkIn: "09:25 AM",
    checkOut: "05:40 PM",
    duration: "8h 15m",
    status: "Late",
  },
  {
    id: "EMP019",
    name: "Carlos Mendez",
    date: "2024-04-15",
    checkIn: "09:05 AM",
    checkOut: "05:15 PM",
    duration: "8h 10m",
    status: "Present",
  },
  {
    id: "EMP020",
    name: "Hannah Lee",
    date: "2024-04-15",
    checkIn: "08:45 AM",
    checkOut: "05:10 PM",
    duration: "8h 25m",
    status: "Present",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Present":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Absent":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "Late":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "On Leave":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export default function Attendance() {
  const { role } = useParams();
  const navigate = useNavigate();

  // If role is employee, show employee-specific attendance view
  if (role === "employee") {
    return <EmployeeAttendance />;
  }

  const [date, setDate] = useState("2024-04-15");
  const [dept, setDept] = useState("all");
  const [shift, setShift] = useState("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return attendanceData.filter(
      (a) =>
        (date === "" || a.date === date) &&
        (q === "" || a.name.toLowerCase().includes(q.toLowerCase())),
    );
  }, [date, q]);

  const download = () => {
    const headers = [
      "ID",
      "Name",
      "Date",
      "CheckIn",
      "CheckOut",
      "Duration",
      "Status",
    ];
    const rows = filtered.map((a) => [
      a.id,
      a.name,
      a.date,
      a.checkIn,
      a.checkOut,
      a.duration,
      a.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "attendance.csv";
    a.click();
  };

  const stats = [
    {
      label: "Present Today",
      value: "142",
      change: "+2",
      icon: CheckCircle,
    },
    {
      label: "On Leave",
      value: "8",
      change: "0",
      icon: Calendar,
    },
    {
      label: "Late Arrivals",
      value: "4",
      change: "-1",
      icon: AlertCircle,
    },
    {
      label: "Attendance Rate",
      value: "94.7%",
      change: "+0.3%",
      icon: TrendingUp,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Attendance Tracking</h1>
            <p className="text-muted-foreground">
              Monitor and manage employee attendance
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
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Date Filter */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>
              View attendance records for a specific date
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Department
              </label>
              <Select value={dept} onValueChange={setDept}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Shift</label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search employee"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant="outline"
                className="border-border hover:bg-primary/10"
                onClick={download}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>
              Attendance record for April 15, 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Employee</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((record) => (
                    <TableRow
                      key={record.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">
                        {record.name}
                      </TableCell>
                      <TableCell className="text-sm">
                        {record.checkIn === "-" ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {record.checkIn}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {record.checkOut === "-" ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-accent" />
                            {record.checkOut}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {record.duration}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(record.status)}
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary/10"
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Attendance Summary */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
              <CardDescription>April 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Total Working Days", value: "22" },
                { label: "Present", value: "20" },
                { label: "Absent", value: "1" },
                { label: "Leave", value: "1" },
                { label: "Attendance %", value: "90.9%" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center pb-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>
                Attendance patterns and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm font-semibold mb-1">Attendance Trend</p>
                <p className="text-sm text-muted-foreground">
                  ↑ 2.3% increase from last month
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm font-semibold mb-1">Early Arrivals</p>
                <p className="text-sm text-muted-foreground">
                  28 employees arrived before 9 AM
                </p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm font-semibold mb-1">Alert</p>
                <p className="text-sm text-yellow-500">
                  3 employees with consistent late arrivals
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
