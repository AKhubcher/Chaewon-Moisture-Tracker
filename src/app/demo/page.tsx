'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [moisture, setMoisture] = useState(50);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMoistureUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moisture }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ Success! Moisture updated to ${moisture}%`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRealistic = () => {
    // Simulate a plant drying out over time
    const interval = setInterval(() => {
      setMoisture(prev => {
        const newMoisture = Math.max(0, prev - Math.random() * 3);
        fetch('/api/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ moisture: Math.round(newMoisture) }),
        });
        return newMoisture;
      });
    }, 2000);

    setTimeout(() => clearInterval(interval), 30000); // Stop after 30 seconds
    setMessage('🌱 Simulating realistic moisture decline for 30 seconds...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">
            🔧 ESP32/Arduino Simulator
          </h1>
          <p className="text-center text-gray-600 mb-8">
            This page simulates your microcontroller sending moisture data to the API
          </p>

          <div className="space-y-6">
            {/* Manual Control */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Manual Moisture Update</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Moisture Level: {moisture}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Dry (0%)</span>
                    <span>Perfect (50%)</span>
                    <span>Soaked (100%)</span>
                  </div>
                </div>

                <button
                  onClick={sendMoistureUpdate}
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                >
                  {isLoading ? '⏳ Sending...' : '📤 Send to Plant API'}
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Quick Test Scenarios</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setMoisture(85);
                    setTimeout(() => sendMoistureUpdate(), 100);
                  }}
                  className="py-3 px-4 bg-pink-200 hover:bg-pink-300 text-pink-800 font-medium rounded-lg transition-colors"
                >
                  💕 Make Her Happy<br />
                  <span className="text-sm">(85% moisture)</span>
                </button>
                
                <button
                  onClick={() => {
                    setMoisture(15);
                    setTimeout(() => sendMoistureUpdate(), 100);
                  }}
                  className="py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  😔 Make Her Dramatic<br />
                  <span className="text-sm">(15% moisture)</span>
                </button>
                
                <button
                  onClick={simulateRealistic}
                  className="py-3 px-4 bg-green-200 hover:bg-green-300 text-green-800 font-medium rounded-lg transition-colors"
                >
                  🌱 Realistic Simulation<br />
                  <span className="text-sm">(Gradual decline)</span>
                </button>
              </div>
            </div>

            {/* Status Message */}
            {message && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">{message}</p>
              </div>
            )}

            {/* API Documentation */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">🔌 Arduino/ESP32 Code Example</h2>
              
              <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`// ESP32 Example Code
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

void sendMoistureData(int moistureLevel) {
  HTTPClient http;
  http.begin("http://your-domain.com/api/update");
  http.addHeader("Content-Type", "application/json");
  
  String payload = "{\\"moisture\\":" + String(moistureLevel) + "}";
  int httpResponseCode = http.POST(payload);
  
  if (httpResponseCode > 0) {
    Serial.println("Moisture sent successfully!");
  }
  http.end();
}`}
              </pre>
            </div>

            {/* Navigation */}
            <div className="text-center">
              <a
                href="/"
                className="inline-block py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                🌱 Back to Moisture Mami
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 