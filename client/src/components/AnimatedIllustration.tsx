import { motion } from "framer-motion";
import { BookOpen, Sparkles, Brain, Zap } from "lucide-react";

interface AnimatedIllustrationProps {
  type: 'reading' | 'thinking' | 'learning' | 'quiz';
}

export function AnimatedIllustration({ type }: AnimatedIllustrationProps) {
  const illustrations = {
    reading: {
      icon: BookOpen,
      color: "text-blue-500",
      background: "bg-blue-100",
    },
    thinking: {
      icon: Brain,
      color: "text-purple-500",
      background: "bg-purple-100",
    },
    learning: {
      icon: Sparkles,
      color: "text-yellow-500",
      background: "bg-yellow-100",
    },
    quiz: {
      icon: Zap,
      color: "text-green-500",
      background: "bg-green-100",
    },
  };

  const { icon: Icon, color, background } = illustrations[type];

  return (
    <motion.div 
      className={`relative w-24 h-24 rounded-full ${background} flex items-center justify-center group`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Icon className={`w-12 h-12 ${color}`} />
      </motion.div>
      
      {/* Floating particles */}
      <motion.div
        className="absolute inset-0"
        initial={false}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${color} opacity-50`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
              y: [-10, -20, -10],
              x: [0, i * 10 - 10, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${50 + i * 15}%`,
              top: "20%",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
