'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string | ReactNode;
  className?: string;
  once?: boolean;
  delay?: number;
}

export default function AnimatedText({ 
  text, 
  className = "", 
  once = true,
  delay = 0
}: AnimatedTextProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={defaultAnimations}
      className={className}
    >
      {text}
    </motion.div>
  );
}

export function AnimatedGradientText({ 
  text, 
  className = "", 
  once = true,
  delay = 0 
}: AnimatedTextProps) {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  });

  const defaultAnimations = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={defaultAnimations}
      className={`text-gradient ${className}`}
    >
      {text}
    </motion.div>
  );
} 