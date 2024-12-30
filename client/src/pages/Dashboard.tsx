import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface CourseProgress {
  courseId: number;
  title: string;
  completedModules: number;
  totalModules: number;
  percentage: number;
}

interface RecentActivity {
  moduleId: number;
  moduleName: string;
  courseName: string;
  completed: boolean;
  lastAccessed: string;
}

interface AnalyticsData {
  courseProgress: CourseProgress[];
  recentActivity: RecentActivity[];
}

export default function Dashboard() {
  // In a real app, userId would come from auth context
  const userId = 1;

  const { data: analytics } = useQuery<AnalyticsData>({
    queryKey: [`/api/analytics/${userId}`],
  });

  if (!analytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Learning Progress Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {analytics.courseProgress.map((course) => (
          <Card key={course.courseId}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={course.percentage} />
                <p className="text-sm text-muted-foreground">
                  {course.completedModules} of {course.totalModules} modules completed
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Course Completion</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.courseProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div
                  key={`${activity.moduleId}-${index}`}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{activity.moduleName}</p>
                    <p className="text-sm text-muted-foreground">{activity.courseName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {format(new Date(activity.lastAccessed), "MMM d, yyyy")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.completed ? "Completed" : "In Progress"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
