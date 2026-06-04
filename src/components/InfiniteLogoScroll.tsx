import { useEffect, useRef, useState } from 'react';

interface Logo {
  src: string;
  alt: string;
  url: string;
  size: string;
}

interface InfiniteLogoScrollProps {
  logos: Logo[];
}

interface VelocitySample {
  position: number;
  timestamp: number;
}

export default function InfiniteLogoScroll({ logos }: InfiniteLogoScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollPositionRef = useRef(0);
  const isUserInteractingRef = useRef(false);
  const velocityRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const velocitySamplesRef = useRef<VelocitySample[]>([]);
  const lastTouchMoveTimeRef = useRef(0);

  const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 5;

    if (scrollPositionRef.current === 0) {
      scrollPositionRef.current = scrollWidth * 2;
      scrollContainer.scrollLeft = scrollPositionRef.current;
    }

    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const VELOCITY_THRESHOLD = 0.1;
    const DECELERATION_RATE = 0.95;
    const AUTO_SCROLL_SPEED = isMobile ? 0.4 : 0.2;
    const MAX_VELOCITY = 30;
    const VELOCITY_SAMPLE_DURATION = 80;

    const animate = () => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isUserInteractingRef.current) {
        if (Math.abs(velocityRef.current) > VELOCITY_THRESHOLD) {
          velocityRef.current *= DECELERATION_RATE;
          scrollPositionRef.current += velocityRef.current;
        } else {
          velocityRef.current = 0;
          scrollPositionRef.current += AUTO_SCROLL_SPEED;
        }

        if (scrollPositionRef.current >= scrollWidth * 3.5) {
          const overflow = scrollPositionRef.current - scrollWidth * 3;
          scrollPositionRef.current = scrollWidth * 2 + overflow;
        } else if (scrollPositionRef.current < scrollWidth * 1.5) {
          const underflow = scrollWidth * 2 - scrollPositionRef.current;
          scrollPositionRef.current = scrollWidth * 3 - underflow;
        }

        scrollContainer.scrollLeft = scrollPositionRef.current;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const addVelocitySample = (position: number, timestamp: number) => {
      velocitySamplesRef.current.push({ position, timestamp });

      velocitySamplesRef.current = velocitySamplesRef.current.filter(
        sample => timestamp - sample.timestamp < VELOCITY_SAMPLE_DURATION
      );
    };

    const calculateVelocity = () => {
      const samples = velocitySamplesRef.current;
      if (samples.length < 2) return 0;

      const oldest = samples[0];
      const newest = samples[samples.length - 1];
      const timeDelta = newest.timestamp - oldest.timestamp;

      if (timeDelta === 0) return 0;

      const positionDelta = newest.position - oldest.position;
      let velocity = (positionDelta / timeDelta) * 16.67;

      velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));

      return velocity;
    };

    const handleTouchStart = () => {
      isUserInteractingRef.current = true;
      velocityRef.current = 0;
      velocitySamplesRef.current = [];
      const now = performance.now();
      addVelocitySample(scrollContainer.scrollLeft, now);
      lastTouchMoveTimeRef.current = now;
    };

    const handleTouchMove = () => {
      if (!isUserInteractingRef.current) return;

      const now = performance.now();
      const currentScroll = scrollContainer.scrollLeft;

      addVelocitySample(currentScroll, now);
      lastTouchMoveTimeRef.current = now;
    };

    const handleTouchEnd = () => {
      const now = performance.now();
      const timeSinceLastMove = now - lastTouchMoveTimeRef.current;

      if (timeSinceLastMove < 50) {
        velocityRef.current = calculateVelocity();
      } else {
        velocityRef.current = 0;
      }

      scrollPositionRef.current = scrollContainer.scrollLeft;
      isUserInteractingRef.current = false;
      velocitySamplesRef.current = [];
    };

    const handleScroll = () => {
      if (!isUserInteractingRef.current) return;

      const currentScroll = scrollContainer.scrollLeft;
      scrollPositionRef.current = currentScroll;

      if (currentScroll >= scrollWidth * 3.5) {
        const overflow = currentScroll - scrollWidth * 3;
        scrollPositionRef.current = scrollWidth * 2 + overflow;
        scrollContainer.scrollLeft = scrollPositionRef.current;
      } else if (currentScroll <= scrollWidth * 1.5) {
        const underflow = scrollWidth * 2 - currentScroll;
        scrollPositionRef.current = scrollWidth * 3 - underflow;
        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
    };

    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isPaused]);

  return (
    <div className="relative w-full">
      <div className="w-full flex justify-center mb-8">
        <p className="text-xs text-slate-300 font-medium uppercase tracking-wide">
          Vertrouwd door innovatieve bedrijven
        </p>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-12 items-center w-max">
          {repeatedLogos.map((logo, index) => (
            <a
              key={index}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 hover-scale"
            >
              <div className="relative h-12 w-auto flex items-center justify-center px-4">
                <img
                  src={logo.src}
                  alt={`${logo.alt} logo`}
                  className={`${logo.size} w-auto object-contain transition-opacity duration-300 group-hover:opacity-100`}
                  style={{
                    filter: 'grayscale(100%) brightness(0) invert(1) contrast(1.2)',
                    opacity: 0.8
                  }}
                  loading="lazy"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
