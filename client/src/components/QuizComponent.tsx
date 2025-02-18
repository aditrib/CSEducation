import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Quiz } from "@/types";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: () => void;
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const handleAnswer = async (questionIndex: number, answer: number) => {
    if (submitted[questionIndex]) return;

    const question = quiz.questions[questionIndex];
    const isCorrect = answer === question.correctAnswer;

    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    setSubmitted(prev => ({ ...prev, [questionIndex]: true }));

    toast({
      title: isCorrect ? "Correct! 🎉" : "Not quite right",
      description: isCorrect 
        ? "Great job! You got it right!"
        : question.explanation || "Keep trying! Review the material and try again.",
      variant: isCorrect ? "default" : "destructive",
    });

    // Check if all questions are answered correctly
    const allAnswered = quiz.questions.every((_, idx) => 
      submitted[idx] && answers[idx] === quiz.questions[idx].correctAnswer
    );

    if (allAnswered) {
      try {
        await onComplete();
        toast({
          title: "Congratulations! 🎉",
          description: "You've completed the quiz successfully!",
        });
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
        </CardHeader>
      </Card>

      {quiz.questions.map((question, questionIndex) => (
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: questionIndex * 0.1 }}
        >
          <Card className={`
            overflow-hidden transition-colors duration-300
            ${submitted[questionIndex] 
              ? answers[questionIndex] === question.correctAnswer
                ? 'border-green-500'
                : 'border-red-500'
              : ''
            }
          `}>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Question {questionIndex + 1}
                </h3>
                <p className="mb-4">{question.question}</p>

                <RadioGroup
                  value={answers[questionIndex]?.toString()}
                  onValueChange={(value) => {
                    if (!submitted[questionIndex]) {
                      handleAnswer(questionIndex, parseInt(value));
                    }
                  }}
                  className="space-y-3"
                  disabled={submitted[questionIndex]}
                >
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 relative"
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`question-${questionIndex}-option-${index}`}
                        disabled={submitted[questionIndex]}
                      />
                      <Label
                        htmlFor={`question-${questionIndex}-option-${index}`}
                        className={`
                          ${submitted[questionIndex] && index === question.correctAnswer
                            ? 'text-green-500 font-semibold'
                            : submitted[questionIndex] && answers[questionIndex] === index
                              ? 'text-red-500 line-through'
                              : ''
                          }
                        `}
                      >
                        {option}
                      </Label>
                      {submitted[questionIndex] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-2"
                        >
                          {index === question.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : answers[questionIndex] === index ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : null}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}