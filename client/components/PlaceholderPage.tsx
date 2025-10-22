import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, ArrowLeft, Zap } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({
  title,
  description,
  icon = <Brain className="w-12 h-12 text-primary" />,
}: PlaceholderPageProps) {
  const navigate = useNavigate();
  const { role } = useParams();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/dashboard/${role}/overview`)}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">{icon}</div>
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                  {description}
                </p>
                <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-primary">
                    This section is being prepared. Provide more details to
                    generate this page's content.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Next Steps */}
        <div>
          <Card className="bg-card border-border sticky top-20">
            <div className="p-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                What's Next?
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  To generate content for this section, you can:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>Describe what you want to see on this page</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>Specify any features or data you need</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>Request design or layout preferences</span>
                  </li>
                </ul>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground mt-4"
                onClick={() =>
                  alert("Chat with the assistant to request this page content!")
                }
              >
                Request This Page
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
