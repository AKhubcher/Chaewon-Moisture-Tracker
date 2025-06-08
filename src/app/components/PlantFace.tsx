import React from 'react';

interface PlantFaceProps {
  mood: 'love' | 'neutral' | 'sad';
}

export default function PlantFace({ mood }: PlantFaceProps) {
  const getFaceContent = () => {
    switch (mood) {
      case 'love':
        return (
          <div className="face love flex items-center justify-center text-8xl animate-pulse">
            <span className="mr-2">🥰</span>
            <span className="text-pink-500">🌸</span>
            <div className="absolute animate-bounce text-pink-500 text-2xl">
              ✨
            </div>
            <div className="absolute animate-ping text-yellow-400 text-xl" style={{ animationDelay: '0.3s' }}>
              🌟
            </div>
          </div>
        );
      case 'neutral':
        return (
          <div className="face neutral flex items-center justify-center text-8xl">
            <span className="mr-2">😊</span>
            <span className="text-pink-400">🌺</span>
            <div className="absolute text-pink-300 text-lg animate-pulse">
              ✨
            </div>
          </div>
        );
      case 'sad':
        return (
          <div className="face sad flex items-center justify-center text-8xl animate-pulse">
            <span className="mr-2">🥺</span>
            <span className="text-purple-400">🥀</span>
            <div className="absolute animate-bounce text-blue-400 text-2xl">
              💧
            </div>
            <div className="absolute text-purple-300 text-sm" style={{ animationDelay: '0.5s' }}>
              😭
            </div>
          </div>
        );
      default:
        return (
          <div className="face neutral flex items-center justify-center text-8xl">
            <span className="mr-2">😊</span>
            <span className="text-pink-400">🌺</span>
          </div>
        );
    }
  };

  const getMoodStyles = () => {
    switch (mood) {
      case 'love':
        return 'bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-100 border-pink-400 shadow-pink-300';
      case 'neutral':
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border-pink-300 shadow-pink-200';
      case 'sad':
        return 'bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 border-purple-300 shadow-purple-200';
      default:
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border-pink-300 shadow-pink-200';
    }
  };

  return (
    <div className={`relative w-64 h-64 rounded-full border-4 shadow-lg ${getMoodStyles()} flex items-center justify-center transition-all duration-500`}>
      {getFaceContent()}
      {mood === 'love' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute animate-ping text-2xl">💖</div>
          <div className="absolute animate-pulse text-xl" style={{ animationDelay: '0.5s' }}>✨</div>
        </div>
      )}
    </div>
  );
} 