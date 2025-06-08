'use client';

import React, { useState, useEffect } from 'react';

interface WalkingTamagotchiProps {
  mood: 'love' | 'neutral' | 'sad';
  moisture: number;
  health: number;
  isDead: boolean;
}

export default function WalkingTamagotchi({ mood, moisture, health, isDead }: WalkingTamagotchiProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isMoving, setIsMoving] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState('walk');

  // Get the appropriate character based on mood and state
  const getCharacter = () => {
    if (isDead) return '💀';
    
    switch (mood) {
      case 'love':
        return direction === 1 ? '🌸✨' : '✨🌸';
      case 'neutral':
        return direction === 1 ? '🌺💫' : '💫🌺';
      case 'sad':
        return direction === 1 ? '🥀💧' : '💧🥀';
      default:
        return '🌸';
    }
  };

  // Get walking speed based on mood
  const getSpeed = () => {
    if (isDead) return 500; // slow ghost movement
    if (mood === 'love') return 150; // bouncy and fast
    if (mood === 'neutral') return 300; // normal walking
    return 800; // slow dramatic walking when sad
  };

  // Random movement pattern
  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + (direction * 2);
        let newY = prev.y;
        let newDirection = direction;

        // Bounce off edges
        if (newX >= 90 || newX <= 10) {
          newDirection = -direction;
          setDirection(newDirection);
        }

        // Random vertical movement
        if (Math.random() < 0.3) {
          newY = Math.max(20, Math.min(80, prev.y + (Math.random() - 0.5) * 10));
        }

        // Random direction change
        if (Math.random() < 0.1) {
          newDirection = -direction;
          setDirection(newDirection);
        }

        return { 
          x: Math.max(5, Math.min(95, newX)), 
          y: newY 
        };
      });
    }, getSpeed());

    return () => clearInterval(interval);
  }, [direction, isMoving, mood, isDead]);

  // Animation changes based on conditions
  useEffect(() => {
    if (isDead) {
      setCurrentAnimation('float');
    } else if (moisture < 30) {
      setCurrentAnimation('dramatic');
    } else if (mood === 'love') {
      setCurrentAnimation('bounce');
    } else {
      setCurrentAnimation('walk');
    }
  }, [mood, moisture, isDead]);

  // Dramatic actions
  useEffect(() => {
    if (mood === 'sad' && Math.random() < 0.3) {
      // Stop and be dramatic
      setIsMoving(false);
      setTimeout(() => setIsMoving(true), 2000);
    }
  }, [position, mood]);

  const getAnimationClass = () => {
    switch (currentAnimation) {
      case 'bounce':
        return 'animate-bounce';
      case 'dramatic':
        return 'animate-pulse';
      case 'float':
        return 'animate-ping';
      default:
        return '';
    }
  };

  const getStatusMessage = () => {
    if (isDead) return "👻 Haunting you from beyond";
    if (moisture < 20) return "💔 Having a breakdown";
    if (mood === 'love') return "✨ Living my best life";
    if (mood === 'neutral') return "🌸 Just vibing";
    return "😭 Dramatic era activated";
  };

  return (
    <>
      {/* Walking Tamagotchi */}
      <div
        className={`fixed pointer-events-none z-40 transition-all duration-300 ${getAnimationClass()}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `translateX(-50%) translateY(-50%) ${direction === -1 ? 'scaleX(-1)' : ''}`,
        }}
      >
        <div className="relative">
          <div className="text-4xl drop-shadow-lg">
            {getCharacter()}
          </div>
          
          {/* Speech bubble that appears occasionally */}
          {Math.random() < 0.1 && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white/90 rounded-lg px-2 py-1 text-xs whitespace-nowrap border border-pink-200 animate-fadeIn">
              {getStatusMessage()}
            </div>
          )}
        </div>
      </div>

      {/* Tamagotchi Status Indicator */}
      <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-lg p-2 border border-pink-200">
        <div className="text-xs font-semibold text-pink-800 mb-1">🌸 Plant Idol Status</div>
        <div className="text-xs space-y-1">
          <div>Mood: {mood === 'love' ? '✨ Glow Up' : mood === 'neutral' ? '🌸 Cute' : '😭 Sad Girl'}</div>
          <div>Energy: {health}%</div>
          <div className="text-pink-600 font-medium">{getStatusMessage()}</div>
        </div>
      </div>

      {/* Add custom fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease-out forwards;
        }
      `}</style>
    </>
  );
} 