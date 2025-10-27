import { motion } from "framer-motion";
import { Flame, Droplet } from "lucide-react";

export function CampfireEffect() {
  return (
    <div className="flex items-end justify-center gap-1">
      {/* Flame 1 */}
      <motion.div
        className="text-campfire-glow animate-campfire"
        style={{ animationDelay: "0s" }}
        aria-hidden="true"
      >
        <Flame className="h-8 w-8 fill-current" />
      </motion.div>
      
      {/* Flame 2 - Center, larger */}
      <motion.div
        className="text-campfire-glow animate-campfire"
        style={{ animationDelay: "0.3s" }}
        aria-hidden="true"
      >
        <Flame className="h-10 w-10 fill-current" />
      </motion.div>
      
      {/* Flame 3 */}
      <motion.div
        className="text-campfire-glow animate-campfire"
        style={{ animationDelay: "0.6s" }}
        aria-hidden="true"
      >
        <Flame className="h-8 w-8 fill-current" />
      </motion.div>
    </div>
  );
}

export function WaterRippleButton({ children, onClick, className = "", ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - rect.left - radius}px`;
    ripple.style.top = `${e.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple-effect');
    
    const existingRipple = button.getElementsByClassName('ripple-effect')[0];
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    if (onClick) onClick();
  };
  
  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
      <style>{`
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}

export function WaterDroplets() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20"
          initial={{ y: -20, x: `${Math.random() * 100}%` }}
          animate={{
            y: "100vh",
            x: `${Math.random() * 100}%`,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "linear",
          }}
        >
          <Droplet className="h-4 w-4 fill-current" />
        </motion.div>
      ))}
    </div>
  );
}

export function WildlifeSilhouette({ type = "bird" }: { type?: "bird" | "deer" | "elephant" }) {
  const silhouettes = {
    bird: "M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 7c-.55 0-1 .45-1 1 0 1.1-.9 2-2 2s-2-.9-2-2c0-.55-.45-1-1-1s-1 .45-1 1c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.55-.45-1-1-1z",
    deer: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    elephant: "M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z",
  };

  return (
    <motion.div
      className="absolute top-1/4 text-foreground/10"
      initial={{ x: "-10%" }}
      animate={{ x: "110vw" }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden="true"
    >
      <svg
        className="w-12 h-12 md:w-16 md:h-16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d={silhouettes[type]} />
      </svg>
    </motion.div>
  );
}

export function FloatingLeaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-jungle-canopy/15"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.67C7.91 17.18 10.47 12.3 17 10c.59-.16 1-.74 1-1.36v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c0 .62.41 1.2 1 1.36zM9 8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
