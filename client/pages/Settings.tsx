import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Users,
  Database,
  Shield,
  Save,
  RotateCcw,
} from "lucide-react";

export default function Settings() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Settings</h1>
            <p className="text-muted-foreground">
              Manage your system preferences and configuration
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

        {/* Save Message */}
        {savedMessage && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm">
            ✓ Settings saved successfully
          </div>
        )}

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-card border border-border">
            <TabsTrigger value="general" className="flex gap-2">
              <SettingsIcon className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">General</span>
              <span className="sm:hidden">General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2">
              <Bell className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">Notifications</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2">
              <Lock className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">Security</span>
              <span className="sm:hidden">Security</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex gap-2">
              <Users className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">Team</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex gap-2">
              <Database className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">Integration</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic system configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <Input
                    defaultValue="Acme Corporation"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Email
                  </label>
                  <Input
                    type="email"
                    defaultValue="hr@acme.com"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Website
                  </label>
                  <Input
                    type="url"
                    defaultValue="https://acme.com"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Size
                  </label>
                  <Input
                    defaultValue="1,245 Employees"
                    className="bg-background border-border"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:bg-primary/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Payroll Alerts",
                    desc: "Notifications when payroll is processed",
                  },
                  {
                    title: "Recruitment Updates",
                    desc: "New candidate applications and updates",
                  },
                  {
                    title: "Employee Actions",
                    desc: "New hires, resignations, and transfers",
                  },
                  {
                    title: "Performance Reviews",
                    desc: "Reminders for performance evaluations",
                  },
                  {
                    title: "Attendance Alerts",
                    desc: "Late arrivals and absences",
                  },
                  {
                    title: "System Updates",
                    desc: "Important system maintenance alerts",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border border-border"
                  >
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    New Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-sm">
                        Enable 2FA
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team */}
          <TabsContent value="team" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>
                  Manage team members and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Admin Access</p>
                      <p className="text-sm text-muted-foreground">
                        Full system access
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      Your Role
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border">
                  <p className="font-medium mb-2">Active Team Members</p>
                  <p className="text-sm text-muted-foreground">
                    You have 3 team members with system access
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
                  Invite Team Member
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration */}
          <TabsContent value="integration" className="space-y-6 mt-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>API & Integrations</CardTitle>
                <CardDescription>
                  Manage API keys and third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    API Key
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value="sk_test_4eC39HqLyjWDarht..."
                      readOnly
                      className="bg-background border-border"
                    />
                    <Button variant="outline" className="border-border hover:bg-primary/10">
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Webhook URL
                  </label>
                  <Input
                    type="url"
                    placeholder="https://your-domain.com/webhooks"
                    className="bg-background border-border"
                  />
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4">Connected Services</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-background rounded border border-border">
                      <span className="text-sm">Slack Integration</span>
                      <span className="text-xs text-green-500">● Connected</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background rounded border border-border">
                      <span className="text-sm">Google Workspace</span>
                      <span className="text-xs text-muted-foreground">
                        Not connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Integration Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
