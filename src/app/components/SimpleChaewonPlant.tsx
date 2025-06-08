"use client";

import React, { useState, useEffect } from "react";

interface SimpleChaewonPlantProps {
	moisture: number;
	mood: "love" | "neutral" | "sad";
}

export default function SimpleChaewonPlant({
	moisture,
	mood,
}: SimpleChaewonPlantProps) {
	const [currentQuote, setCurrentQuote] = useState("");
	const [currentSong, setCurrentSong] = useState("");
	const [plantLevel, setPlantLevel] = useState(1);
	const [sparkleCount, setSparkleCount] = useState(15);
	const [displayMoisture, setDisplayMoisture] = useState(42);

	// Emotion-based quotes that match the plant's feelings
	const getEmotionQuote = () => {
		const emotionQuotes = {
			love: {
				quote: "I'm blooming with pure joy and endless energy! Every drop makes me stronger! ✨",
				song: "Feeling Fearless & Radiant",
				caption: "Thriving & Glowing",
			},
			neutral: {
				quote: "I'm content and peaceful, growing at my own gentle pace... 🌸",
				song: "Serene Garden Vibes",
				caption: "Peaceful Growth",
			},
			sad: {
				quote: "I'm feeling a bit wilted and lonely... I miss the warmth of being loved 💧",
				song: "Longing for Care",
				caption: "Needs Tender Love",
			},
		};
		return emotionQuotes[mood];
	};

	// Get emotion-specific Chaewon images
	const getChaewonImage = () => {
		console.log("mood", mood);
		switch (mood) {
			case "love":
				// Happy, bright, energetic Chaewon
				return "https://media1.tenor.com/m/wNYQ5ZPbUwAAAAAd/chaewon-lesserafim.gif";
			default:
				return "https://media1.tenor.com/m/y5M2607yKNwAAAAd/chaewon-triste-chaewon-sad.gif";
		}
	};

	// Get emotion-specific floating emojis
	const getEmotionEmojis = () => {
		switch (mood) {
			case "love":
				return [
					"✨",
					"🌟",
					"💖",
					"⭐",
					"🌸",
					"💫",
					"🎉",
					"🥰",
					"😍",
					"💕",
					"🌺",
					"🦄",
				];
			case "neutral":
				return [
					"🌸",
					"💜",
					"🌺",
					"✨",
					"🌿",
					"🍃",
					"🌱",
					"💙",
					"😊",
					"🌼",
					"🦋",
					"🌷",
				];
			case "sad":
				return [
					"💧",
					"😢",
					"💙",
					"🌧️",
					"⛈️",
					"💔",
					"😭",
					"🥺",
					"💀",
					"⚰️",
					"🖤",
					"⛅",
				];
		}
	};

	// Update display moisture with smooth animation
	useEffect(() => {
		setDisplayMoisture(moisture);
	}, [moisture]);

	// Update plant level and sparkles based on moisture
	useEffect(() => {
		if (moisture > 80) setPlantLevel(5);
		else if (moisture > 60) setPlantLevel(4);
		else if (moisture > 40) setPlantLevel(3);
		else if (moisture > 20) setPlantLevel(2);
		else setPlantLevel(1);

		// Update sparkle count based on mood
		setSparkleCount(mood === "love" ? 30 : mood === "neutral" ? 20 : 12);
	}, [moisture, mood]);

	// Update quote when mood changes (no auto-loop)
	useEffect(() => {
		const emotionData = getEmotionQuote();
		setCurrentQuote(emotionData.quote);
		setCurrentSong(emotionData.song);
	}, [mood]);

	// Get mood color scheme
	const getMoodColors = () => {
		switch (mood) {
			case "love":
				return {
					gradient: "from-pink-400 via-rose-400 to-yellow-400",
					bg: "from-pink-50 via-rose-50 to-yellow-50",
					border: "border-pink-400",
					text: "text-pink-800",
					glow: "shadow-pink-200",
					barBg: "bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-500",
				};
			case "neutral":
				return {
					gradient: "from-purple-300 via-pink-300 to-indigo-300",
					bg: "from-purple-50 via-pink-50 to-indigo-50",
					border: "border-purple-400",
					text: "text-purple-800",
					glow: "shadow-purple-200",
					barBg: "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500",
				};
			case "sad":
				return {
					gradient: "from-blue-400 via-indigo-400 to-purple-400",
					bg: "from-blue-50 via-indigo-50 to-purple-50",
					border: "border-blue-400",
					text: "text-blue-800",
					glow: "shadow-blue-200",
					barBg: "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
				};
		}
	};

	const colors = getMoodColors();
	const emotionData = getEmotionQuote();
	const emotionEmojis = getEmotionEmojis();

	// Get emotion-based status text
	const getEmotionalStatus = () => {
		switch (mood) {
			case "love":
				return "✨ Living My Best Life";
			case "neutral":
				return "🌸 Chill & Content";
			case "sad":
				return "💔 Feeling Blue";
		}
	};

	return (
		<div
			className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ${colors.bg} p-4 relative overflow-hidden`}
		>
			{/* Status Bar - Compact */}
			<div className="absolute top-2 left-2 right-2 flex justify-between items-center text-xs font-medium z-10">
				<div className={`${colors.text} flex items-center gap-2`}>
					<span>🌱 Lvl {plantLevel}</span>
					<span>•</span>
					<span>{emotionData.caption}</span>
				</div>
				<div className={`${colors.text} font-semibold`}>
					{getEmotionalStatus()}
				</div>
			</div>

			{/* Circular Chaewon Face - Compact */}
			<div className="relative mb-4 group mt-8">
				<div
					className={`w-60 h-60 rounded-full overflow-hidden border-6 ${colors.border} shadow-2xl ${colors.glow} transition-all duration-500 hover:scale-105`}
				>
					<img
						src={getChaewonImage()}
						alt={`Chaewon feeling ${mood}`}
						className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
						onError={(e) => {
							e.currentTarget.style.display = "none";
							e.currentTarget.nextElementSibling.style.display =
								"flex";
						}}
					/>
					<div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-8xl hidden">
						{mood === "love"
							? "🥰"
							: mood === "neutral"
							? "😊"
							: "🥺"}
					</div>
				</div>

				{/* Emotion-specific sparkle effects around face */}
				{mood === "love" && (
					<>
						<div className="absolute -top-4 -left-4 text-2xl animate-bounce">
							✨
						</div>
						<div className="absolute -top-2 -right-6 text-xl animate-pulse">
							🌟
						</div>
						<div
							className="absolute -bottom-4 -right-4 text-2xl animate-bounce"
							style={{ animationDelay: "0.5s" }}
						>
							💫
						</div>
						<div
							className="absolute -bottom-2 -left-6 text-xl animate-pulse"
							style={{ animationDelay: "1s" }}
						>
							🌸
						</div>
						<div
							className="absolute top-2 -left-8 text-lg animate-spin"
							style={{
								animationDelay: "2s",
								animationDuration: "3s",
							}}
						>
							💖
						</div>
						<div
							className="absolute top-4 -right-8 text-lg animate-spin"
							style={{
								animationDelay: "1.5s",
								animationDuration: "4s",
							}}
						>
							⭐
						</div>
					</>
				)}
				{mood === "neutral" && (
					<>
						<div className="absolute -top-3 -left-3 text-xl animate-pulse">
							🌸
						</div>
						<div
							className="absolute -top-1 -right-5 text-lg animate-pulse"
							style={{ animationDelay: "1s" }}
						>
							💜
						</div>
						<div
							className="absolute -bottom-3 -right-3 text-xl animate-pulse"
							style={{ animationDelay: "2s" }}
						>
							🌺
						</div>
						<div
							className="absolute -bottom-1 -left-5 text-lg animate-pulse"
							style={{ animationDelay: "1.5s" }}
						>
							✨
						</div>
					</>
				)}
				{mood === "sad" && (
					<>
						<div className="absolute -top-3 -left-3 text-xl animate-bounce opacity-70">
							💧
						</div>
						<div
							className="absolute -top-1 -right-5 text-lg animate-pulse opacity-70"
							style={{ animationDelay: "1s" }}
						>
							😢
						</div>
						<div
							className="absolute -bottom-3 -right-3 text-xl animate-bounce opacity-70"
							style={{ animationDelay: "2s" }}
						>
							💙
						</div>
						<div
							className="absolute -bottom-1 -left-5 text-lg animate-pulse opacity-70"
							style={{ animationDelay: "1.5s" }}
						>
							🌧️
						</div>
						<div
							className="absolute top-1 -left-7 text-lg animate-pulse opacity-60"
							style={{ animationDelay: "3s" }}
						>
							💀
						</div>
						<div
							className="absolute top-3 -right-7 text-lg animate-bounce opacity-60"
							style={{ animationDelay: "2.5s" }}
						>
							⚰️
						</div>
					</>
				)}
			</div>

			{/* Enhanced Moisture Level Display - Compact */}
			<div className="w-full max-w-md mb-4">
				<div className="text-center mb-2">
					<span className={`text-lg font-bold ${colors.text}`}>
						💧 Emotional Water Level
					</span>
				</div>

				{/* Beautiful moisture bar with glow effect */}
				<div className="relative">
					<div
						className={`w-full h-6 bg-white/50 rounded-full overflow-hidden border-2 ${colors.border} backdrop-blur-sm shadow-lg`}
					>
						<div
							className={`h-full transition-all duration-1000 bg-gradient-to-r ${colors.gradient} relative overflow-hidden`}
							style={{
								width: `${Math.max(
									0,
									Math.min(100, displayMoisture)
								)}%`,
							}}
						>
							{/* Animated shine effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
							{/* Percentage display inside bar when there's space */}
							{displayMoisture > 20 && (
								<div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
									{displayMoisture}%
								</div>
							)}
						</div>
					</div>

					{/* Percentage and status */}
					<div className="flex justify-between items-center mt-2">
						<span className={`text-2xl font-bold ${colors.text}`}>
							{displayMoisture}%
						</span>
						<span
							className={`text-sm font-semibold ${colors.text} flex items-center gap-1`}
						>
							{mood === "love"
								? "✨ Overflowing Era"
								: mood === "neutral"
								? "🌸 Balanced Era"
								: "💔 Drought Era"}
						</span>
					</div>

					{/* Emotion-based progress indicators */}
					<div className="flex justify-between mt-1 text-xs opacity-60">
						<span>{mood === "sad" ? "Withering" : "Thirsty"}</span>
						<span>
							{mood === "love"
								? "Glowing"
								: mood === "neutral"
								? "Content"
								: "Hoping"}
						</span>
						<span>
							{mood === "love" ? "Radiant" : "Flourishing"}
						</span>
					</div>
				</div>
			</div>

			{/* Enhanced Chaewon Plant Says Bar - Compact */}
			<div className="w-full max-w-md mb-4">
				<div
					className={`${colors.barBg} text-white px-4 py-2 rounded-t-lg shadow-lg`}
				>
					<span className="font-bold text-base flex items-center gap-2">
						🌸 Chaewon Plant's Heart:
						{mood === "love" && (
							<span className="animate-pulse">💖</span>
						)}
						{mood === "neutral" && (
							<span className="animate-pulse">💜</span>
						)}
						{mood === "sad" && (
							<span className="animate-pulse">💙</span>
						)}
					</span>
				</div>

				<div
					className="bg-white/90 backdrop-blur-sm border-2 border-current rounded-b-lg p-4 min-h-[80px] flex flex-col justify-center shadow-xl"
					style={{
						borderColor: colors.border.replace("border-", ""),
					}}
				>
					<div className="text-base text-gray-800 mb-2 italic leading-relaxed">
						"{currentQuote}"
					</div>
					<div
						className={`text-xs font-semibold flex items-center justify-between ${colors.text}`}
					>
						<span>- {currentSong}</span>
						<span className="text-xs opacity-70">
							🎵 Current Mood
						</span>
					</div>
				</div>
			</div>

			{/* Dramatic floating emotion-based emojis that pop around screen */}
			<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
				{[...Array(sparkleCount)].map((_, i) => {
					const emoji = emotionEmojis[i % emotionEmojis.length];
					const isSpecialEmoji =
						mood === "sad" &&
						(emoji === "💀" || emoji === "⚰️" || emoji === "💔");

					return (
						<div
							key={i}
							className={`absolute text-2xl animate-float ${
								isSpecialEmoji ? "opacity-80" : "opacity-60"
							} ${isSpecialEmoji ? "text-3xl" : ""}`}
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 5}s`,
								animationDuration: `${3 + Math.random() * 4}s`,
								transform: isSpecialEmoji
									? "scale(1.2)"
									: "scale(1)",
							}}
						>
							{emoji}
						</div>
					);
				})}
			</div>

			{/* Special dramatic effects for sad mood */}
			{mood === "sad" && (
				<div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
					{[...Array(8)].map((_, i) => (
						<div
							key={`special-${i}`}
							className="absolute text-4xl animate-bounce opacity-70"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${2 + Math.random() * 2}s`,
							}}
						>
							{i % 3 === 0 ? "💀" : i % 3 === 1 ? "⚰️" : "🖤"}
						</div>
					))}
				</div>
			)}

			{/* Mood indicator hearts - Bottom right */}
			<div className="absolute bottom-2 right-2 flex gap-1">
				{[...Array(5)].map((_, i) => (
					<span
						key={i}
						className={`text-lg ${
							i < plantLevel ? "opacity-100" : "opacity-30"
						}`}
					>
						{mood === "love"
							? "💖"
							: mood === "neutral"
							? "💜"
							: "💙"}
					</span>
				))}
			</div>

			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg) scale(1);
						opacity: 0.6;
					}
					25% {
						transform: translateY(-20px) rotate(90deg) scale(1.1);
						opacity: 0.8;
					}
					50% {
						transform: translateY(-35px) rotate(180deg) scale(1.2);
						opacity: 1;
					}
					75% {
						transform: translateY(-20px) rotate(270deg) scale(1.1);
						opacity: 0.8;
					}
				}
				.animate-float {
					animation: float 4s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
}
