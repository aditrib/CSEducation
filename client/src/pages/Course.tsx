import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { ModuleSidebar } from "@/components/ModuleSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  const { data: course } = useQuery({
    queryKey: [`/api/courses/${id}`],
  });

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <ModuleSidebar
        modules={course.modules}
        currentModuleId={course.modules[0]?.id}
        progress={{}}
        onSelectModule={(moduleId) => {
          setLocation(`/module/${moduleId}`);
        }}
      />

      <div className="flex-1 p-8">
        <Card>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{course.description}</p>
            <div className="grid grid-cols-1 gap-4">
              {course.modules.map((module) => (
                <Card key={module.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Button
                        onClick={() => setLocation(`/module/${module.id}`)}
                        className="flex items-center gap-2"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Start Module
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{module.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}