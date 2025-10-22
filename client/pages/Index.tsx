import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GalaxyBackground from "@/components/GalaxyBackground";
import AnimatedLogo from "@/components/AnimatedLogo";
import {
  Brain,
  Users,
  BarChart3,
  Zap,
  Shield,
  Mic,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Galaxy Background */}
      <GalaxyBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HRMS AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm hover:text-primary transition"
            >
              Features
            </a>
            <a
              href="#ai-features"
              className="text-sm hover:text-primary transition"
            >
              AI Features
            </a>
            <a
              href="#capabilities"
              className="text-sm hover:text-primary transition"
            >
              Capabilities
            </a>
          </div>
          <Link to="/login">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="sm"
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs font-semibold text-primary">
                Next Generation HR Management
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Human Resources
              </span>
              with AI
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              An intelligent HRMS platform powered by cutting-edge AI
              technology. Streamline recruitment, performance tracking, payroll,
              and employee management with unprecedented accuracy and
              efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground w-full sm:w-auto"
                >
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/5 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card border border-border rounded-3xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Trusted by", value: "50+ growing teams" },
                  { label: "AI Accuracy", value: "99.8%" },
                  { label: "Processing", value: "Real-time" },
                  { label: "Security", value: "Enterprise" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 bg-background rounded-lg border border-border"
                  >
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-bold text-primary mt-1">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Functionalities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive HR solutions designed for modern businesses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Employee Management",
                desc: "Centralized database for all employee information and records",
              },
              {
                icon: BarChart3,
                title: "Attendance Tracking",
                desc: "Real-time attendance monitoring with advanced analytics",
              },
              {
                icon: TrendingUp,
                title: "Payroll Processing",
                desc: "Automated payroll calculations with compliance features",
              },
              {
                icon: BarChart3,
                title: "Performance Tracking",
                desc: "Data-driven performance evaluations and goal management",
              },
              {
                icon: Shield,
                title: "Data Security",
                desc: "Enterprise-grade encryption and access control",
              },
              {
                icon: Zap,
                title: "Real-time Processing",
                desc: "Instant data synchronization across all modules",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/10"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="ai-features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Intelligence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced AI features that revolutionize HR operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: FileText,
                title: "AI Resume Screening",
                desc: "Automated resume analysis and ranking using NLP. Evaluate candidates instantly without human intervention.",
                features: [
                  "NLP Analysis",
                  "Auto-Ranking",
                  "Bias-Free Selection",
                ],
              },
              {
                icon: Mic,
                title: "Voice & Conversation AI",
                desc: "Intelligent chatbot and voice assistant for candidate screening and employee interactions.",
                features: [
                  "Voice Recognition",
                  "Smart Chatbot",
                  "24/7 Available",
                ],
              },
              {
                icon: Brain,
                title: "Performance AI",
                desc: "AI-driven performance evaluation considering multiple metrics and predictive analysis.",
                features: ["Smart Scoring", "Fair Evaluation", "Growth Plans"],
              },
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                desc: "Forecast workforce trends, attrition rates, hiring needs, and payroll forecasting.",
                features: [
                  "Trend Analysis",
                  "Attrition Prediction",
                  "Budget Planning",
                ],
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{feature.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        id="capabilities"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for scale and reliability
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Scalability",
                desc: "Supports 5,000+ employee logins with real-time data processing and zero downtime.",
              },
              {
                title: "Multi-Role System",
                desc: "Customizable role-based dashboards for Admin, Manager, HR Recruiter, and Employee roles.",
              },
              {
                title: "Responsive Design",
                desc: "Optimized UI/UX for both web and mobile devices with intuitive navigation.",
              },
              {
                title: "Real-time Sync",
                desc: "Instant data synchronization across all modules and user sessions.",
              },
              {
                title: "Security First",
                desc: "Enterprise encryption, OAuth 2.0, JWT tokens, and role-based access control.",
              },
              {
                title: "API Integration",
                desc: "REST and GraphQL APIs for third-party integrations and custom workflows.",
              },
            ].map((cap) => (
              <div
                key={cap.title}
                className="p-6 bg-background border border-border rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-3 text-primary">
                  {cap.title}
                </h3>
                <p className="text-muted-foreground text-sm">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your HR?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join forward-thinking organizations using AI to revolutionize their
            human resource management.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
            >
              Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold">HRMS AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Next-generation HR management powered by AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-primary transition">
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#ai-features"
                    className="hover:text-primary transition"
                  >
                    AI Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HRMS AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
