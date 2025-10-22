import { useEffect, useRef } from 'react';
import { Brain } from 'lucide-react';

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Trigger animation on mount
    container.style.animation = 'logoEnter 1s ease-out forwards';

    return () => {
      container.style.animation = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center justify-center gap-2 opacity-0"
      style={{
        keyframes: `
          @keyframes logoEnter {
            from {
              opacity: 0;
              transform: scale(0.5) rotateY(180deg);
            }
            to {
              opacity: 1;
              transform: scale(1) rotateY(0deg);
            }
          }
          @keyframes orbitPulse {
            0%, 100% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(180deg) scale(1.1);
            }
          }
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
            }
            50% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.6);
            }
          }
        `,
      }}
    >
      {/* Animated Logo Container */}
      <div
        className="relative w-12 h-12 flex items-center justify-center"
        style={{
          animation: 'glow 3s ease-in-out infinite',
        }}
      >
        {/* Outer orbit ring */}
        <div
          ref={orbitRef}
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: 'rgba(59, 130, 246, 0.6)',
            borderRightColor: 'rgba(6, 182, 212, 0.6)',
            animation: 'orbitPulse 4s linear infinite',
          }}
        />

        {/* Middle ring */}
        <div
          className="absolute inset-1 rounded-full border border-transparent"
          style={{
            borderBottomColor: 'rgba(100, 200, 255, 0.4)',
            borderLeftColor: 'rgba(100, 200, 255, 0.4)',
            animation: 'orbitPulse 6s linear infinite reverse',
          }}
        />

        {/* Brain Icon */}
        <div className="relative z-10 bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
          <Brain className="w-6 h-6 text-primary-foreground animate-pulse" />
        </div>

        {/* Floating particles */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              animation: `orbitPulse ${2 + i * 0.5}s linear infinite`,
              left: '50%',
              top: '50%',
              marginLeft: '-2px',
              marginTop: '-2px',
              opacity: 0.6,
              transformOrigin: `${6 + i * 3}px 0px`,
            }}
          />
        ))}
      </div>

      {/* Text with glow */}
      <div className="flex flex-col">
        <span
          className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          style={{
            animation: 'logoEnter 1s ease-out forwards',
            backgroundSize: '200% auto',
            animation: 'logoEnter 1s ease-out forwards, glow 3s ease-in-out infinite',
          }}
        >
          HRMS AI
        </span>
        <span className="text-xs text-primary/70 -mt-1 tracking-widest">
          Intelligent HR
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes logoEnter {
          from {
            opacity: 0;
            transform: scale(0.5) rotateY(180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        @keyframes orbitPulse {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.1);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(6, 182, 212, 0.6);
          }
        }
      `}</style>
    </div>
  );
}
