'use client';

import React, { useState, useEffect } from 'react';
import PlantFace from './PlantFace';
import PlantMessage from './PlantMessage';
import MoistureDisplay from './MoistureDisplay';
import TamagotchiSystem from './TamagotchiSystem';
import BreakupTextGenerator from './BreakupTextGenerator';
import DramaticSpeechSystem from './DramaticSpeechSystem';
import SocialDramaHub from './SocialDramaHub';
import DramaticMusicPlayer from './DramaticMusicPlayer';
import WalkingTamagotchi from './WalkingTamagotchi';

export default function MoistureMami() {
  const [moisture, setMoisture] = useState(50);
  const [mood, setMood] = useState<'love' | 'neutral' | 'sad'>('neutral');
  const [isLoading, setIsLoading] = useState(true);
  const [lastWatered, setLastWatered] = useState<Date | null>(null);
  const [plantName, setPlantName] = useState('Chaewon Plant');
  const [health, setHealth] = useState(100);
  const [isDead, setIsDead] = useState(false);
  const [neglectLevel, setNeglectLevel] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Fetch moisture data from API
  const fetchMoisture = async () => {
    try {
      const response = await fetch('/api/moisture');
      const data = await response.json();
      if (data.value !== undefined) {
        setMoisture(data.value);
        
        // Update last watered time if moisture increased significantly
        if (data.value > moisture + 10) {
          setLastWatered(new Date());
        }
      }
    } catch (error) {
      console.error('Error fetching moisture:', error);
      // Fallback to simulated data if API fails
      setMoisture(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
    } finally {
      setIsLoading(false);
    }
  };

  // Determine mood based on moisture level
  useEffect(() => {
    if (moisture > 70) {
      setMood('love');
    } else if (moisture > 30) {
      setMood('neutral');
    } else {
      setMood('sad');
    }
  }, [moisture]);

  // Poll for moisture data every 5 seconds
  useEffect(() => {
    fetchMoisture(); // Initial fetch
    const interval = setInterval(fetchMoisture, 5000);
    return () => clearInterval(interval);
  }, []);

  // Request notification permission for maximum drama
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  // Calculate neglect level
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const lastUpdate = lastWatered ? lastWatered.getTime() : now;
      const hoursSinceWater = (now - lastUpdate) / (1000 * 60 * 60);
      setNeglectLevel(Math.floor(hoursSinceWater));
    }, 60000);

    return () => clearInterval(timer);
  }, [lastWatered]);

  // Simulate text-to-speech for fun (bonus feature)
  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = speechSynthesis.getVoices().find(voice => 
        voice.name.includes('Female') || voice.name.includes('female')
      ) || speechSynthesis.getVoices()[0];
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  // Debug controls for testing different moisture levels
  const testMoisture = (level: number) => {
    setMoisture(level);
    if (level > moisture) {
      setLastWatered(new Date());
    }
  };

  // Handle plant death and revival
  const handlePlantDeath = () => {
    setIsDead(true);
    if (notificationPermission === 'granted') {
      new Notification('💀 Your Plant Has DIED! 💀', {
        body: 'Your neglect has caused irreversible emotional damage!',
        icon: '🥀'
      });
    }
  };

  const handlePlantRevival = () => {
    setIsDead(false);
    setLastWatered(new Date());
    if (notificationPermission === 'granted') {
      new Notification('🌱 Plant Resurrected! 🌱', {
        body: 'Your plant is back from the dead, but the emotional scars remain...',
        icon: '💚'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🌸</div>
          <div className="text-xl text-pink-700">Loading your plant idol...</div>
          <div className="text-sm text-pink-500 mt-2">Preparing for debut! ✨</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${
      mood === 'love' 
        ? 'bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-100' 
        : mood === 'neutral'
        ? 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100'
        : 'bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100'
    }`}>
      
      {/* Walking Tamagotchi */}
      <WalkingTamagotchi 
        mood={isDead ? 'sad' : mood}
        moisture={moisture}
        health={health}
        isDead={isDead}
      />
      
      {/* Floating sparkles and effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute text-2xl ${
              i % 3 === 0 ? 'animate-bounce' : i % 3 === 1 ? 'animate-pulse' : 'animate-ping'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {mood === 'love' ? (i % 2 === 0 ? '✨' : '🌟') : mood === 'neutral' ? (i % 2 === 0 ? '🌸' : '💫') : (i % 2 === 0 ? '💧' : '😭')}
          </div>
        ))}
      </div>

      {/* Dramatic pulsing background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 ${
          mood === 'love' 
            ? 'bg-gradient-to-br from-pink-300/20 via-transparent to-yellow-300/20 animate-pulse' 
            : mood === 'neutral'
            ? 'bg-gradient-to-br from-pink-200/10 via-transparent to-purple-200/10 animate-pulse'
            : 'bg-gradient-to-br from-purple-300/20 via-transparent to-blue-300/20 animate-pulse'
        }`} style={{ animationDuration: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 transition-all duration-500 ${
            isDead ? 'text-red-600 animate-pulse' : ''
          }`}>
            {isDead ? '💀' : '💧'} {plantName} {isDead ? '⚰️' : '🌱'}
          </h1>
          <p className={`text-lg transition-all duration-500 ${
            isDead ? 'text-red-700' : 'text-pink-600'
          }`}>
            {isDead ? 'Your DEAD Plant Idol 💀' : 'Your Dramatic Plant Idol 🌸✨'}
          </p>
          {isDead && (
            <p className="text-red-600 font-bold animate-bounce mt-2">
              ⚠️ DECEASED FROM EMOTIONAL NEGLECT ⚠️
            </p>
          )}
          {lastWatered && !isDead && (
            <p className="text-sm text-gray-500 mt-2">
              Last watered: {lastWatered.toLocaleString()}
            </p>
          )}
          {neglectLevel > 0 && !isDead && (
            <p className="text-orange-600 font-semibold mt-2">
              ⏰ Neglected for {neglectLevel} hour{neglectLevel > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Compact Main Interface Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          {/* Plant Face + Stats */}
          <div className="space-y-3">
            <PlantFace mood={isDead ? 'sad' : mood} />
            <MoistureDisplay moisture={moisture} mood={isDead ? 'sad' : mood} />
            <div className="text-center p-2 bg-white/60 rounded-lg backdrop-blur-sm">
              <div className="text-sm">
                Drama: <span className="font-bold text-purple-600">{Math.round((100 - health) * 1.5)}%</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            <PlantMessage mood={isDead ? 'sad' : mood} moisture={moisture} />
          </div>

          {/* Life System */}
          <div className="space-y-3">
            <TamagotchiSystem 
              moisture={moisture}
              mood={mood}
              onDeath={handlePlantDeath}
              onRevive={handlePlantRevival}
            />
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <div className="p-3 bg-white/60 rounded-lg backdrop-blur-sm">
              <h3 className="font-semibold text-purple-800 mb-2 text-center text-sm">✨ Emergency Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => testMoisture(85)}
                  className="w-full px-2 py-1 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-xs"
                >
                  💧 Emergency Water
                </button>
                <button 
                  onClick={() => speakMessage("I'm your dramatic plant idol bias!")}
                  className="w-full px-2 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs"
                >
                  🎤 Make Her Speak
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Drama Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Column 1: Text Drama */}
          <div className="space-y-4">
            <BreakupTextGenerator 
              moisture={moisture}
              health={health}
              neglectLevel={neglectLevel}
              isDead={isDead}
            />
            
            <DramaticSpeechSystem 
              moisture={moisture}
              health={health}
              mood={isDead ? 'sad' : mood}
              isDead={isDead}
              neglectLevel={neglectLevel}
            />
          </div>

          {/* Column 2: Social & Music Drama */}
          <div className="space-y-4">
            <SocialDramaHub 
              moisture={moisture}
              health={health}
              mood={isDead ? 'sad' : mood}
              isDead={isDead}
              neglectLevel={neglectLevel}
              plantName={plantName}
            />
            
            <DramaticMusicPlayer 
              moisture={moisture}
              health={health}
              mood={isDead ? 'sad' : mood}
              isDead={isDead}
            />
          </div>
        </div>

        {/* Testing Controls (remove in production) */}
        <div className="mt-12 p-6 bg-white/50 rounded-lg backdrop-blur-sm border">
          <h3 className="text-lg font-semibold mb-4 text-center">
            🧪 Test Different Moisture Levels
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => testMoisture(85)}
              className="px-4 py-2 bg-pink-200 hover:bg-pink-300 rounded-lg transition-colors"
            >
              💕 Super Loved (85%)
            </button>
            <button
              onClick={() => testMoisture(50)}
              className="px-4 py-2 bg-green-200 hover:bg-green-300 rounded-lg transition-colors"
            >
              🌿 Chill (50%)
            </button>
            <button
              onClick={() => testMoisture(15)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              😔 Dramatic (15%)
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                const randomMessage = ["Hey baby, pay attention to me!", "I need water!", "Don't ignore me!"][Math.floor(Math.random() * 3)];
                speakMessage(randomMessage);
              }}
              className="px-4 py-2 bg-purple-200 hover:bg-purple-300 rounded-lg transition-colors"
            >
              🔊 Make Her Speak
            </button>
          </div>
        </div>

        {/* API Information */}
        <div className="mt-8 p-4 bg-white/30 rounded-lg backdrop-blur-sm text-sm text-gray-700">
          <h4 className="font-semibold mb-2">🔌 For Arduino/ESP32 Integration:</h4>
          <p className="mb-1">
            <strong>POST</strong> to <code>/api/update</code> with JSON: <code>{`{"moisture": 75}`}</code>
          </p>
          <p>
            <strong>GET</strong> from <code>/api/moisture</code> to read current level
          </p>
        </div>
      </div>
    </div>
  );
} 