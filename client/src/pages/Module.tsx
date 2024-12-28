import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { VideoPlayer } from "@/components/VideoPlayer";
import { QuizComponent } from "@/components/QuizComponent";
import { Card, CardContent } from "@/components/ui/card";

export default function Module() {
  const { id } = useParams<{ id: string }>();
  
  const { data: module } = useQuery({
    queryKey: [`/api/modules/${id}`],
  });

  const updateProgress = useMutation({
    mutationFn: async (completed: boolean) => {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // In a real app, this would come from auth
          moduleId: parseInt(id),
          completed,
        }),
      });
      return response.json();
    },
  });

  if (!module) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{module.title}</h1>
      
      <div className="space-y-8">
        {module.content.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              {item.type === "video" ? (
                <VideoPlayer
                  url={item.content}
                  onEnded={() => updateProgress.mutate(true)}
                />
              ) : (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </CardContent>
          </Card>
        ))}

        {module.quizzes.map((quiz) => (
          <QuizComponent
            key={quiz.id}
            quiz={quiz}
            onComplete={() => updateProgress.mutate(true)}
          />
        ))}
      </div>
    </div>
  );
}
