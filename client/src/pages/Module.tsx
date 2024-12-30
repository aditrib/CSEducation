import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { VideoPlayer } from "@/components/VideoPlayer";
import { QuizComponent } from "@/components/QuizComponent";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { Module as ModuleType } from "@/types";

export default function Module() {
  const { id } = useParams<{ id: string }>();

  const { data: module } = useQuery<ModuleType>({
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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="text-3xl font-bold mb-6"
      >
        {module.title}
      </motion.h1>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {module.content?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  {item.type === "video" ? (
                    <div className="relative">
                      <VideoPlayer
                        url={item.content}
                        onEnded={() => {
                          updateProgress.mutate(true);
                          // Show completion animation
                          const element = document.createElement("div");
                          element.className = "absolute inset-0 flex items-center justify-center bg-black/50";
                          element.innerHTML = `<div class="text-white text-xl">✓ Completed</div>`;
                          setTimeout(() => element.remove(), 2000);
                        }}
                      />
                      {updateProgress.isSuccess && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <CheckCircle className="text-green-500 h-6 w-6" />
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {module.quizzes?.map((quiz) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (module.content?.length || 0) * 0.1 }}
          >
            <QuizComponent
              quiz={quiz}
              onComplete={() => updateProgress.mutate(true)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}