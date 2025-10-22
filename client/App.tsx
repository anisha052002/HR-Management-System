import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIBot from "./components/AIBot";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AITools from "./pages/AITools";
import Employees from "./pages/Employees";
import Recruitment from "./pages/Recruitment";
import Analytics from "./pages/Analytics";
import Payroll from "./pages/Payroll";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import LeaveManagement from "./pages/LeaveManagement";
import BenefitsManagement from "./pages/BenefitsManagement";
import ManagerPerformance from "./pages/ManagerPerformance";
import TeamManagement from "./pages/TeamManagement";
import NotFound from "./pages/NotFound";
import Candidates from "./pages/Candidates";
import ResumeScreening from "./pages/ResumeScreening";
import VoiceInterview from "./pages/VoiceInterview";
import Pipeline from "./pages/Pipeline";
import EmployeeOverview from "./pages/EmployeeOverview";
import EmployeeDocuments from "./pages/EmployeeDocuments";
import EmployeePayslips from "./pages/EmployeePayslips";

// Ensure dark mode class is applied so dark:* variants are active and text contrasts correctly
if (typeof document !== "undefined") {
  document.documentElement.classList.add("dark");
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AIBot />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
          <Route path="/dashboard/:role/ai-tools" element={<AITools />} />
          <Route path="/dashboard/:role/employees" element={<Employees />} />
          <Route
            path="/dashboard/:role/recruitment"
            element={<Recruitment />}
          />
          <Route path="/dashboard/:role/candidates" element={<Candidates />} />
          <Route
            path="/dashboard/:role/resume-screening"
            element={<ResumeScreening />}
          />
          <Route
            path="/dashboard/:role/voice-interview"
            element={<VoiceInterview />}
          />
          <Route path="/dashboard/:role/pipeline" element={<Pipeline />} />
          <Route path="/dashboard/:role/analytics" element={<Analytics />} />
          <Route path="/dashboard/:role/payroll" element={<Payroll />} />
          <Route path="/dashboard/:role/attendance" element={<Attendance />} />
          <Route
            path="/dashboard/:role/performance"
            element={<ManagerPerformance />}
          />
          <Route path="/dashboard/:role/team" element={<TeamManagement />} />
          <Route path="/dashboard/:role/settings" element={<Settings />} />
          <Route path="/dashboard/:role/leave" element={<LeaveManagement />} />
          <Route
            path="/dashboard/:role/benefits"
            element={<BenefitsManagement />}
          />
          <Route
            path="/dashboard/:role/overview"
            element={<EmployeeOverview />}
          />
          <Route
            path="/dashboard/:role/documents"
            element={<EmployeeDocuments />}
          />
          <Route
            path="/dashboard/:role/payslips"
            element={<EmployeePayslips />}
          />
          <Route path="/dashboard/:role/:section" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
