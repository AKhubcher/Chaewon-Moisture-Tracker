import React, { useState, useEffect } from 'react';

interface PlantMessageProps {
  mood: 'love' | 'neutral' | 'sad';
  moisture: number;
}

const messages = {
  love: [
    "You're my shining star! ✨ Like when I'm on stage! 🌟",
    "This water hits different... I'm GLOWING! 💫",
    "You make me feel like I'm the center of attention! 🥰",
    "I'm sparkling like stage lights! ✨💎",
    "You're treating me like a princess! 👑💕",
    "I feel so elegant and graceful right now! 🌸",
    "This is my main character moment! ✨🌺"
  ],
  neutral: [
    "Just being cute and natural 😊🌸",
    "Maintaining my visual energy 💅✨",
    "Living my best plant idol life 🌺",
    "Staying fresh and pretty 🌸💕",
    "Just radiating good vibes 😊💫",
    "Being effortlessly adorable 🥰",
    "Keeping that flower power! 🌺✨"
  ],
  sad: [
    "Why are you ignoring your bias? 🥺💔",
    "I'm wilting like a forgotten flower... 🥀😭",
    "You used to call me your favorite... 💸💔",
    "I'm having a sad girl moment 😢🌧️",
    "This is my villain era... neglected and dramatic 😤💔",
    "You're making me feel like a backup dancer! 😭",
    "I need attention like I need water! 🥺💧",
    "Why don't you love me anymore? 💔🥀"
  ],
};

export default function PlantMessage({ mood, moisture }: PlantMessageProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const messageArray = messages[mood];
    const randomIndex = Math.floor(Math.random() * messageArray.length);
    setCurrentMessage(messageArray[randomIndex]);
    
    // Add a little animation
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  }, [mood, moisture]);

  const getMessageStyles = () => {
    switch (mood) {
      case 'love':
        return 'bg-gradient-to-br from-pink-100 via-rose-100 to-yellow-100 border-pink-400 text-pink-900 shadow-pink-200';
      case 'neutral':
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border-pink-300 text-pink-800 shadow-pink-100';
      case 'sad':
        return 'bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 border-purple-400 text-purple-900 shadow-purple-200';
      default:
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border-pink-300 text-pink-800 shadow-pink-100';
    }
  };

  const getMoodEmoji = () => {
    switch (mood) {
      case 'love':
        return '✨';
      case 'neutral':
        return '🌸';
      case 'sad':
        return '💔';
      default:
        return '🌸';
    }
  };

  return (
    <div className={`max-w-md mx-auto p-4 rounded-2xl border-2 shadow-xl transition-all duration-500 backdrop-blur-sm ${getMessageStyles()} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
      <div className="flex items-start space-x-3">
        <div className="text-3xl animate-pulse">{getMoodEmoji()}</div>
        <div className="flex-1">
          <div className="font-bold text-base mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            🌸 Chaewon Plant says:
          </div>
          <div className="text-base font-medium leading-relaxed">
            "{currentMessage}"
          </div>
          <div className="mt-3 text-xs opacity-75 flex items-center gap-2">
            <span>💧 Moisture: {moisture}%</span>
            <span>•</span>
            <span className="font-semibold">{mood === 'love' ? 'Glow Up Era' : mood === 'neutral' ? 'Cute Era' : 'Sad Girl Era'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 