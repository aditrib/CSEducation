import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "@/components/CourseCard";
import { Card } from "@/components/ui/card";
import type { Course } from "@/types";

export default function Home() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          AI-Powered Learning for High School Students
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore interactive courses combining traditional subjects with cutting-edge AI technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <img
            src="https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046"
            alt="Students learning"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2">Interactive Learning</h2>
          <p className="text-muted-foreground">
            Engage with AI-enhanced content and learn at your own pace
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="Classroom technology"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2">Modern Technology</h2>
          <p className="text-muted-foreground">
            Experience learning through cutting-edge AI tools and technologies
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
          <img
            src="https://images.unsplash.com/photo-1574803442176-70d4b465c920"
            alt="AI education"
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold mb-2">AI Integration</h2>
          <p className="text-muted-foreground">
            Learn how AI transforms traditional subjects
          </p>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}