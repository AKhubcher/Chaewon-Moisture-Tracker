"use client";

import { useState, useEffect, useRef } from "react";
import SimpleChaewonPlant from "./components/SimpleChaewonPlant";

export default function Home() {
	const [moisture, setMoisture] = useState(42);
	const [mood, setMood] = useState<"love" | "neutral" | "sad">("neutral");
	const previousMood = useRef(mood);

	// Fetch moisture data
	useEffect(() => {
		const fetchMoisture = async () => {
			try {
				const response = await fetch("/api/moisture");
				const data = await response.json();
				setMoisture(data.moisture);

				// Update mood based on moisture
				if (data.moisture > 400) {
					setMood("sad");
				} else {
					setMood("love");
				}
			} catch (error) {
				console.error("Error fetching moisture:", error);
			}
		};

		// Fetch immediately
		fetchMoisture();

		// Then fetch every 2 seconds
		const interval = setInterval(fetchMoisture, 2000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (previousMood.current !== mood) {
			const audio = new Audio(`/images/${mood}.mp3`);
			audio.play();
			previousMood.current = mood;
		}
	}, [mood]);

	return <SimpleChaewonPlant moisture={moisture} mood={mood} />;
}
