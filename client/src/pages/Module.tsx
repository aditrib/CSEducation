import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { VideoPlayer } from "@/components/VideoPlayer";
import { QuizComponent } from "@/components/QuizComponent";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
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
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="animate-spin text-primary h-6 w-6" />
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
      >
        {module.title}
      </motion.h1>

      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {module.content?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {item.type === "video" ? (
                    <div className="relative">
                      <VideoPlayer
                        url={item.content}
                        onEnded={() => {
                          updateProgress.mutate(true);
                          // Show completion celebration
                          const element = document.createElement("div");
                          element.className = "fixed inset-0 flex items-center justify-center z-50";
                          element.innerHTML = `
                            <div class="bg-black/50 absolute inset-0 backdrop-blur-sm"></div>
                            <div class="relative bg-white p-8 rounded-lg shadow-xl transform scale-150 animate-celebration">
                              <div class="text-4xl mb-4">🎉</div>
                              <div class="text-2xl font-bold text-primary">Great job!</div>
                            </div>
                          `;
                          document.body.appendChild(element);
                          setTimeout(() => element.remove(), 2000);
                        }}
                      />
                      {updateProgress.isSuccess && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="absolute top-2 right-2"
                        >
                          <CheckCircle className="text-green-500 h-6 w-6" />
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: (module.content?.length || 0) * 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <QuizComponent
              quiz={quiz}
              onComplete={() => updateProgress.mutate(true)}
            />
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes celebration {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-celebration {
          animation: celebration 0.5s ease-out forwards;
        }
      `}</style>
    </motion.div>
  );
}