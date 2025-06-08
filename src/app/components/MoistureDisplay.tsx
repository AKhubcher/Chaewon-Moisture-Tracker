import React from 'react';

interface MoistureDisplayProps {
  moisture: number;
  mood: 'love' | 'neutral' | 'sad';
}

export default function MoistureDisplay({ moisture, mood }: MoistureDisplayProps) {
  const getBarColor = () => {
    if (moisture > 70) return 'bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-400 shadow-lg';
    if (moisture > 30) return 'bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400 shadow-md';
    return 'bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 shadow-md';
  };

  const getBackgroundColor = () => {
    if (moisture > 70) return 'bg-gradient-to-r from-pink-50 to-yellow-50';
    if (moisture > 30) return 'bg-gradient-to-r from-pink-50 to-purple-50';
    return 'bg-gradient-to-r from-purple-50 to-blue-50';
  };

  const getMoistureEmoji = () => {
    if (moisture > 70) return '✨💧✨';
    if (moisture > 30) return '🌸💧';
    return '💔💧';
  };

  const getMoodText = () => {
    switch (mood) {
      case 'love':
        return 'Living my best life! ✨';
      case 'neutral':
        return 'Cute and hydrated 🌸';
      case 'sad':
        return 'Dramatic and thirsty 💔';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">Moisture Level</span>
        <span className="text-2xl">{getMoistureEmoji()}</span>
      </div>
      
      <div className={`w-full h-8 rounded-full ${getBackgroundColor()} overflow-hidden border-2 border-gray-200`}>
        <div 
          className={`h-full transition-all duration-1000 ease-out ${getBarColor()}`}
          style={{ width: `${Math.max(0, Math.min(100, moisture))}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <span className="text-2xl font-bold">{moisture}%</span>
        <span className="text-lg font-medium">{getMoodText()}</span>
      </div>
      
      <div className="mt-4 text-sm text-pink-700">
        <div className="flex justify-between font-semibold">
          <span>😭 Sad Girl Era</span>
          <span>🌸 Cute Era</span>
          <span>✨ Glow Up Era</span>
        </div>
        <div className="flex justify-between text-xs mt-1 opacity-75">
          <span>0-30%</span>
          <span>30-70%</span>
          <span>70-100%</span>
        </div>
      </div>
    </div>
  );
} 