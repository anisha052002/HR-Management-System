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
  Calendar,
  MapPin,
  Badge as BadgeIcon,
  User,
  FileText,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const employeeData = {
  id: "EMP001",
  name: "John Doe",
  designation: "Senior Software Engineer",
  department: "Engineering",
  email: "john.doe@company.com",
  joinDate: "2020-01-15",
  reportingManager: "Alice Johnson",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

const attendanceStats = {
  presentDays: 18,
  leaveTaken: 2,
  lateArrivals: 1,
  workingDaysInMonth: 22,
};

const currentProject = {
  name: "Cloud Migration Platform",
  team: "Backend Team",
  memberCount: 5,
  progress: 65,
  dueDate: "2024-05-30",
};

const upcomingHolidays = [
  { name: "Labour Day", date: "2024-05-01" },
  { name: "Eid-ul-Fitr", date: "2024-04-10" },
  { name: "Independence Day", date: "2024-08-15" },
];

const recentAnnouncements = [
  {
    id: 1,
    title: "Company Annual Outing",
    description: "Join us for our annual team outing on May 20th",
    date: "2024-04-08",
    priority: "high",
  },
  {
    id: 2,
    title: "New Office Facility Open",
    description: "Our new office in Tech Park is now open for collaboration",
    date: "2024-04-05",
    priority: "medium",
  },
  {
    id: 3,
    title: "Training Program Launch",
    description: "Professional development training sessions begin next month",
    date: "2024-04-01",
    priority: "medium",
  },
];

export default function EmployeeOverview() {
  const { role } = useParams();
  const navigate = useNavigate();

  const attendancePercentage = Math.round(
    (attendanceStats.presentDays / attendanceStats.workingDaysInMonth) * 100
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {employeeData.name}! 👋
          </h1>
          <p className="text-foreground/80 mt-2">
            Here's your overview for today
          </p>
        </div>

        {/* Personal Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center">
                <img
                  src={employeeData.profileImage}
                  alt={employeeData.name}
                  className="w-32 h-32 rounded-full border-4 border-primary"
                />
                <h2 className="mt-4 text-xl font-bold text-foreground">
                  {employeeData.name}
                </h2>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Employee ID
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {employeeData.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Designation
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {employeeData.designation}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Department
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {employeeData.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {employeeData.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Reporting Manager
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {employeeData.reportingManager}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Joined Date
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(employeeData.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Present Days
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {attendanceStats.presentDays}
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
                    Leaves Taken
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {attendanceStats.leaveTaken}
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
                    {attendanceStats.lateArrivals}
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
                    {attendancePercentage}%
                  </p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Project & Upcoming Holidays */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Project */}
          <Card>
            <CardHeader>
              <CardTitle>Current Project</CardTitle>
              <CardDescription>Team Assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {currentProject.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {currentProject.team} • {currentProject.memberCount} Members
                </p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {currentProject.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${currentProject.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Due: {new Date(currentProject.dueDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Holidays</CardTitle>
              <CardDescription>Important Dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingHolidays.map((holiday, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {holiday.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(holiday.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Stay Updated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border-l-4 border-primary pl-4 py-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {announcement.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {announcement.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {new Date(announcement.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        announcement.priority === "high"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
