import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, CheckCircle, XCircle, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeEditorProps {
  initialCode?: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
  }>;
  onSuccess?: () => void;
}

export function CodeEditor({ initialCode = '', testCases, onSuccess }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');
  const { toast } = useToast();

  const runCode = async (skipTests?: boolean) => {
    setIsRunning(true);
    setOutput('');

    try {
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code, 
          testCases: skipTests ? [] : testCases,
          captureOutput: true 
        }),
      });

      const data = await response.json();

      if (data.output) {
        setOutput(data.output);
      }

      if (!skipTests && testCases) {
        if (data.success) {
          toast({
            title: "Success! 🎉",
            description: "Your code passed all test cases!",
          });
          onSuccess?.();
        } else {
          toast({
            title: "Keep trying!",
            description: "Your code didn't pass all test cases yet.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error running code",
        description: "There was a problem executing your code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: isRunning ? 360 : 0 }}
            transition={{ duration: 2, repeat: isRunning ? Infinity : 0 }}
          >
            {isRunning ? <Loader2 className="h-5 w-5" /> : <Code2 className="h-5 w-5" />}
          </motion.div>
          Python Code Editor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 p-4 font-mono text-sm bg-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your Python code here..."
          />
          <AnimatePresence>
            {isRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/50 flex items-center justify-center"
              >
                <Loader2 className="h-8 w-8 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          {testCases && (
            <Button
              onClick={() => runCode(false)}
              disabled={isRunning || !code.trim()}
              className="flex-1"
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run Tests
            </Button>
          )}
          <Button
            onClick={() => runCode(true)}
            disabled={isRunning || !code.trim()}
            variant="outline"
            className="flex-1"
          >
            <Code2 className="h-4 w-4 mr-2" />
            Run Code
          </Button>
        </div>

        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle className="text-sm">Output:</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {output}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}