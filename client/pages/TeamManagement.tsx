import { useMemo, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  Phone,
  AtSign,
  Briefcase,
  Star,
  Search,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  status: "Active" | "Inactive";
  rating: number;
}

const MEMBERS: TeamMember[] = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    role: "Product Manager",
    department: "Product",
    phone: "+1 (555) 123-4567",
    email: "sarah@company.com",
    status: "Active",
    rating: 4.7,
  },
  {
    id: "EMP002",
    name: "Michael Chen",
    role: "Software Engineer",
    department: "Engineering",
    phone: "+1 (555) 987-6543",
    email: "michael@company.com",
    status: "Active",
    rating: 4.5,
  },
  {
    id: "EMP003",
    name: "Emily Rodriguez",
    role: "Sales Manager",
    department: "Sales",
    phone: "+1 (555) 321-7654",
    email: "emily@company.com",
    status: "Active",
    rating: 4.2,
  },
  {
    id: "EMP004",
    name: "James Wilson",
    role: "QA Engineer",
    department: "Engineering",
    phone: "+1 (555) 246-8101",
    email: "james@company.com",
    status: "Inactive",
    rating: 3.8,
  },
  {
    id: "EMP005",
    name: "Lisa Anderson",
    role: "UI Designer",
    department: "Design",
    phone: "+1 (555) 111-2222",
    email: "lisa@company.com",
    status: "Active",
    rating: 4.6,
  },
];

export default function TeamManagement() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [role, setRole] = useState("all");
  const [minRating, setMinRating] = useState("all");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<TeamMember | null>(null);
  const [removeId, setRemoveId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<TeamMember>>({});

  const filtered = useMemo(() => {
    return MEMBERS.filter(
      (m) =>
        (query === "" ||
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.id.toLowerCase().includes(query.toLowerCase())) &&
        (dept === "all" || m.department === dept) &&
        (role === "all" || m.role === role) &&
        (minRating === "all" || m.rating >= Number(minRating)),
    );
  }, [query, dept, role, minRating]);

  const total = filtered.length;
  const avgRating = filtered.length
    ? (filtered.reduce((s, m) => s + m.rating, 0) / filtered.length).toFixed(1)
    : "0.0";
  const activeProjects = Math.max(1, Math.round(total / 2));

  const submitAdd = () => {
    toast({
      title: "Team member added (demo)",
      description: form.name || "New member",
    });
    setOpenAdd(false);
    setForm({});
  };
  const submitEdit = () => {
    toast({ title: "Details updated (demo)", description: openEdit?.name });
    setOpenEdit(null);
    setForm({});
  };
  const confirmRemove = () => {
    toast({ title: "Member removed (demo)", description: removeId || "" });
    setRemoveId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage team members and roles
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Team Members</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{total}</CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Average Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" /> {avgRating}
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Active Projects</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {activeProjects}
            </CardContent>
          </Card>
        </div>

        {/* Actions & Filters */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6 space-y-3">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by name or ID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Select value={dept} onValueChange={setDept}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Depts</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Software Engineer">
                      Software Engineer
                    </SelectItem>
                    <SelectItem value="Product Manager">
                      Product Manager
                    </SelectItem>
                    <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                    <SelectItem value="UI Designer">UI Designer</SelectItem>
                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Min Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                onClick={() => setOpenAdd(true)}
              >
                <Plus className="w-4 h-4 mr-1" /> Add New Team Member
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <Card key={m.id} className="bg-card border-border group">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/placeholder.svg"
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-border"
                  />
                  <div>
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {m.role} • {m.id}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {m.department}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {m.phone}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <AtSign className="w-4 h-4" /> {m.email}
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={
                      m.status === "Active"
                        ? "text-green-600 border-green-600/30"
                        : "text-yellow-600 border-yellow-600/30"
                    }
                  >
                    {m.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />{" "}
                    {m.rating.toFixed(1)}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border"
                    onClick={() => {
                      setOpenEdit(m);
                      setForm(m);
                    }}
                  >
                    <Edit3 className="w-4 h-4 mr-1" /> Edit Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-red-500/10"
                    onClick={() => setRemoveId(m.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Dialog */}
        <Dialog open={openAdd} onOpenChange={(o) => !o && setOpenAdd(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Enter details</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Full Name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Employee ID"
                value={form.id || ""}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              />
              <Input
                placeholder="Role"
                value={form.role || ""}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <Input
                placeholder="Department"
                value={form.department || ""}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={submitAdd}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!openEdit} onOpenChange={(o) => !o && setOpenEdit(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Details - {openEdit?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Full Name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Role"
                value={form.role || ""}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <Input
                placeholder="Department"
                value={form.department || ""}
                onChange={(e) =>
                  setForm({ ...form, department: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={submitEdit}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove Confirm */}
        <Dialog open={!!removeId} onOpenChange={(o) => !o && setRemoveId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Remove Member</DialogTitle>
              <DialogDescription>This action is a demo</DialogDescription>
            </DialogHeader>
            <p className="text-sm">
              Are you sure you want to remove{" "}
              <span className="font-semibold">{removeId}</span>?
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                className="border-border"
                onClick={() => setRemoveId(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmRemove}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
