import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "wouter";
import { VideoPlayer } from "@/components/VideoPlayer";
import { QuizComponent } from "@/components/QuizComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedIllustration } from "@/components/AnimatedIllustration";
import { LearningMascot } from "@/components/LearningMascot";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Module as ModuleType } from "@/types";
import { CodeEditor } from "@/components/CodeEditor";

export default function Module() {
  const { id } = useParams<{ id: string }>();
  const [mascotState, setMascotState] = useState<'idle' | 'talking' | 'celebrating' | 'thinking'>('idle');
  const [mascotMessage, setMascotMessage] = useState<string>();

  const { data: module } = useQuery<ModuleType>({
    queryKey: [`/api/modules/${id}`],
  });

  const updateProgress = useMutation({
    mutationFn: async (completed: boolean) => {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, 
          moduleId: parseInt(id),
          completed,
        }),
      });
      return response.json();
    },
    onSuccess: () => {
      setMascotState('celebrating');
      setMascotMessage("Great job! You're making excellent progress! 🎉");
    }
  });

  useEffect(() => {
    if (module) {
      setMascotState('talking');
      setMascotMessage(`Welcome to ${module.title}! I'm here to help you learn. 😊`);
    }
  }, [module]);

  const handleCodeSuccess = () => {
    updateProgress.mutate(true);
    setMascotState('celebrating');
    setMascotMessage("Great job writing your first Python code! 🎉 You're on your way to becoming a programmer!");
  };

  if (!module) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="flex items-center gap-4"
        >
          <AnimatedIllustration type="learning" />
          <span className="text-lg">Loading your awesome lesson...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <AnimatedIllustration type="learning" />
          </motion.div>

          <motion.h1 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {module.title}
          </motion.h1>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {module.description}
          </motion.p>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-8 p-4">
            {module.content?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                onViewportEnter={() => {
                  setMascotState('thinking');
                  setMascotMessage(
                    item.title.includes('Python') 
                      ? "Let's write some Python code! Don't worry, I'll help you! 💻" 
                      : item.type === 'video'
                        ? "Let's watch this video together! 🎥"
                        : "Take your time reading this section. 📚"
                  );
                }}
              >
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-colors duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <AnimatedIllustration 
                      type={
                        item.title.includes('Python') 
                          ? "thinking"
                          : item.type === "video" 
                            ? "learning" 
                            : "reading"
                      } 
                    />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    {item.type === "video" ? (
                      <div className="relative rounded-lg overflow-hidden">
                        <VideoPlayer
                          url={item.content}
                          onEnded={() => {
                            updateProgress.mutate(true);
                            setMascotState('celebrating');
                            setMascotMessage("You've completed the video! Ready for the next section? 🌟");
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20"
                          initial={false}
                          whileHover={{ opacity: 0 }}
                          animate={{ opacity: 0.1 }}
                        />
                      </div>
                    ) : (
                      <motion.div
                        className="prose max-w-none relative"
                        initial={false}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="relative z-10"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />

                        {item.title.includes('Python') && (
                          <div className="mt-8">
                            <CodeEditor
                              initialCode="# Write your code here"
                              testCases={[
                                {
                                  input: "",
                                  expectedOutput: "Hello World"
                                }
                              ]}
                              onSuccess={handleCodeSuccess}
                            />
                          </div>
                        )}

                        <motion.div
                          className="absolute -top-4 -left-4 w-12 h-12 bg-primary/5 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-500/5 rounded-full"
                          animate={{ 
                            scale: [1.2, 1, 1.2],
                            rotate: [0, -90, 0],
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {module.quizzes?.map((quiz) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (module.content?.length || 0) * 0.2 }}
                onViewportEnter={() => {
                  setMascotState('talking');
                  setMascotMessage("Time to test your knowledge! Don't worry, I'm here to help! 📝");
                }}
              >
                <div className="flex justify-center mb-4">
                  <AnimatedIllustration type="quiz" />
                </div>
                <QuizComponent
                  quiz={quiz}
                  onComplete={() => {
                    updateProgress.mutate(true);
                    setMascotState('celebrating');
                    setMascotMessage("Amazing work on the quiz! You're doing great! 🎉");
                  }}
                />
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>

      <LearningMascot
        state={mascotState}
        message={mascotMessage}
        onMessageComplete={() => {
          setMascotState('idle');
          setMascotMessage(undefined);
        }}
      />
    </div>
  );
}