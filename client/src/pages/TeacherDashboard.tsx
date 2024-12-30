import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Book, Users } from "lucide-react";
import type { Course, Module, Quiz } from "@/types";

interface StudentResponse {
  userId: number;
  username: string;
  moduleId: number;
  quizId: number;
  answers: (string | number)[];
  submittedAt: string;
}

export default function TeacherDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: studentResponses } = useQuery<StudentResponse[]>({
    queryKey: ["/api/student-responses"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {courses?.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(`/course/${course.id}/edit`)}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Course
                      </Button>
                    </div>

                    {course.modules?.map((module) => (
                      <div key={module.id} className="pl-4 mt-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{module.title}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLocation(`/module/${module.id}/edit`)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {studentResponses?.map((response) => (
                  <Card key={`${response.userId}-${response.quizId}`} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{response.username}</h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {new Date(response.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Answers:</h4>
                      {response.answers.map((answer, index) => (
                        <div key={index} className="pl-4 text-sm">
                          <span className="text-muted-foreground">Q{index + 1}:</span>{" "}
                          {typeof answer === "string" ? answer : `Option ${answer + 1}`}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}