import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Brain,
  TrendingUp,
  Calendar,
  DollarSign,
  Heart,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const roleConfig = {
  admin: {
    name: "Admin Dashboard",
    icon: LayoutDashboard,
    menuItems: [
      { icon: LayoutDashboard, label: "Overview", path: "overview" },
      { icon: Users, label: "Employees", path: "employees" },
      { icon: FileText, label: "Recruitment", path: "recruitment" },
      { icon: BarChart3, label: "Analytics", path: "analytics" },
      { icon: DollarSign, label: "Payroll", path: "payroll" },
      { icon: Calendar, label: "Leave Management", path: "leave" },
      { icon: Heart, label: "Benefits", path: "benefits" },
      { icon: Brain, label: "AI Tools", path: "ai-tools" },
      { icon: Settings, label: "Settings", path: "settings" },
    ],
  },
  manager: {
    name: "Manager Dashboard",
    icon: LayoutDashboard,
    menuItems: [
      { icon: LayoutDashboard, label: "Overview", path: "overview" },
      { icon: Users, label: "Team", path: "team" },
      { icon: BarChart3, label: "Performance", path: "performance" },
      { icon: Calendar, label: "Attendance", path: "attendance" },
      { icon: Settings, label: "Settings", path: "settings" },
    ],
  },
  hr: {
    name: "HR Dashboard",
    icon: LayoutDashboard,
    menuItems: [
      { icon: LayoutDashboard, label: "Overview", path: "overview" },
      { icon: Users, label: "Employees", path: "employees" },
      { icon: FileText, label: "Recruitment", path: "recruitment" },
      { icon: Calendar, label: "Attendance", path: "attendance" },
      { icon: DollarSign, label: "Payroll", path: "payroll" },
      { icon: Calendar, label: "Leave Management", path: "leave" },
      { icon: Heart, label: "Benefits", path: "benefits" },
      { icon: Brain, label: "AI Tools", path: "ai-tools" },
    ],
  },
  recruiter: {
    name: "Recruiter Dashboard",
    icon: LayoutDashboard,
    menuItems: [
      { icon: LayoutDashboard, label: "Overview", path: "overview" },
      { icon: FileText, label: "Candidates", path: "candidates" },
      { icon: Brain, label: "Resume Screening", path: "resume-screening" },
      { icon: Mic, label: "Voice Interview", path: "voice-interview" },
      { icon: BarChart3, label: "Pipeline", path: "pipeline" },
    ],
  },
  "hr-recruiter": {
    name: "HR Recruiter Dashboard",
    icon: LayoutDashboard,
    menuItems: [
      { icon: LayoutDashboard, label: "Overview", path: "overview" },
      { icon: Users, label: "Employees", path: "employees" },
      { icon: FileText, label: "Recruitment", path: "recruitment" },
      { icon: FileText, label: "Candidates", path: "candidates" },
      { icon: Brain, label: "Resume Screening", path: "resume-screening" },
      { icon: Mic, label: "Voice Interview", path: "voice-interview" },
      { icon: BarChart3, label: "Pipeline", path: "pipeline" },
      { icon: Calendar, label: "Attendance", path: "attendance" },
      { icon: DollarSign, label: "Payroll", path: "payroll" },
      { icon: Calendar, label: "Leave Management", path: "leave" },
      { icon: Heart, label: "Benefits", path: "benefits" },
      { icon: Brain, label: "AI Tools", path: "ai-tools" },
    ],
  },
  employee: {
    name: "My Dashboard",
    icon: LayoutDashboard,
    menuItems: [
      { icon: LayoutDashboard, label: "Overview", path: "overview" },
      { icon: FileText, label: "Documents", path: "documents" },
      { icon: Calendar, label: "Attendance", path: "attendance" },
      { icon: BarChart3, label: "Performance", path: "performance" },
      { icon: DollarSign, label: "Payslips", path: "payslips" },
    ],
  },
};

// Import Mic icon (missing from the import)
import { Mic } from "lucide-react";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentRole = (role || "employee") as keyof typeof roleConfig;
  const config = roleConfig[currentRole] || roleConfig.employee;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                setMobileMenuOpen(false);
              }}
              className="lg:hidden p-2 hover:bg-background rounded-lg transition"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold hidden sm:inline">HRMS AI</span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-background rounded-lg transition">
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-background rounded-lg transition"
            >
              <LogOut className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-30 w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-4 space-y-2">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {config.name}
            </h2>
          </div>

          <nav className="space-y-1">
            {config.menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(`/dashboard/${role}/${item.path}`);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* AI Features section */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
              AI Tools
            </p>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all">
                <Brain className="w-5 h-5" />
                <span>AI Assistant</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/10 transition-all">
                <TrendingUp className="w-5 h-5" />
                <span>Insights</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
