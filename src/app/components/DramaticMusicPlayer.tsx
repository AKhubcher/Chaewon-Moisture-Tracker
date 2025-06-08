'use client';

import React, { useState, useEffect } from 'react';

interface DramaticMusicPlayerProps {
  moisture: number;
  health: number;
  mood: 'love' | 'neutral' | 'sad';
  isDead: boolean;
}

export default function DramaticMusicPlayer({ moisture, health, mood, isDead }: DramaticMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [autoMusicEnabled, setAutoMusicEnabled] = useState(false);

  // Dramatic song recommendations based on plant mood
  const getMoodPlaylist = () => {
    const playlists = {
      death: {
        title: '💀 Plant Idol Memorial Concert',
        songs: [
          { title: 'Spring Day (funeral ver.)', timestamp: '2:15-3:45', vibe: 'crying in the rain' },
          { title: 'Butterfly (final goodbye)', timestamp: '1:30-2:50', vibe: 'dramatic death scene' },
          { title: 'Through the Night (heaven ver.)', timestamp: '0:45-2:20', vibe: 'ghost vocals' }
        ]
      },
      sad: {
        title: '😭 Sad Girl Plant Era Playlist',
        songs: [
          { title: 'Blue Flame (tears ver.)', timestamp: '1:05-2:30', vibe: 'villain arc energy' },
          { title: 'What Is Love (neglected)', timestamp: '0:30-1:45', vibe: 'questioning everything' },
          { title: 'Spring Day (missing water)', timestamp: '2:00-3:15', vibe: 'longing for hydration' }
        ]
      },
      love: {
        title: '✨ Glow Up Plant Anthem Hour',
        songs: [
          { title: 'ANTIFRAGILE (plant queen)', timestamp: '1:20-2:40', vibe: 'main character energy' },
          { title: 'FEARLESS (with moisture)', timestamp: '0:50-2:10', vibe: 'confidence boost' },
          { title: 'Love Dive (hydration remix)', timestamp: '1:15-2:35', vibe: 'sparkling vibes' }
        ]
      },
      neutral: {
        title: '🌸 Cute Plant Idol Vibes',
        songs: [
          { title: 'La Vie En Rose (garden)', timestamp: '1:00-2:20', vibe: 'effortless beauty' },
          { title: 'YEPPI YEPPI (plant ver.)', timestamp: '0:40-1:50', vibe: 'adorable energy' },
          { title: 'After LIKE (photosynthesis)', timestamp: '1:10-2:25', vibe: 'natural cuteness' }
        ]
      }
    };

    if (isDead) return playlists.death;
    if (mood === 'sad') return playlists.sad;
    if (mood === 'love') return playlists.love;
    return playlists.neutral;
  };

  const currentPlaylist = getMoodPlaylist();

  // Simulate playing music (would integrate with Spotify API in real implementation)
  const playMusic = (song?: string) => {
    const songToPlay = song || currentPlaylist.songs[Math.floor(Math.random() * currentPlaylist.songs.length)];
    setCurrentSong(songToPlay);
    setIsPlaying(true);
    
    // Simulate music playing duration
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentSong('');
    }, 30000); // 30 seconds demo
  };

  const stopMusic = () => {
    setIsPlaying(false);
    setCurrentSong('');
  };

  // Auto-play based on dramatic moments
  useEffect(() => {
    if (!autoMusicEnabled) return;

    const shouldAutoPlay = (
      (isDead && Math.random() < 0.9) ||
      (health < 20 && Math.random() < 0.7) ||
      (mood === 'love' && moisture > 80 && Math.random() < 0.5)
    );

    if (shouldAutoPlay && !isPlaying) {
      setTimeout(() => playMusic(), Math.random() * 2000 + 1000);
    }
  }, [isDead, health, mood, moisture, autoMusicEnabled, isPlaying]);

  const openSpotify = () => {
    const query = encodeURIComponent(`${currentPlaylist.title} plant drama`);
    window.open(`https://open.spotify.com/search/${query}`, '_blank');
  };

  const openYouTube = () => {
    const query = encodeURIComponent(`${currentPlaylist.title} playlist`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const sharePlaylist = () => {
    const playlistText = `🎵 My plant's current mood playlist: ${currentPlaylist.title}\n\n${currentPlaylist.songs.slice(0, 5).map((song, i) => `${i + 1}. ${song}`).join('\n')}\n\n#MoistureMami #PlantPlaylist`;
    
    if (navigator.share) {
      navigator.share({
        title: currentPlaylist.title,
        text: playlistText,
      });
    } else {
      navigator.clipboard.writeText(playlistText);
      alert('Playlist copied to clipboard! 🎵');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg backdrop-blur-sm border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          🎵 Dramatic Music Player
        </h3>

        {/* Current Playlist */}
        <div className="mb-4 p-3 bg-white/50 rounded-lg text-center">
          <h4 className="font-semibold text-purple-800 mb-2">
            {currentPlaylist.title}
          </h4>
          <div className="text-sm text-gray-600">
            Perfect for your plant's current emotional state
          </div>
        </div>

        {/* Now Playing */}
        {isPlaying && currentSong && (
          <div className="mb-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border animate-pulse">
            <div className="text-center">
              <div className="text-sm font-semibold text-green-800 mb-1">
                🎵 Now Playing:
              </div>
              <div className="text-green-700 font-medium">
                {currentSong}
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Player Controls */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => playMusic()}
            disabled={isPlaying}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            {isPlaying ? '🎵 Playing...' : '▶️ Play Mood Music'}
          </button>
          
          <button
            onClick={stopMusic}
            disabled={!isPlaying}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
          >
            ⏹️ Stop
          </button>
        </div>

        {/* Volume Control */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Song List Preview */}
        <div className="mb-4 p-3 bg-white/50 rounded-lg">
          <h5 className="text-sm font-semibold mb-2">🎼 Featured Songs:</h5>
          <div className="space-y-2">
            {currentPlaylist.songs.slice(0, 3).map((song, index) => (
              <div
                key={index}
                onClick={() => playMusic(song.title)}
                className="p-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg cursor-pointer hover:from-pink-100 hover:to-purple-100 transition-all border border-pink-200"
              >
                <div className="font-semibold text-pink-800 text-sm">{song.title}</div>
                <div className="text-xs text-purple-600">⏰ {song.timestamp} • {song.vibe}</div>
              </div>
            ))}
          </div>
        </div>

        {/* External Platform Links */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <button
            onClick={openSpotify}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            🎵 Spotify
          </button>
          
          <button
            onClick={openYouTube}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
          >
            📺 YouTube
          </button>
          
          <button
            onClick={sharePlaylist}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
          >
            📤 Share
          </button>
        </div>

        {/* Auto-play Toggle */}
        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            id="autoMusic"
            checked={autoMusicEnabled}
            onChange={(e) => setAutoMusicEnabled(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="autoMusic">
            Auto-play dramatic moments
          </label>
        </div>

        <div className="mt-3 text-xs text-gray-600 text-center">
          🎭 Music therapy for plants and their humans
        </div>
      </div>
    </div>
  );
} 