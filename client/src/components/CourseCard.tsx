import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [, setLocation] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <motion.img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{course.description}</p>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full relative overflow-hidden group"
            onClick={() => setLocation(`/course/${course.id}`)}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative">Start Learning</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}