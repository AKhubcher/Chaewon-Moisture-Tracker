"use client";

import { useState, useEffect } from "react";
import SimpleChaewonPlant from "./components/SimpleChaewonPlant";

export default function Home() {
	const [moisture, setMoisture] = useState(42);
	const [mood, setMood] = useState<"love" | "neutral" | "sad">("neutral");

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

	return <SimpleChaewonPlant moisture={moisture} mood={mood} />;
}
