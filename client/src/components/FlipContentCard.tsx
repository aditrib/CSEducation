import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { VideoPlayer } from "@/components/VideoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Content } from "@/types";

interface FlipContentCardProps {
  content: Content;
  onComplete?: () => void;
}

export function FlipContentCard({ content, onComplete }: FlipContentCardProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = () => {
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 500);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        initial={false}
        animate={{
          rotateY: isFlipping ? [0, 180, 360] : 0,
          scale: isFlipping ? [1, 0.9, 1] : 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="relative preserve-3d"
      >
        <Card className={`
          w-full bg-gradient-to-br from-background to-muted
          shadow-xl hover:shadow-2xl transition-shadow duration-300
          ${isFlipping ? 'animate-page-flip' : ''}
        `}>
          <CardContent className="relative p-6">
            {content.type === "video" ? (
              <div className="relative">
                <VideoPlayer
                  url={content.content}
                  onEnded={() => {
                    handleFlip();
                    onComplete?.();
                  }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background/20 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/20 to-transparent" />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="prose max-w-none relative min-h-[300px]"
              >
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {content.title}
                </h2>
                <div 
                  className="relative z-10"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background/20 to-transparent" />
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Page curl effect */}
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-black/10 rounded-bl-lg transform origin-bottom-right transition-transform hover:scale-110" />
      </motion.div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes page-flip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg) scale(0.9); }
          100% { transform: rotateY(360deg); }
        }
        .animate-page-flip {
          animation: page-flip 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
