import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Quiz } from "@/types";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: () => void;
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (answer: number | string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (answers.length !== quiz.questions.length) {
        toast({
          title: "Error",
          description: "Please answer all questions before submitting.",
          variant: "destructive",
        });
        return;
      }

      let score = 0;
      const questions = quiz.questions;

      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const answer = answers[i];
        if (typeof answer === 'number' && answer === question.correctAnswer) {
          score++;
        }
      }

      // First update the UI to show completion
      setIsSubmitted(true);

      toast({
        title: "Quiz submitted!",
        description: `You got ${score} out of ${questions.length} questions correct!`,
      });

      // Then try to update the progress
      try {
        await onComplete();
      } catch (error) {
        console.error('Error updating progress:', error);
        // Don't show error to user since the quiz was completed successfully
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const question = quiz.questions[currentQuestion];

  if (!question) {
    return null;
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold mb-2"
            >
              Quiz Completed
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground"
            >
              Thank you for completing this quiz!
            </motion.p>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h3>
            <p className="mb-4">{question.question}</p>

            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
              className="space-y-3"
            >
              {question.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </motion.div>
              ))}
            </RadioGroup>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0 || isSubmitting}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={answers.length !== quiz.questions.length || isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={answers[currentQuestion] === undefined || isSubmitting}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}