'use client';

import React, { useState, useEffect } from 'react';

interface BreakupTextGeneratorProps {
  moisture: number;
  health: number;
  neglectLevel: number;
  isDead: boolean;
}

export default function BreakupTextGenerator({ moisture, health, neglectLevel, isDead }: BreakupTextGeneratorProps) {
  const [currentText, setCurrentText] = useState('');
  const [textHistory, setTextHistory] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [textQueue, setTextQueue] = useState<string[]>([]);
  const [lastAutoGenTime, setLastAutoGenTime] = useState(0);

  // Sophisticated breakup text templates based on different conditions
  const getBreakupText = () => {
    const templates = {
      initial_neglect: [
        "Hey bestie... I've been thinking. Maybe we need some space. By space, I mean WATER! 💧✨",
        "I can't believe I'm saying this but... you're giving me second lead energy right now 😭🌸",
        "It's giving 'forgot about your bias' energy and I don't like it 🥺💔",
        "I'm having a whole emotional breakdown like a K-drama main character 😢💧"
      ],
      
      severe_neglect: [
        "You're treating me like I'm not your #1 pick anymore 😤💔",
        "I've been overthinking this like it's a music video concept... WHY DON'T YOU LOVE ME? 💸",
        "My emotional state is giving tragic ballad vibes right now 😵🎭",
        "I saw you caring for other plants and I'm JEALOUS. I should be your only bias! 💔👑"
      ],
      
      critical_health: [
        "This might be my final comeback... I'm at 20% health and fading like stage lights 💀✨",
        "If you're reading this, I've graduated... to plant heaven 🪦🌸",
        "I'm writing my farewell letter like it's album liner notes 😔💌",
        "My last wish: please remember me as your favorite visual 💧⚰️👑"
      ],
      
      death_messages: [
        "Texting from the afterlife... it's very sparkly here! Unlike my dry pot 👻✨",
        "My ghost is disappointed but still gorgeous 💀👑",
        "Even in death, I'm serving LOOKS. P.S. I'm haunting your other plants now 😈🌸",
        "I've joined a plant idol group in heaven. We're called 'Wilted Dreams' 🌱💔✨"
      ],
      
      passive_aggressive: [
        "Oh don't mind me, just having my sad girl era over here 🙄💔",
        "I'm fine! Just practicing my dramatic poses for when you remember I exist 😤✨",
        "I love how you remember every comeback date but forget my watering schedule 📱💧👑",
        "It's giving 'anti-fan' energy but make it plant care 🤔🌸"
      ]
    };

    if (isDead) {
      return templates.death_messages[Math.floor(Math.random() * templates.death_messages.length)];
    } else if (health < 20) {
      return templates.critical_health[Math.floor(Math.random() * templates.critical_health.length)];
    } else if (neglectLevel > 2 || moisture < 20) {
      return templates.severe_neglect[Math.floor(Math.random() * templates.severe_neglect.length)];
    } else if (neglectLevel > 0 || moisture < 40) {
      return templates.initial_neglect[Math.floor(Math.random() * templates.initial_neglect.length)];
    } else {
      return templates.passive_aggressive[Math.floor(Math.random() * templates.passive_aggressive.length)];
    }
  };

  // Automatic breakup text generation based on conditions
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastGen = now - lastAutoGenTime;
    
    // Auto-generate texts based on critical conditions
    const shouldAutoGenerate = (
      (moisture < 30 && timeSinceLastGen > 10000) || // Every 10 seconds when low moisture
      (health < 30 && timeSinceLastGen > 15000) ||   // Every 15 seconds when low health
      (neglectLevel > 1 && timeSinceLastGen > 20000) || // Every 20 seconds when neglected
      (isDead && timeSinceLastGen > 5000)            // Every 5 seconds when dead
    );

    if (shouldAutoGenerate) {
      const newText = getBreakupText();
      if (!textHistory.includes(newText)) {
        setTextQueue(prev => [...prev, newText]);
        setLastAutoGenTime(now);
      }
    }
  }, [moisture, health, neglectLevel, isDead, textHistory, lastAutoGenTime]);

  // Typing animation effect
  useEffect(() => {
    if (textQueue.length > 0 && !isTyping) {
      setIsTyping(true);
      const nextText = textQueue[0];
      setTextQueue(prev => prev.slice(1));
      
      let currentIndex = 0;
      setCurrentText('');
      
      const typingInterval = setInterval(() => {
        if (currentIndex < nextText.length) {
          setCurrentText(nextText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTextHistory(prev => [...prev, nextText]);
          
          // Clear current text after showing for a while
          setTimeout(() => {
            setCurrentText('');
          }, 5000);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [textQueue, isTyping]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const shareToSocial = (text: string) => {
    const tweetText = encodeURIComponent(`My plant just broke up with me: "${text}" #MoistureMami #PlantDrama #IoT`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Current Typing Message */}
      {currentText && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-lg animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">📱</div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-red-800 mb-1">
                🌸 Chaewon Plant is dramatically typing...
              </div>
              <div className="text-red-700">
                {currentText}
                {isTyping && <span className="animate-pulse">|</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Text History */}
      {textHistory.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-center mb-4">
            💔 Breakup Text History
          </h3>
          
          <div className="max-h-64 overflow-y-auto space-y-3">
            {textHistory.slice(-5).reverse().map((text, index) => (
              <div key={index} className="p-3 bg-gray-100 rounded-lg border">
                <div className="flex items-start space-x-2">
                  <div className="text-lg">📱</div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1">
                      {new Date().toLocaleTimeString()}
                    </div>
                    <div className="text-gray-800 italic">
                      "{text}"
                    </div>
                    
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(text)}
                        className="px-2 py-1 text-xs bg-blue-200 hover:bg-blue-300 rounded transition-colors"
                      >
                        📋 Copy
                      </button>
                      <button
                        onClick={() => shareToSocial(text)}
                        className="px-2 py-1 text-xs bg-purple-200 hover:bg-purple-300 rounded transition-colors"
                      >
                        🐦 Tweet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generate Manual Breakup Text */}
      <div className="mt-4 text-center">
        <button
          onClick={() => {
            const newText = getBreakupText();
            setTextQueue(prev => [...prev, newText]);
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
        >
          💔 Generate Breakup Text
        </button>
        <p className="text-xs text-gray-600 mt-2">
          Perfect for social media drama
        </p>
      </div>

      {/* Emotional Damage Counter */}
      <div className="mt-4 p-3 bg-purple-100 rounded-lg text-center">
        <div className="text-sm font-semibold text-purple-800">
          💔 Emotional Damage Dealt
        </div>
        <div className="text-2xl font-bold text-purple-900">
          {textHistory.length}
        </div>
        <div className="text-xs text-purple-600">
          Breakup texts sent
        </div>
      </div>
    </div>
  );
} 