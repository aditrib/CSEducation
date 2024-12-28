import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [, setLocation] = useLocation();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{course.description}</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => setLocation(`/course/${course.id}`)}
        >
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
}