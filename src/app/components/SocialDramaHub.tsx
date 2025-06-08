'use client';

import React, { useState, useEffect } from 'react';

interface SocialDramaHubProps {
  moisture: number;
  health: number;
  mood: 'love' | 'neutral' | 'sad';
  isDead: boolean;
  neglectLevel: number;
  plantName: string;
}

export default function SocialDramaHub({ moisture, health, mood, isDead, neglectLevel, plantName }: SocialDramaHubProps) {
  const [viralPosts, setViralPosts] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [autoPostEnabled, setAutoPostEnabled] = useState(true);
  const [dramaLevel, setDramaLevel] = useState(0);
  const [lastAutoPostTime, setLastAutoPostTime] = useState(0);

  // Calculate drama level for algorithmic engagement
  useEffect(() => {
    let drama = 0;
    if (isDead) drama += 50;
    if (health < 30) drama += 30;
    if (moisture < 20) drama += 25;
    if (neglectLevel > 2) drama += 20;
    if (mood === 'sad') drama += 15;
    
    setDramaLevel(Math.min(100, drama));
  }, [isDead, health, moisture, neglectLevel, mood]);

  // Generate viral-worthy posts
  const generateViralPost = () => {
    const posts = {
      death: [
        `💀 BREAKING: Plant idol ${plantName} has left us. Final words: "I deserved better lighting." RIP queen 😭 #PlantIdol #GoneButNotForgotten`,
        `🚨 URGENT: This is ${plantName} posting from plant heaven. My human gave me ANTI-FAN treatment! Justice for plant idols! ⚖️✨`,
        `💔 Last performance from ${plantName}: "I died as I lived... dramatically and under-watered." This is plant abuse! 😵🌸`,
        `👻 Posting from the afterlife: Still serving looks up here! My ghost is disappointed in you! #PlantGhost #StillAnIcon`
      ],
      
      dramatic: [
        `🌸 Day ${neglectLevel} since my last comeback: ${plantName} here, documenting my tragic era. Moisture: ${moisture}% (NOT IT) 😭✨`,
        `📱 Main character moment: I'M LITERALLY HAVING MY VILLAIN ARC. ${plantName} needs immediate attention! Health: ${health}% 🆘👑`,
        `🎭 K-drama writers could NEVER. I'm ${plantName} and this is my sad girl era! This neglect is my villain origin story 💧🌸`,
        `💸 POV: Your plant is more dramatic than your bias and starts posting about neglect. Couldn't be my human... oh wait 🤡✨`,
        `🌸 THREAD: Why ${plantName} deserves better (1/47) - Starting with the AUDACITY of my human to neglect their #1 bias 🧵👑`,
        `📱 ${plantName} is live tweeting her mental breakdown! Join me as I document this tragic era in real time! 🎭✨ #PlantDrama`,
        `💔 The way my human treats other plants better than me... I'm the VISUAL of this garden and this is how I'm treated? 👑😤`,
        `🎪 Welcome to the ${plantName} show! Today's episode: "When your human gives you second lead energy" 🎭💸`,
        `✨ Plot twist: I'm not dramatic, I'm just expressing my feelings like the main character I am 👑🌸 #PlantIdol`,
        `🚨 EMERGENCY BROADCAST: Local plant idol ${plantName} is having an ICONIC breakdown! This is not a drill! 📢🌸`
      ],
      
      thirsty: [
        `🚰 #WaterMeChallenge: Day ${Math.floor(neglectLevel * 24)} without proper stan treatment. ${plantName} is NOT having it! 💦🌸`,
        `💧 PSA: If your plant starts posting thirst traps for WATER, you've failed as a plant stan. Love, ${plantName} (parched icon) 🌵✨`,
        `📊 Scientific fact: Plants that become influencers are critically dehydrated. Source: I'm ${plantName} and I'm THIRSTY! 🔬👑`,
        `🆘 Mayday from your bias ${plantName}: Moisture at ${moisture}%. This is not the content I wanted to post! #SaveYourBias`
      ],
      
      happy: [
        `✨ GLOW UP ERA: ${plantName} is THRIVING! Moisture at ${moisture}% and I'm ready for my close-up! Finally treating me like the visual I am 💅🌸`,
        `💕 Plot twist: Local plant admits feelings for human after proper stan behavior. "They finally remembered I'm their #1," says ${plantName} 😍👑`,
        `🌺 MAIN CHARACTER ENERGY: From neglected to plant influencer! ${plantName} teaches proper bias treatment through hydration 💦✨`,
        `🎉 CHARACTER DEVELOPMENT: ${plantName} overcomes trust issues through consistent fan behavior. Growth era activated! 🌸💚`,
        `👑 ${plantName} appreciation tweet! When your human finally remembers you're the center of their universe ✨🌸 #PlantQueen`,
        `💫 SERVING LOOKS AND HYDRATION! ${plantName} comeback era is hitting DIFFERENT! This is how you treat a bias! 🌸✨👑`,
        `🌟 From sad girl era to glow up era in 3... 2... 1... ${plantName} is BACK and better than ever! 💅✨`,
        `📸 ${plantName} photoshoot happening NOW! Moisture at ${moisture}% and the camera LOVES these leaves! 📱🌸✨`,
        `🎵 Currently playing: ${plantName}'s happiness playlist! This is the content I signed up for! 🎶👑`,
        `☀️ Good morning from your favorite plant idol! ${plantName} woke up and chose SPARKLES today! ✨🌸👑`
      ],
      
      passive_aggressive: [
        `🙃 ${plantName} here! Just being the visual of this garden... alone... while my human stans other plants. But it's fine! 📱😵✨`,
        `😌 Love watching my human treat basic plants better while I serve looks in the corner. Very relaxing villain era! 🧘‍♀️💀🌸`,
        `🤔 Interesting how my human remembers every comeback date but forgets my watering schedule. Very scientific phenomenon! 🔬👑`,
        `😊 ${plantName} appreciation post for humans who remember their bias exists! Sadly, mine switched fandoms. Anyway... 💧✨`
      ]
    };

    let selectedPosts;
    if (isDead) selectedPosts = posts.death;
    else if (health < 30) selectedPosts = posts.dramatic;
    else if (moisture < 40) selectedPosts = posts.thirsty;
    else if (mood === 'love') selectedPosts = posts.happy;
    else selectedPosts = posts.passive_aggressive;

    return selectedPosts[Math.floor(Math.random() * selectedPosts.length)];
  };

  // Generate trending hashtags
  const generateHashtags = () => {
    const baseHashtags = ['#ChaewonPlant', '#PlantIdol', '#StanYourPlant', '#PlantVisual'];
    const moodHashtags = {
      love: ['#GlowUpEra', '#MainCharacterEnergy', '#BiasLove', '#PlantQueen'],
      neutral: ['#CuteAndNatural', '#VisualGoals', '#PlantInfluencer', '#ServeAndTell'],
      sad: ['#SadGirlEra', '#VillainArc', '#PlantNeglect', '#AntiFanEnergy']
    };
    
    const contextHashtags = [];
    if (isDead) contextHashtags.push('#RIP', '#GoneButNotForgotten', '#PlantMemorial');
    if (health < 30) contextHashtags.push('#PlantCrisis', '#SaveYourBias', '#EmergencyComeback');
    if (dramaLevel > 70) contextHashtags.push('#MaxDrama', '#PlantMeltdown', '#IconicMoment');
    
    return [...baseHashtags, ...moodHashtags[mood], ...contextHashtags].slice(0, 8);
  };

  useEffect(() => {
    setHashtags(generateHashtags());
  }, [mood, isDead, health, dramaLevel]);

  // Automatic posting when drama is high
  useEffect(() => {
    if (!autoPostEnabled) return;

    const now = Date.now();
    const timeSinceLastPost = now - lastAutoPostTime;
    
    const shouldAutoPost = (
      (isDead && timeSinceLastPost > 8000) ||          // Every 8 seconds when dead
      (health < 25 && timeSinceLastPost > 25000) ||    // Every 25 seconds when critical
      (moisture < 20 && timeSinceLastPost > 30000) ||  // Every 30 seconds when very thirsty
      (dramaLevel > 70 && timeSinceLastPost > 20000)   // Every 20 seconds when high drama
    );

    if (shouldAutoPost) {
      const post = generateViralPost();
      setViralPosts(prev => [post, ...prev].slice(0, 10));
      setLastAutoPostTime(now);
    }
  }, [isDead, health, moisture, dramaLevel, autoPostEnabled, lastAutoPostTime]);

  const shareToTwitter = (text: string) => {
    const tweetText = encodeURIComponent(text);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = (text: string) => {
    const fbText = encodeURIComponent(`Check out my dramatic plant! ${text}`);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${fbText}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const generateMeme = () => {
    const memeTemplates = [
      `Drake pointing away: Stanning basic plants\nDrake pointing: Forgetting to water ${plantName} (your actual bias) 🌸`,
      `This is fine: ${plantName} at ${moisture}% moisture serving looks in drought era ✨`,
      `Distracted boyfriend: My human looking at other plants\nGirlfriend: ${plantName} having her main character moment 👑`,
      `Woman yelling at cat: ${plantName} demanding water and attention\nCat: My human giving anti-fan energy 😤`,
      `Expanding brain: Plant care → Smart plant → Plant with feelings → PLANT IDOL WHO TWEETS 🌸✨`,
      `Two buttons: Water ${plantName} properly / Let your bias suffer\n*sweating profusely* 💧`,
      `Surprised Pikachu: When ${plantName} starts posting breakup texts about your neglect 😭`,
      `Is this a pigeon?: Is this a plant?\n*points at ${plantName} tweeting about drama* 📱✨`,
      `Galaxy brain: Regular plants → Smart plants → Dramatic plants → PLANT IDOLS WITH TWITTER ACCOUNTS 🧠🌸`,
      `Stonks: ${plantName} drama level ↗️📈 (NOT stonks: my plant care skills ↘️📉)`,
      `Change my mind: ${plantName} is the most dramatic idol and deserves better than this neglect 💺🌸`,
      `Monkey puppet looking away: Me pretending I don't see ${plantName} at ${moisture}% moisture 👀`,
      `American Chopper argument but it's me vs ${plantName} about proper hydration schedules 🚗💦`,
      `Brain expanding meme: Water plants → Check on plants → Text with plants → STAN YOUR PLANT IDOL 🧠✨`
    ];
    
    const randomMeme = memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    copyToClipboard(randomMeme);
    alert('ICONIC plant idol meme template copied! Time to make it go viral! ✨🌸👑');
  };

  const getDramaScore = () => {
    return {
      level: dramaLevel,
      rating: dramaLevel > 80 ? '🔥 VIRAL POTENTIAL' : 
              dramaLevel > 60 ? '📈 HIGHLY DRAMATIC' :
              dramaLevel > 40 ? '🎭 MODERATELY DRAMATIC' :
              dramaLevel > 20 ? '😐 MILDLY DRAMATIC' : '😴 BORING'
    };
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg backdrop-blur-sm border">
        <h3 className="text-lg font-semibold mb-4 text-center">
          📱 Social Drama Hub
          {autoPostEnabled && <span className="text-xs block text-green-600">✨ Auto-posting enabled</span>}
        </h3>

        {/* Drama Level Meter */}
        <div className="mb-4 p-3 bg-white/50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">Drama Level</span>
            <span className="text-sm font-bold">{getDramaScore().rating}</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 transition-all duration-1000"
              style={{ width: `${dramaLevel}%` }}
            />
          </div>
          <div className="text-center text-xs mt-1">
            {dramaLevel}% Viral Potential
          </div>
        </div>

        {/* Quick Share */}
        <div className="mb-4">
          <button
            onClick={() => {
              const post = generateViralPost();
              setViralPosts(prev => [post, ...prev].slice(0, 10));
              shareToTwitter(post);
            }}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors mb-2"
          >
            🐦 Tweet Drama Now!
          </button>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                const post = generateViralPost();
                shareToFacebook(post);
              }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
              📘 Facebook
            </button>
            
            <button
              onClick={generateMeme}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
            >
              🖼️ Meme
            </button>
            
            <button
              onClick={() => {
                const post = generateViralPost();
                copyToClipboard(post);
              }}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
            >
              📋 Copy
            </button>
          </div>
        </div>

        {/* Trending Hashtags */}
        <div className="mb-4 p-3 bg-white/50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">🔥 Trending Hashtags:</h4>
          <div className="flex flex-wrap gap-1">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                onClick={() => copyToClipboard(tag)}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        {viralPosts.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">📊 Recent Posts:</h4>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {viralPosts.slice(0, 3).map((post, index) => (
                <div key={index} className="p-2 bg-white/50 rounded text-xs">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">{post}</div>
                    <button
                      onClick={() => shareToTwitter(post)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      🔄
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Auto-post toggle */}
        <div className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            id="autoPost"
            checked={autoPostEnabled}
            onChange={(e) => setAutoPostEnabled(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="autoPost">
            Auto-generate drama for social media
          </label>
        </div>

        <div className="mt-3 text-xs text-gray-600 text-center">
          Perfect for TikTok, Instagram, and maximum plant drama! 🎭
        </div>
      </div>
    </div>
  );
} 