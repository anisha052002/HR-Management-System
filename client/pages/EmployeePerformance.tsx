import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  TrendingUp,
  MessageSquare,
  Calendar,
  Users,
  Target,
  Zap,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const performanceData = {
  overallScore: 4.2,
  scoreOutOf: 5,
  lastEvaluationDate: "2024-03-15",
  evaluator: "Alice Johnson",
  department: "Engineering",
  designation: "Senior Software Engineer",
};

const strengths = [
  {
    title: "Technical Expertise",
    description:
      "Demonstrates strong technical skills and ability to solve complex problems efficiently.",
    rating: 4.5,
  },
  {
    title: "Team Collaboration",
    description:
      "Works well with team members and contributes positively to team dynamics.",
    rating: 4.3,
  },
  {
    title: "Code Quality",
    description:
      "Writes clean, maintainable code following best practices and standards.",
    rating: 4.4,
  },
  {
    title: "Leadership",
    description:
      "Takes initiative and mentors junior developers, showing leadership potential.",
    rating: 4.0,
  },
];

const areasForImprovement = [
  {
    title: "Time Management",
    description:
      "Sometimes takes longer to complete tasks. Consider planning better and breaking down complex tasks.",
    rating: 3.2,
  },
  {
    title: "Documentation",
    description:
      "Could improve on documenting code and creating technical documentation.",
    rating: 3.5,
  },
  {
    title: "Communication",
    description:
      "Improve communication with stakeholders about project progress and blockers.",
    rating: 3.8,
  },
];

const managerComments =
  "John has been a valuable member of the team this quarter. His technical contributions have significantly improved our codebase quality. The Cloud Migration Platform project benefited greatly from his expertise. Moving forward, I'd recommend focusing on improving documentation practices and time management to maximize productivity. Overall, a strong performer with great potential for advancement.";

const teamReviews = [
  {
    name: "Sarah Johnson",
    designation: "Software Engineer",
    comment: "John is very helpful and always willing to review code. Great mentor!",
    rating: 4.5,
  },
  {
    name: "Michael Chen",
    designation: "Software Engineer",
    comment: "Technical discussions with John are always insightful. Learned a lot from him.",
    rating: 4.3,
  },
  {
    name: "Emily Rodriguez",
    designation: "Product Manager",
    comment:
      "Good collaboration on features. Could improve on updating progress more frequently.",
    rating: 3.8,
  },
];

export default function EmployeePerformance() {
  const { role } = useParams();
  const navigate = useNavigate();

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4) return "text-green-500";
    if (score >= 3.5) return "text-blue-500";
    if (score >= 3) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 4.5) return "bg-green-500/10";
    if (score >= 4) return "bg-green-500/10";
    if (score >= 3.5) return "bg-blue-500/10";
    if (score >= 3) return "bg-yellow-500/10";
    return "bg-orange-500/10";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Performance Review
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your performance and development
          </p>
        </div>

        {/* Overall Performance Score */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance Score</CardTitle>
            <CardDescription>
              Last evaluated on{" "}
              {new Date(performanceData.lastEvaluationDate).toLocaleDateString()}
              by {performanceData.evaluator}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col items-center">
                <div
                  className={`text-6xl font-bold ${getScoreColor(
                    performanceData.overallScore
                  )}`}
                >
                  {performanceData.overallScore}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  out of {performanceData.scoreOutOf}
                </p>
                <div className="flex gap-1 mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(performanceData.overallScore)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Performance Level
                  </p>
                  <Badge className="mt-2 bg-green-500/10 text-green-600 border-green-500/20">
                    Exceeding Expectations
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Designation
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mt-1">
                    {performanceData.designation}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </p>
                  <p className="text-gray-700 dark:text-gray-200 mt-1">
                    {performanceData.department}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manager Comments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Manager Comments
            </CardTitle>
            <CardDescription>Feedback from {performanceData.evaluator}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {managerComments}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Areas for Improvement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-500" />
                Strengths
              </CardTitle>
              <CardDescription>Areas of excellence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strengths.map((strength, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getScoreBgColor(strength.rating)} border-green-500/20`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {strength.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {strength.description}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-semibold text-green-600">
                          {strength.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-500" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Development opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areasForImprovement.map((area, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getScoreBgColor(area.rating)} border-orange-500/20`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {area.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {area.description}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-semibold text-orange-600">
                          {area.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Reviews
            </CardTitle>
            <CardDescription>
              Feedback from your team members (read-only)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamReviews.map((review, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary pl-4 py-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {review.designation}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mt-2">
                        {review.comment}
                      </p>
                    </div>
                    <div className="ml-4 flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
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
