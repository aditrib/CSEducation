import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { FlipContentCard } from "@/components/FlipContentCard";
import { QuizComponent } from "@/components/QuizComponent";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, BookOpen } from "lucide-react";
import type { Module as ModuleType } from "@/types";

export default function Module() {
  const { id } = useParams<{ id: string }>();
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

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

  const currentContent = module.content?.[currentContentIndex];
  const totalPages = (module.content?.length || 0) + (module.quizzes?.length || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div 
        className="flex items-center gap-4 mb-8"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <BookOpen className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {module.title}
        </h1>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentContent ? (
            <motion.div
              key={`content-${currentContent.id}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <FlipContentCard
                content={currentContent}
                onComplete={() => updateProgress.mutate(true)}
              />
            </motion.div>
          ) : module.quizzes?.map((quiz) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <QuizComponent
                quiz={quiz}
                onComplete={() => updateProgress.mutate(true)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            onClick={() => setCurrentContentIndex(prev => prev - 1)}
            disabled={currentContentIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Page
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Page {currentContentIndex + 1} of {totalPages}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === currentContentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentContentIndex(prev => prev + 1)}
            disabled={currentContentIndex >= (module.content?.length || 0) - 1}
            className="flex items-center gap-2"
          >
            Next Page
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}