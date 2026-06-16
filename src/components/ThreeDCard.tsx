import React, { useState, useRef, useEffect } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number; // Maximum rotation in degrees
}

export default function ThreeDCard({
  children,
  className = '',
  maxRotation = 12
}: ThreeDCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device supports hover
    const checkHoverAbility = () => {
      const hasMouse = window.matchMedia('(hover: hover)').matches;
      setIsMobile(!hasMouse);
    };
    checkHoverAbility();
    window.addEventListener('resize', checkHoverAbility);
    return () => window.removeEventListener('resize', checkHoverAbility);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;

    const el = containerRef.current;
    const rect = el.getBoundingClientRect();
    
    // Relative coordinates of mouse inside card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Map relative coordinate (0 to width) to percentage (-0.5 to 0.5)
    const xPercent = (x / rect.width) - 0.5;
    const yPercent = (y / rect.height) - 0.5;
    
    // Calculate rotations
    // Mouse moving right (positive xPercent) rotates card Y axis clockwise/outwards (positive degree)
    // Mouse moving down (positive yPercent) rotates card X axis towards screen (negative degree)
    const rotY = (xPercent * maxRotation * 2).toFixed(2);
    const rotX = (-yPercent * maxRotation * 2).toFixed(2);
    
    setTransform(
      `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    // Reset smoothly
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{
        transform: isHovered ? transform : '',
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      <div 
        style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)', transition: 'transform 0.3s ease-out' }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
