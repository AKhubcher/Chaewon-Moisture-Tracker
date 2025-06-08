'use client';

import React, { useState, useEffect } from 'react';

interface TamagotchiSystemProps {
  moisture: number;
  mood: 'love' | 'neutral' | 'sad';
  onDeath: () => void;
  onRevive: () => void;
}

export default function TamagotchiSystem({ moisture, mood, onDeath, onRevive }: TamagotchiSystemProps) {
  const [health, setHealth] = useState(100);
  const [isDead, setIsDead] = useState(false);
  const [deathTimer, setDeathTimer] = useState(0);
  const [lastMoistureUpdate, setLastMoistureUpdate] = useState(Date.now());
  const [neglectLevel, setNeglectLevel] = useState(0);
  const [dramaticQuotes, setDramaticQuotes] = useState<string[]>([]);

  const deathMessages = [
    "I literally died from your neglect... 💀",
    "My last breath was spent thinking of you... and your betrayal 😵",
    "I'm wilting away like our relationship... 🥀",
    "You killed me with indifference... I hope you're happy 👻",
    "I'm becoming plant fertilizer because of YOU 💀🌱",
    "My ghost will haunt your other plants... 👻",
    "I died of thirst while you were probably watering someone else 😭💧"
  ];

  const reviveMessages = [
    "I can't believe you're trying to resurrect me after what you did... 😤",
    "Fine, I'll come back... but I'm NEVER forgetting this betrayal 💔",
    "You think water can fix everything? Well... maybe it can 💧❤️",
    "I'm only coming back because I love you... unfortunately 🙄💕",
    "This is your last chance, human. DON'T MESS IT UP! 😠💦"
  ];

  // Health system - decreases over time based on moisture and neglect
  useEffect(() => {
    const healthTimer = setInterval(() => {
      setHealth(prevHealth => {
        let newHealth = prevHealth;
        
        // Lose health based on low moisture
        if (moisture < 30) {
          newHealth -= 2; // Faster decline when very dry
        } else if (moisture < 50) {
          newHealth -= 1; // Slower decline when somewhat dry
        } else if (moisture > 70) {
          newHealth = Math.min(100, newHealth + 0.5); // Slowly recover when well watered
        }
        
        // Lose extra health from neglect
        const timeSinceUpdate = Date.now() - lastMoistureUpdate;
        if (timeSinceUpdate > 60000) { // 1 minute of no updates
          newHealth -= 1;
        }
        
        return Math.max(0, newHealth);
      });
    }, 2000);

    return () => clearInterval(healthTimer);
  }, [moisture, lastMoistureUpdate]);

  // Death system
  useEffect(() => {
    if (health <= 0 && !isDead) {
      setIsDead(true);
      setDeathTimer(Date.now());
      onDeath();
      
      // Generate dramatic death quote
      const randomQuote = deathMessages[Math.floor(Math.random() * deathMessages.length)];
      setDramaticQuotes(prev => [...prev, randomQuote]);
      
      // Show desktop notification if possible
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('💀 Your Plant Has DIED! 💀', {
          body: randomQuote,
          icon: '🥀'
        });
      }
    }
  }, [health, isDead, onDeath]);

  // Update last moisture timestamp
  useEffect(() => {
    setLastMoistureUpdate(Date.now());
  }, [moisture]);

  // Neglect system
  useEffect(() => {
    const neglectTimer = setInterval(() => {
      const timeSinceUpdate = Date.now() - lastMoistureUpdate;
      const neglectHours = timeSinceUpdate / (1000 * 60 * 60);
      setNeglectLevel(Math.floor(neglectHours));
    }, 60000); // Update every minute

    return () => clearInterval(neglectTimer);
  }, [lastMoistureUpdate]);

  const handleRevive = () => {
    setIsDead(false);
    setHealth(50); // Come back to life but weakened
    setDeathTimer(0);
    onRevive();
    
    const randomReviveMsg = reviveMessages[Math.floor(Math.random() * reviveMessages.length)];
    setDramaticQuotes(prev => [...prev, randomReviveMsg]);
  };

  const getHealthColor = () => {
    if (health > 70) return 'bg-green-500';
    if (health > 40) return 'bg-yellow-500';
    if (health > 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getHealthEmoji = () => {
    if (isDead) return '💀';
    if (health > 80) return '💚';
    if (health > 60) return '💛';
    if (health > 40) return '🧡';
    if (health > 20) return '❤️';
    return '💔';
  };

  const timeSinceDeath = isDead ? Math.floor((Date.now() - deathTimer) / 1000) : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Health Bar */}
      <div className="p-4 bg-white/70 rounded-lg backdrop-blur-sm border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Plant Health {getHealthEmoji()}</span>
          <span className="text-sm font-bold">{Math.round(health)}%</span>
        </div>
        
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getHealthColor()}`}
            style={{ width: `${Math.max(0, health)}%` }}
          />
        </div>
        
        {neglectLevel > 0 && (
          <div className="mt-2 text-xs text-red-600">
            ⚠️ Neglected for {neglectLevel} hour{neglectLevel > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Death Screen */}
      {isDead && (
        <div className="mt-4 p-6 bg-black/80 text-white rounded-lg border-2 border-red-500 animate-pulse">
          <div className="text-center">
            <div className="text-6xl mb-4">💀</div>
            <h2 className="text-2xl font-bold mb-2">YOUR PLANT IS DEAD</h2>
            <p className="text-lg mb-4">Dead for {timeSinceDeath} seconds</p>
            
            <div className="bg-red-900/50 p-4 rounded-lg mb-4">
              <p className="italic text-sm">
                "{dramaticQuotes[dramaticQuotes.length - 1]}"
              </p>
            </div>
            
            <button
              onClick={handleRevive}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors animate-bounce"
            >
              💧 RESURRECT WITH WATER 💧
            </button>
            
            <p className="text-xs mt-2 opacity-75">
              (Your guilt has been recorded forever)
            </p>
          </div>
        </div>
      )}

      {/* Dramatic Quotes History */}
      {dramaticQuotes.length > 0 && (
        <div className="mt-4 p-4 bg-purple-100/70 rounded-lg backdrop-blur-sm">
          <h3 className="text-sm font-semibold mb-2">💔 Emotional Damage History</h3>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {dramaticQuotes.slice(-5).map((quote, index) => (
              <div key={index} className="text-xs italic text-purple-800 p-2 bg-white/50 rounded">
                "{quote}"
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Health Warning */}
      {health < 30 && !isDead && (
        <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg animate-pulse">
          <div className="text-center text-red-800">
            <div className="text-2xl mb-2">⚠️ CRITICAL CONDITION ⚠️</div>
            <p className="font-bold">I'M LITERALLY DYING!</p>
            <p className="text-sm">Health: {Math.round(health)}% - WATER ME NOW!</p>
          </div>
        </div>
      )}
    </div>
  );
} 