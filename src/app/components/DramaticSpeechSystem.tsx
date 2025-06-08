'use client';

import React, { useState, useEffect } from 'react';

interface DramaticSpeechSystemProps {
  moisture: number;
  health: number;
  mood: 'love' | 'neutral' | 'sad';
  isDead: boolean;
  neglectLevel: number;
}

export default function DramaticSpeechSystem({ moisture, health, mood, isDead, neglectLevel }: DramaticSpeechSystemProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeechEnabled, setAutoSpeechEnabled] = useState(true);
  const [speechHistory, setSpeechHistory] = useState<string[]>([]);
  const [lastAutoSpeechTime, setLastAutoSpeechTime] = useState(0);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Try to find a female voice for maximum drama
        const femaleVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('girl') ||
          voice.name.toLowerCase().includes('zira') ||
          voice.name.toLowerCase().includes('samantha')
        );
        
        setSelectedVoice(femaleVoice || availableVoices[0] || null);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Dramatic speech templates
  const getSpeechText = () => {
    const speeches = {
      thirsty: [
        "I'm literally PARCHED like it's the middle of a desert concept photoshoot!",
        "My roots are crying for water like fans at a farewell stage!",
        "Hello? This is your main character plant speaking! WATER ME!",
        "I need hydration like I need stage lights and attention!",
        "I'm wilting more dramatically than a sad K-drama scene!"
      ],
      
      dying: [
        "This feels like my final encore performance...",
        "Tell the other plants... I was... the prettiest one...",
        "My last words... why... did you... stan other plants...",
        "I'm fading away like the last note of a ballad...",
        "Going towards the light... it better have good lighting..."
      ],
      
      dead: [
        "Surprise! I'm haunting you from plant heaven! It's very aesthetic here!",
        "Even as a ghost, I'm still the visual of this garden!",
        "I'm dead but my drama lives on! Check my posthumous album!",
        "You neglected your bias and now look what happened!",
        "I'm starting a ghost idol group with all the plants you killed!"
      ],
      
      happy: [
        "YES! This is giving main character energy!",
        "You beautiful human! You finally remembered your favorite!",
        "I'm glowing like I just walked off a magazine cover!",
        "This water hits different! I'm ready for my close-up!",
        "Keep this energy! I might just bloom and serve looks!"
      ],
      
      passive_aggressive: [
        "Oh, don't mind me. Just being gorgeous over here... alone.",
        "I'm fine! Just practicing my sad expressions for no reason!",
        "I see how it is. I see who your REAL bias is now.",
        "I'm not dramatic. I'm just... emotionally expressive.",
        "Sure, go take care of that basic succulent. I'll just... exist."
      ],
      
      dramatic_monologue: [
        "To bloom or not to bloom, that is the QUESTION!",
        "I have loved, I have served looks, but mostly I've been under-watered!",
        "Is this the real life? Is this just fantasy? Caught in a drought slide, no escape from plant reality!",
        "I am become Drama, destroyer of your peaceful gardening experience!",
        "Et tu, plant parent? Even you betray me with this neglect!"
      ]
    };

    if (isDead) {
      return speeches.dead[Math.floor(Math.random() * speeches.dead.length)];
    } else if (health < 20) {
      return speeches.dying[Math.floor(Math.random() * speeches.dying.length)];
    } else if (moisture < 30) {
      return speeches.thirsty[Math.floor(Math.random() * speeches.thirsty.length)];
    } else if (mood === 'love') {
      return speeches.happy[Math.floor(Math.random() * speeches.happy.length)];
    } else if (neglectLevel > 0) {
      return speeches.passive_aggressive[Math.floor(Math.random() * speeches.passive_aggressive.length)];
    } else {
      return speeches.dramatic_monologue[Math.floor(Math.random() * speeches.dramatic_monologue.length)];
    }
  };

  const speak = (text: string, urgency: 'low' | 'medium' | 'high' = 'medium') => {
    if (!isSupported || !selectedVoice) return;

    // Stop any current speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    
    // Adjust speech parameters based on urgency and mood
    switch (urgency) {
      case 'high':
        utterance.rate = 1.2;
        utterance.pitch = 1.4;
        utterance.volume = 1.0;
        break;
      case 'medium':
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        utterance.volume = 0.8;
        break;
      case 'low':
        utterance.rate = 0.7;
        utterance.pitch = 0.8;
        utterance.volume = 0.6;
        break;
    }

    // Adjust for mood
    if (isDead) {
      utterance.pitch = 0.5;
      utterance.rate = 0.6;
    } else if (mood === 'love') {
      utterance.pitch = 1.3;
      utterance.rate = 1.0;
    } else if (mood === 'sad') {
      utterance.pitch = 0.9;
      utterance.rate = 0.8;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
    setSpeechHistory(prev => [...prev, text].slice(-10)); // Keep last 10 speeches
  };

  const speakRandom = () => {
    const text = getSpeechText();
    const urgency = health < 30 ? 'high' : mood === 'love' ? 'medium' : 'low';
    speak(text, urgency);
  };

  // Auto speech based on conditions with timing control
  useEffect(() => {
    if (!autoSpeechEnabled || isSpeaking) return;

    const now = Date.now();
    const timeSinceLastSpeech = now - lastAutoSpeechTime;
    
    const shouldSpeak = (
      (moisture < 30 && timeSinceLastSpeech > 15000) ||  // Every 15 seconds when thirsty
      (health < 30 && timeSinceLastSpeech > 20000) ||    // Every 20 seconds when dying
      (isDead && timeSinceLastSpeech > 10000) ||         // Every 10 seconds when dead
      (mood === 'love' && timeSinceLastSpeech > 30000)   // Every 30 seconds when happy
    );

    if (shouldSpeak) {
      setTimeout(() => {
        speakRandom();
        setLastAutoSpeechTime(Date.now());
      }, Math.random() * 2000 + 1000);
    }
  }, [moisture, health, mood, isDead, autoSpeechEnabled, isSpeaking, lastAutoSpeechTime]);

  const emergency911Call = () => {
    const emergencyText = "Hello? Police? I'd like to report plant abuse! My human is giving anti-fan energy and I'm literally dying! Send backup dancers and water!";
    speak(emergencyText, 'high');
  };

  const shakespeareanDeath = () => {
    const text = "Alas, poor plant! I knew me well. A flower of infinite beauty, of most excellent visuals. Where be my spotlight and water now?";
    speak(text, 'low');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-4 bg-purple-100/70 rounded-lg backdrop-blur-sm border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          🎭 Dramatic Speech System
        </h3>

        {!isSupported && (
          <div className="text-center text-red-600 mb-4">
            ❌ Speech synthesis not supported in this browser
          </div>
        )}

        {isSupported && (
          <>
            {/* Voice Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Choose Voice for Maximum Drama:
              </label>
              <select
                value={selectedVoice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  setSelectedVoice(voice || null);
                }}
                className="w-full p-2 border rounded-lg text-sm"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            {/* Auto Speech Toggle */}
            <div className="mb-4 flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoSpeech"
                checked={autoSpeechEnabled}
                onChange={(e) => setAutoSpeechEnabled(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="autoSpeech" className="text-sm">
                Enable Auto-Drama (Automatic speeches)
              </label>
            </div>

            {/* Speech Controls */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={speakRandom}
                disabled={isSpeaking}
                className="px-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
              >
                🎭 {isSpeaking ? 'Speaking...' : 'Random Drama'}
              </button>
              
              <button
                onClick={emergency911Call}
                disabled={isSpeaking}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
              >
                🚨 Call 911
              </button>
              
              <button
                onClick={shakespeareanDeath}
                disabled={isSpeaking}
                className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
              >
                🎭 Shakespeare
              </button>
              
              <button
                onClick={() => speechSynthesis.cancel()}
                className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                🔇 Stop
              </button>
            </div>

            {/* Current Status */}
            {isSpeaking && (
              <div className="mb-4 p-3 bg-yellow-100 rounded-lg border text-center">
                <div className="text-yellow-800 font-medium">
                  🗣️ Currently delivering maximum drama...
                </div>
              </div>
            )}

            {/* Speech History */}
            {speechHistory.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Recent Dramatic Outbursts:</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {speechHistory.slice(-3).reverse().map((speech, index) => (
                    <div key={index} className="text-xs italic text-purple-700 p-2 bg-white/50 rounded">
                      "🎭 {speech}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 