import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EmoticonParticle {
  id: string;
  text: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  direction: number; // -1 for left drifting, 1 for right drifting
  speed: number;
  opacity: number;
}

export function triggerEmoticons(text: string, count: number = 2) {
  const event = new CustomEvent('earthcure-emoticon', { 
    detail: { text, count } 
  });
  window.dispatchEvent(event);
}

export default function EmoticonEffects() {
  const [particles, setParticles] = useState<EmoticonParticle[]>([]);

  const spawnParticles = (texts: string[], forceCount?: number) => {
    // Keep count very low for a subtle effect
    const count = forceCount !== undefined ? Math.min(forceCount, 2) : Math.floor(Math.random() * 2) + 1;
    const newParticles: EmoticonParticle[] = [];

    for (let i = 0; i < count; i++) {
      const text = texts[Math.floor(Math.random() * texts.length)];
      // Spawn near bottom right to avoid blocking the center of the main content
      const startX = Math.random() * 25 + 70; // 70% to 95% from left
      const id = `${Date.now()}-${Math.random()}`;

      newParticles.push({
        id,
        text,
        x: startX,
        y: 90, // % from top
        size: Math.random() * 5 + 11, // tiny & elegant (11px to 16px)
        rotation: Math.random() * 20 - 10, // subtle rotation
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: Math.random() * 0.3 + 0.15, // much slower drift
        opacity: 0.85
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  };

  useEffect(() => {
    // Custom window listener
    const handleGlobalTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ text: string; count: number }>;
      if (customEvent.detail && customEvent.detail.text) {
        // Force low count for global triggers
        spawnParticles([customEvent.detail.text], Math.min(customEvent.detail.count || 1, 2));
      }
    };

    window.addEventListener('earthcure-emoticon', handleGlobalTrigger);
    return () => window.removeEventListener('earthcure-emoticon', handleGlobalTrigger);
  }, []);

  // Update loop for custom particle movement physics to avoid layout thrashing
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y - p.speed * 4, // drift upwards gently
            x: p.x + p.direction * 0.1 * Math.sin(p.y / 8), // subtle wave
            rotation: p.rotation + p.direction * p.speed * 0.5,
            opacity: p.opacity - 0.035 // fade out very quickly (expires in ~1s)
          }))
          .filter((p) => p.y > 0 && p.opacity > 0)
      );
    }, 45);

    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0.6, opacity: p.opacity }}
            animate={{ scale: 1, opacity: p.opacity }}
            exit={{ opacity: 0 }}
            className="absolute font-mono text-center select-none font-semibold text-shadow-sm pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              color: '#E9E4D9',
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 1px rgba(212,175,55,0.4)',
            }}
          >
            {p.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
