import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { ModuleSidebar } from "@/components/ModuleSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  
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
          window.location.href = `/module/${moduleId}`;
        }}
      />
      
      <div className="flex-1 p-8">
        <Card>
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{course.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Modules:</span>
                <span>{course.modules.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
