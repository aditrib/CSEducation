import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Course, Module, Content, Quiz } from "@/types";

export default function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: course, refetch } = useQuery<Course>({
    queryKey: [`/api/courses/${id}`],
  });

  const updateModule = useMutation({
    mutationFn: async ({ moduleId, data }: { moduleId: number; data: Partial<Module> }) => {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update module");
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Module updated",
        description: "The module has been successfully updated",
      });
    },
  });

  const addContent = useMutation({
    mutationFn: async ({ moduleId, data }: { moduleId: number; data: Partial<Content> }) => {
      const response = await fetch(`/api/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, moduleId }),
      });
      if (!response.ok) throw new Error("Failed to add content");
      return response.json();
    },
    onSuccess: () => {
      refetch();
      toast({
        title: "Content added",
        description: "New content has been added to the module",
      });
    },
  });

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Course: {course.title}</h1>

      <div className="space-y-8">
        {course.modules?.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle>
                <Input
                  value={module.title}
                  onChange={(e) =>
                    updateModule.mutate({
                      moduleId: module.id,
                      data: { title: e.target.value },
                    })
                  }
                  className="text-xl font-bold"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={module.description}
                onChange={(e) =>
                  updateModule.mutate({
                    moduleId: module.id,
                    data: { description: e.target.value },
                  })
                }
                className="mb-4"
              />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Content</h3>
                {module.content?.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <Input
                          value={item.title}
                          onChange={(e) => {
                            // Handle content update
                          }}
                          className="mb-2"
                        />
                        {item.type === "text" ? (
                          <Textarea
                            value={item.content}
                            onChange={(e) => {
                              // Handle content update
                            }}
                          />
                        ) : (
                          <Input
                            value={item.content}
                            onChange={(e) => {
                              // Handle video URL update
                            }}
                            placeholder="Video URL"
                          />
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          // Handle content deletion
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}

                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      addContent.mutate({
                        moduleId: module.id,
                        data: {
                          title: "New Text Content",
                          type: "text",
                          content: "",
                          sequenceOrder: (module.content?.length || 0) + 1,
                        },
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Text Content
                  </Button>
                  <Button
                    onClick={() =>
                      addContent.mutate({
                        moduleId: module.id,
                        data: {
                          title: "New Video",
                          type: "video",
                          content: "",
                          sequenceOrder: (module.content?.length || 0) + 1,
                        },
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
