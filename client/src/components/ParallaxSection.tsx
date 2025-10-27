import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: ["start start" | "start end" | "end start" | "end end", "start start" | "start end" | "end start" | "end end"];
}

export function ParallaxSection({
  children,
  speed = 50,
  className = "",
  offset = ["start end", "end start"],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : speed]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
  containerClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = -60,
  className = "",
  containerClassName = "",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: prefersReducedMotion ? 0 : y, opacity: prefersReducedMotion ? 1 : opacity }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  fadeEffect?: boolean;
}

export function ParallaxText({
  children,
  speed = 30,
  className = "",
  fadeEffect = false,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : speed]);
  const opacity = fadeEffect && !prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    : undefined;

  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  zIndex?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0,
  zIndex = 0,
  className = "",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : speed]);

  return (
    <div ref={ref} style={{ zIndex }} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function useParallaxValue(speed: number): MotionValue<number> {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : speed]);
}
