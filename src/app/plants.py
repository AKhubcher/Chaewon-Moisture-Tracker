import serial
import time
import requests

PORT = "COM3"  # Replace with your Arduino's port
BAUD = 9600
API_URL = "http://localhost:3000/api/moisture"  # Replace with your actual endpoint

ser = serial.Serial(PORT, BAUD)
time.sleep(2)  # Give Arduino time to reset

print("Connected. Sending data every 30 seconds...\n")

try:
    while True:
        line = ser.readline().decode("utf-8").strip()

        if line.isdigit():
            moisture = int(line)
            print(f"Moisture: {moisture}")

            try:
                response = requests.post(API_URL, json={"moisture": moisture})
                print(
                    f"Sent to API: Status {response.status_code}, Response: {response.text}"
                )
            except Exception as e:
                print(f"Failed to send to API: {e}")

            time.sleep(0.5)  # Wait 30 seconds before next send
except KeyboardInterrupt:
    print("\nStopped.")
    ser.close()
