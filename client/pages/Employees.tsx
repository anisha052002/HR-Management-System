import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";

const employeeData = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Engineer",
    status: "Active",
    joinDate: "2021-06-15",
    salary: "$125,000",
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 234-5678",
    department: "Product",
    position: "Product Manager",
    status: "Active",
    joinDate: "2022-03-20",
    salary: "$115,000",
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    department: "Sales",
    position: "Sales Manager",
    status: "Active",
    joinDate: "2020-11-10",
    salary: "$105,000",
  },
  {
    id: "EMP004",
    name: "James Wilson",
    email: "james.wilson@company.com",
    phone: "+1 (555) 456-7890",
    department: "Marketing",
    position: "Marketing Specialist",
    status: "On Leave",
    joinDate: "2022-09-05",
    salary: "$85,000",
  },
  {
    id: "EMP005",
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 567-8901",
    department: "HR",
    position: "HR Manager",
    status: "Active",
    joinDate: "2019-05-12",
    salary: "$95,000",
  },
  { id: "EMP006", name: "Daniel Kim", email: "daniel.kim@company.com", phone: "+1 (555) 678-9012", department: "Engineering", position: "Frontend Engineer", status: "Active", joinDate: "2023-01-12", salary: "$98,000", attendance: "96%" },
  { id: "EMP007", name: "Priya Patel", email: "priya.patel@company.com", phone: "+1 (555) 678-9013", department: "Product", position: "UX Researcher", status: "Active", joinDate: "2022-08-10", salary: "$92,000", attendance: "94%" },
  { id: "EMP008", name: "Robert Brown", email: "robert.brown@company.com", phone: "+1 (555) 678-9014", department: "Sales", position: "Account Executive", status: "Active", joinDate: "2021-12-01", salary: "$88,000", attendance: "93%" },
  { id: "EMP009", name: "Aisha Khan", email: "aisha.khan@company.com", phone: "+1 (555) 678-9015", department: "Marketing", position: "Content Strategist", status: "Active", joinDate: "2020-07-19", salary: "$84,000", attendance: "95%" },
  { id: "EMP010", name: "Tom Lee", email: "tom.lee@company.com", phone: "+1 (555) 678-9016", department: "HR", position: "Recruiter", status: "Active", joinDate: "2021-02-14", salary: "$78,000", attendance: "97%" },
  { id: "EMP011", name: "Maria Garcia", email: "maria.garcia@company.com", phone: "+1 (555) 678-9017", department: "Finance", position: "Analyst", status: "Active", joinDate: "2019-09-23", salary: "$90,000", attendance: "92%" },
  { id: "EMP012", name: "Chen Wei", email: "chen.wei@company.com", phone: "+1 (555) 678-9018", department: "Engineering", position: "Backend Engineer", status: "Active", joinDate: "2022-11-11", salary: "$110,000", attendance: "96%" },
  { id: "EMP013", name: "Olivia Smith", email: "olivia.smith@company.com", phone: "+1 (555) 678-9019", department: "Support", position: "Support Lead", status: "Active", joinDate: "2020-03-05", salary: "$76,000", attendance: "93%" },
  { id: "EMP014", name: "Liam Johnson", email: "liam.johnson@company.com", phone: "+1 (555) 678-9020", department: "Engineering", position: "DevOps Engineer", status: "Active", joinDate: "2021-06-30", salary: "$118,000", attendance: "95%" },
  { id: "EMP015", name: "Sofia Rossi", email: "sofia.rossi@company.com", phone: "+1 (555) 678-9021", department: "Design", position: "UI Designer", status: "Active", joinDate: "2023-02-02", salary: "$86,000", attendance: "97%" },
  { id: "EMP016", name: "Noah Davis", email: "noah.davis@company.com", phone: "+1 (555) 678-9022", department: "Sales", position: "Sales Ops", status: "On Leave", joinDate: "2022-04-18", salary: "$82,000", attendance: "-" },
  { id: "EMP017", name: "Emma Wilson", email: "emma.wilson@company.com", phone: "+1 (555) 678-9023", department: "HR", position: "HR Generalist", status: "Active", joinDate: "2019-01-25", salary: "$80,000", attendance: "96%" },
  { id: "EMP018", name: "Yuki Tanaka", email: "yuki.tanaka@company.com", phone: "+1 (555) 678-9024", department: "Engineering", position: "QA Engineer", status: "Active", joinDate: "2021-10-09", salary: "$94,000", attendance: "94%" },
  { id: "EMP019", name: "Carlos Mendez", email: "carlos.mendez@company.com", phone: "+1 (555) 678-9025", department: "Marketing", position: "SEO Specialist", status: "Active", joinDate: "2020-08-21", salary: "$82,000", attendance: "95%" },
  { id: "EMP020", name: "Hannah Lee", email: "hannah.lee@company.com", phone: "+1 (555) 678-9026", department: "Engineering", position: "Full Stack Engineer", status: "Active", joinDate: "2024-01-03", salary: "$112,000", attendance: "98%" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "On Leave":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Inactive":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-primary/10 text-primary border-primary/20";
  }
};

export default function Employees() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string,string>>({});

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Employees</h1>
            <p className="text-muted-foreground">
              Manage and view all employee records
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

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search employees..."
              className="pl-10 bg-background border-border focus:border-primary"
            />
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground" onClick={()=> setOpen(true)}>
            <Plus className="mr-2 w-4 h-4" />
            Add Employee
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Employees", value: "1,245" },
            { label: "Active", value: "1,180" },
            { label: "On Leave", value: "45" },
            { label: "New This Month", value: "12" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Employees Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              All employees in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeData.map((employee) => (
                    <TableRow
                      key={employee.id}
                      className="border-border hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {employee.email}
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell className="text-sm">
                        {employee.position}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {('attendance' in employee && (employee as any).attendance) ? (employee as any).attendance : '—'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(employee.status)}`}
                        >
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-primary/10"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-border">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="w-4 h-4 mr-2" />
                              <span>View Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>Contact</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Briefcase className="w-4 h-4 mr-2" />
                              <span>Edit Details</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Dialog open={open} onOpenChange={(o)=>!o && setOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Employee</DialogTitle>
              <DialogDescription>Enter basic details</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Full Name" value={form.name||''} onChange={(e)=> setForm({...form, name:e.target.value})} />
              <Input placeholder="Email" value={form.email||''} onChange={(e)=> setForm({...form, email:e.target.value})} />
              <Input placeholder="Department" value={form.department||''} onChange={(e)=> setForm({...form, department:e.target.value})} />
            </div>
            <DialogFooter>
              <Button onClick={()=> { toast({ title: 'Employee added (demo)', description: form.name||'New employee' }); setOpen(false); setForm({}); }} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
