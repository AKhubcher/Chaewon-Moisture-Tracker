import { NextResponse } from "next/server";

// Shared moisture data storage (in production, use a database)
let latestMoisture = 42;
let lastUpdate = new Date();
let sensorHistory: Array<{ value: number; timestamp: Date }> = [];

// Store last 24 readings for history
const MAX_HISTORY = 24;

export async function POST(request: Request) {
	try {
		// Handle both JSON and form data from Arduino
		let moisture: number;

		const contentType = request.headers.get("content-type");

		if (contentType?.includes("application/json")) {
			const body = await request.json();
			moisture = body.moisture || body.value || body.sensor;
		} else {
			// Handle form data or plain text from simple Arduino requests
			const body = await request.text();

			// Try to parse different formats Arduino might send
			if (body.includes("=")) {
				// Format: moisture=50 or sensor=50
				const match = body.match(
					/(?:moisture|sensor|value)=(\d+(?:\.\d+)?)/
				);
				moisture = match ? parseFloat(match[1]) : NaN;
			} else {
				// Plain number: "50" or "50.5"
				moisture = parseFloat(body.trim());
			}
		}

		// Validate moisture value
		if (isNaN(moisture) || moisture < 0) {
			return NextResponse.json(
				{
					error: "Invalid moisture value",
					received: moisture,
					expected: "Number between 0-100",
					examples: ["50", "moisture=50", '{"moisture": 50}'],
				},
				{ status: 400 }
			);
		}

		// Update the moisture value
		latestMoisture = Math.round(moisture * 100) / 100; // Round to 2 decimal places
		lastUpdate = new Date();

		// Add to history
		sensorHistory.push({
			value: latestMoisture,
			timestamp: lastUpdate,
		});

		// Keep only last MAX_HISTORY readings
		if (sensorHistory.length > MAX_HISTORY) {
			sensorHistory = sensorHistory.slice(-MAX_HISTORY);
		}

		console.log(
			`🌱 Arduino/ESP32 Update: ${latestMoisture}% at ${lastUpdate.toISOString()}`
		);

		// Simple response for Arduino (easy to parse)
		return NextResponse.json({
			status: "success",
			moisture: latestMoisture,
			timestamp: lastUpdate.toISOString(),
			message: "Data received",
		});
	} catch (error) {
		console.error("❌ Arduino API Error:", error);
		return NextResponse.json(
			{
				status: "error",
				error: "Failed to process request",
				message: "Check your data format",
			},
			{ status: 500 }
		);
	}
}

// GET endpoint for debugging and testing
export async function GET() {
	const minutesAgo = Math.floor((Date.now() - lastUpdate.getTime()) / 60000);

	return NextResponse.json({
		currentMoisture: latestMoisture,
		lastUpdate: lastUpdate.toISOString(),
		minutesAgo: minutesAgo,
		status: minutesAgo > 5 ? "stale" : "fresh",
		history: sensorHistory.slice(-5), // Last 5 readings
		totalReadings: sensorHistory.length,
		endpoints: {
			post: "/api/arduino",
			formats: [
				'JSON: {"moisture": 50}',
				"Form: moisture=50",
				"Plain: 50",
			],
		},
	});
}

// Allow OPTIONS for CORS if needed
export async function OPTIONS() {
	return new NextResponse(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
