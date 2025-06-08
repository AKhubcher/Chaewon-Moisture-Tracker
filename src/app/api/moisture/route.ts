import { NextResponse } from "next/server";

// Import shared data (in production, use a database)
// This should be synchronized with the Arduino endpoint
let latestMoisture = 42; // Default value
let lastArduinoUpdate = new Date();

// Function to get the current moisture (this would read from database in production)
function getCurrentMoisture() {
	// Check if we have recent data from Arduino
	const minutesSinceUpdate =
		(Date.now() - lastArduinoUpdate.getTime()) / 60000;

	if (minutesSinceUpdate > 5) {
		// If no recent Arduino data, simulate some data for demo
		const now = Date.now();
		const variation = Math.sin(now / 10000) * 10;
		const noise = (Math.random() - 0.5) * 5;
		return Math.max(0, Math.min(100, latestMoisture + variation + noise));
	}

	return latestMoisture;
}

export async function GET() {
	try {
		const moisture = getCurrentMoisture();
		const minutesSinceUpdate = Math.floor(
			(Date.now() - lastArduinoUpdate.getTime()) / 60000
		);

		return NextResponse.json({
			moisture: Math.round(moisture),
			value: Math.round(moisture), // Alternative key for compatibility
			timestamp: new Date().toISOString(),
			lastArduinoUpdate: lastArduinoUpdate.toISOString(),
			minutesSinceArduinoUpdate: minutesSinceUpdate,
			dataSource: minutesSinceUpdate > 5 ? "simulated" : "arduino",
			status: "success",
		});
	} catch (error) {
		console.error("Error fetching moisture data:", error);
		return NextResponse.json(
			{ error: "Failed to fetch moisture data" },
			{ status: 500 }
		);
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { moisture } = body;

		latestMoisture = moisture;
		lastArduinoUpdate = new Date();

		return NextResponse.json({
			success: true,
			moisture: latestMoisture,
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Error updating moisture data:", error);
		return NextResponse.json(
			{ error: "Failed to update moisture data" },
			{ status: 500 }
		);
	}
}

// Function to update moisture from Arduino endpoint (called internally)
export function updateMoistureFromArduino(moisture: number) {
	latestMoisture = moisture;
	lastArduinoUpdate = new Date();
}
