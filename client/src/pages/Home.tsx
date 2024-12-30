import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "@/components/CourseCard";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Course } from "@/types";

export default function Home() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ backgroundSize: "200% auto" }}
        >
          AI-Powered Learning for High School Students
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Explore interactive courses combining traditional subjects with cutting-edge AI technology
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {courses?.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}