import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, MessageCircle, ThumbsUp, Award } from "lucide-react";

interface LearningMascotProps {
  state?: 'idle' | 'talking' | 'celebrating' | 'thinking';
  message?: string;
  onMessageComplete?: () => void;
}

export function LearningMascot({ 
  state = 'idle',
  message,
  onMessageComplete 
}: LearningMascotProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onMessageComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onMessageComplete]);

  return (
    <motion.div 
      className="fixed bottom-4 right-4 flex items-end gap-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-lg p-4 shadow-lg max-w-xs mb-4 relative"
          >
            <p className="text-sm">{message}</p>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="relative"
        animate={state}
        variants={{
          idle: {
            y: [0, -10, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }
          },
          talking: {
            scale: [1, 1.05, 1],
            transition: {
              duration: 0.3,
              repeat: Infinity
            }
          },
          celebrating: {
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
            transition: {
              duration: 0.5
            }
          },
          thinking: {
            rotate: [0, 10, 0],
            transition: {
              duration: 1,
              repeat: Infinity
            }
          }
        }}
      >
        {/* Character Base */}
        <motion.div 
          className="w-24 h-24 bg-primary rounded-full relative overflow-hidden border-4 border-white shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(true)}
        >
          {/* Face */}
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="relative"
              animate={state === 'talking' ? { y: [-2, 2] } : {}}
              transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
            >
              {/* Eyes */}
              <motion.div 
                className="flex gap-4 mb-2"
                animate={state === 'thinking' ? { scaleY: [1, 0.5, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-3 h-3 bg-white rounded-full" />
                <div className="w-3 h-3 bg-white rounded-full" />
              </motion.div>
              
              {/* Mouth */}
              <motion.div 
                className="w-8 h-3 bg-white rounded-full mx-auto"
                animate={state === 'celebrating' ? { 
                  scaleX: [1, 1.5, 1],
                  scaleY: [1, 0.8, 1]
                } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <AnimatePresence>
            {state === 'celebrating' && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-2"
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute -top-2 -left-2"
                >
                  <Award className="w-6 h-6 text-yellow-400 fill-current" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Minimize Button */}
        <motion.button
          className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsVisible(false)}
        >
          ×
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
