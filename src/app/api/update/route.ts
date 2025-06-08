import { NextResponse } from 'next/server';

// This would be the same variable as in the moisture route
// In a real app, this would be in a shared database
let latestMoisture = 50;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { moisture } = body;
    
    // Validate moisture value
    if (typeof moisture !== 'number' || moisture < 0 || moisture > 100) {
      return NextResponse.json(
        { error: 'Invalid moisture value. Must be a number between 0 and 100.' },
        { status: 400 }
      );
    }
    
    // Update the moisture value
    latestMoisture = moisture;
    
    console.log(`Moisture updated from ESP/Arduino: ${moisture}%`);
    
    return NextResponse.json({ 
      success: true,
      message: 'Moisture level updated successfully',
      moisture: latestMoisture,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating moisture from ESP:', error);
    return NextResponse.json(
      { error: 'Failed to update moisture data' },
      { status: 500 }
    );
  }
}

// For testing purposes, also allow GET requests to see current value
export async function GET() {
  return NextResponse.json({ 
    currentMoisture: latestMoisture,
    message: 'This endpoint is typically used by ESP32/Arduino to POST moisture data',
    usage: 'POST to this endpoint with { "moisture": <0-100> }',
    timestamp: new Date().toISOString()
  });
} 