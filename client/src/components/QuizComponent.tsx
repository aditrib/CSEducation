import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";
import type { Quiz, QuizQuestion } from "@/types";

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: () => void;
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (answer: number | string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const runCode = async (code: string, testCases: { input: string; expectedOutput: string; }[]) => {
    const response = await fetch('/api/run-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testCases }),
    });
    const result = await response.json();
    return result.success;
  };

  const handleSubmit = async () => {
    let score = 0;
    const questions = quiz.questions;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = answers[i];

      if (question.type === 'multiple-choice') {
        if (answer === question.correctAnswer) score++;
      } else if (question.type === 'code' && question.testCases) {
        const passed = await runCode(answer as string, question.testCases);
        if (passed) score++;
      }
      // Free text responses are not scored
    }

    toast({
      title: "Quiz submitted!",
      description: `Thank you for completing the quiz.`
    });

    setIsSubmitted(true);
    onComplete();
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswer(parseInt(value))}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'free-text':
        return (
          <Textarea
            value={answers[currentQuestion]?.toString() || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="min-h-[100px]"
          />
        );

      case 'code':
        return (
          <div className="space-y-4">
            <Textarea
              value={answers[currentQuestion]?.toString() || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Write your Python code here..."
              className="font-mono min-h-[150px]"
            />
            {question.testCases && (
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-semibold mb-2">Test Cases:</h4>
                {question.testCases.map((test, index) => (
                  <div key={index} className="text-sm">
                    <p>Input: {test.input}</p>
                    <p>Expected: {test.expectedOutput}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const question = quiz.questions[currentQuestion];

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quiz Submitted</h3>
            <p className="text-muted-foreground">
              Thank you for completing this quiz!
            </p>
          </div>
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
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </h3>
          <p className="mb-4">{question.question}</p>

          {renderQuestion(question)}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit}>Submit Quiz</Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={answers[currentQuestion] === undefined}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}