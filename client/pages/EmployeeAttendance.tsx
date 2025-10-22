import { useNavigate, useParams } from "react-router-dom";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";

const attendanceRecords = [
  { date: "2024-04-15", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", workingHours: "8h 30m" },
  { date: "2024-04-14", status: "Present", checkIn: "09:15 AM", checkOut: "05:45 PM", workingHours: "8h 30m" },
  { date: "2024-04-13", status: "Late", checkIn: "10:00 AM", checkOut: "05:30 PM", workingHours: "7h 30m" },
  { date: "2024-04-12", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", workingHours: "8h 30m" },
  { date: "2024-04-11", status: "On Leave", checkIn: "-", checkOut: "-", workingHours: "-" },
  { date: "2024-04-10", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", workingHours: "8h 30m" },
  { date: "2024-04-09", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", workingHours: "8h 30m" },
  { date: "2024-04-08", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", workingHours: "8h 30m" },
  { date: "2024-04-05", status: "Present", checkIn: "09:00 AM", checkOut: "05:30 PM", workingHours: "8h 30m" },
  { date: "2024-04-04", status: "Absent", checkIn: "-", checkOut: "-", workingHours: "-" },
];

export default function EmployeeAttendance() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2024");

  const stats = useMemo(() => {
    const present = attendanceRecords.filter(
      (r) => r.status === "Present"
    ).length;
    const absent = attendanceRecords.filter(
      (r) => r.status === "Absent"
    ).length;
    const leaves = attendanceRecords.filter(
      (r) => r.status === "On Leave"
    ).length;
    const late = attendanceRecords.filter(
      (r) => r.status === "Late"
    ).length;
    const workingDays = 22;
    const percentage = Math.round((present / workingDays) * 100);

    return {
      present,
      absent,
      leaves,
      late,
      workingDays,
      percentage,
    };
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Absent":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "On Leave":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Late":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
      case "Late":
        return <CheckCircle className="h-4 w-4" />;
      case "Absent":
      case "On Leave":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Attendance
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your attendance and working hours
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Present Days
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.present}
                  </p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Absent Days
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.absent}
                  </p>
                </div>
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Leaves Taken
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.leaves}
                  </p>
                </div>
                <Calendar className="h-12 w-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Late Arrivals
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.late}
                  </p>
                </div>
                <Clock className="h-12 w-12 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Attendance %
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.percentage}%
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Month
                </label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Attendance Details - {selectedMonth} {selectedYear}
            </CardTitle>
            <CardDescription>
              {attendanceRecords.length} records
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Working Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusBadgeColor(record.status)}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(record.status)}
                            {record.status}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-200">
                        {record.checkIn}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-200">
                        {record.checkOut}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-200">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {record.workingHours}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Chart Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Summary</CardTitle>
            <CardDescription>
              Visual breakdown for {selectedMonth} {selectedYear}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.present}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Present
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-green-500 h-1 rounded-full"
                    style={{
                      width: `${(stats.present / stats.workingDays) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.late}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Late
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-orange-500 h-1 rounded-full"
                    style={{
                      width: `${(stats.late / stats.workingDays) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {stats.leaves}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  On Leave
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-blue-500 h-1 rounded-full"
                    style={{
                      width: `${(stats.leaves / stats.workingDays) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {stats.absent}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Absent
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-2">
                  <div
                    className="bg-red-500 h-1 rounded-full"
                    style={{
                      width: `${(stats.absent / stats.workingDays) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
