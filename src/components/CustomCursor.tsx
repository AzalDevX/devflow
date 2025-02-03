'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // Start offscreen
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable = target.closest(
        'a, button, [role="button"], input, select, textarea'
      );
      setIsHovering(!!isHoverable);
    };

    // Hide cursor when leaving the window
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Show cursor when entering the window
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', updateHoverState);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', updateHoverState);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]); // Added isVisible to dependencies

  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        zIndex: 999999, // Añadir este z-index muy alto
      }}
      aria-hidden="true"
    />
  );
}
