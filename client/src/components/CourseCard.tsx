import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative overflow-hidden">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <motion.span
              animate={{ color: ["hsl(var(--primary))", "hsl(var(--primary))", "#9333ea"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {course.title}
            </motion.span>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-yellow-500"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">{course.description}</p>
        </CardContent>

        <CardFooter>
          <Button 
            className="w-full relative overflow-hidden group"
            onClick={() => setLocation(`/course/${course.id}`)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="relative flex items-center gap-2">
              Start Learning
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ✨
              </motion.div>
            </span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}