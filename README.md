# 🌸✨ Chaewon Plant Monitor - Your Dramatic K-pop Plant Idol

> A beautifully over-engineered K-pop plant monitoring system where your plant has FEELINGS and reacts dramatically to moisture levels with Chaewon-inspired emotions.

## What is this madness?

Chaewon Plant Monitor is a Next.js web application that transforms your plant into a dramatic K-pop idol who reacts to moisture levels with different emotional eras. Watch as Chaewon's face changes and dramatic emojis float around your screen based on how well you're caring for your plant!

## 🎭 Current Features

### 🌸 Beautiful Chaewon Plant Interface
- **Real-time Chaewon face changes** based on plant mood (happy, neutral, sad)
- **Emotion-specific floating emojis** that dance around your screen
- **Death emojis (💀⚰️🖤)** dramatically appear when your plant is sad!
- **Smooth moisture bar** with percentage display and era indicators
- **Auto-updating quotes** inspired by Chaewon's songs and K-pop themes

### 🎨 Three Emotional Eras
- **💖 Love Era (>70% moisture)**: Happy Chaewon with celebration emojis ✨🎉💖🌟
- **💜 Neutral Era (30-70% moisture)**: Peaceful Chaewon with gentle flowers 🌸💜🌺
- **💀 Sad Era (<30% moisture)**: Sad Chaewon with DRAMATIC DEATH EMOJIS 💀⚰️🖤

### 🔌 Real Arduino/ESP32 Integration
- **Easy API endpoints** for sending real moisture data
- **Multiple data formats supported** (JSON, form data, plain numbers)
- **Real-time updates** from your actual plant sensors
- **Complete Arduino code examples** provided
- **Automatic fallback** to simulated data when no sensor connected

## 🚀 Quick Start

### 1. Install and Run the App

```bash
# Clone the repository
git clone <your-repo-url>
cd moisture-mami

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your Chaewon Plant!

### 2. Test Without Hardware

The app works immediately with simulated data. You'll see Chaewon react with different emotions and floating emojis.

### 3. Connect Real Hardware (Optional)

See the **Arduino Setup** section below for complete hardware integration.

## 📡 API Endpoints

### Primary Arduino Endpoint
**POST /api/arduino**
- **Purpose**: Receives moisture data from ESP32/Arduino
- **Accepts**: Multiple formats for maximum compatibility
- **URL**: `https://your-domain.com/api/arduino`

**Supported data formats:**
```bash
# JSON format
curl -X POST https://your-domain.com/api/arduino \
  -H "Content-Type: application/json" \
  -d '{"moisture": 75}'

# Form data format  
curl -X POST https://your-domain.com/api/arduino \
  -d "moisture=75"

# Plain number format
curl -X POST https://your-domain.com/api/arduino \
  -d "75"
```

**Response:**
```json
{
  "status": "success",
  "moisture": 75,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "message": "Data received"
}
```

### Web App Data Endpoint
**GET /api/moisture**
- **Purpose**: Provides moisture data to the web interface
- **Returns**: Current moisture level with metadata

```json
{
  "moisture": 75,
  "value": 75,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "lastArduinoUpdate": "2024-01-01T11:59:30.000Z",
  "minutesSinceArduinoUpdate": 0,
  "dataSource": "arduino",
  "status": "success"
}
```

## 🔧 Arduino/ESP32 Setup

### Hardware Requirements
- **ESP32 Development Board** (recommended) or Arduino Uno + WiFi module
- **Capacitive Soil Moisture Sensor** (more reliable than resistive)
- **Jumper wires**
- **Breadboard** (optional)

### Quick Wiring (ESP32)
```
ESP32 Pin    →    Moisture Sensor
GND          →    GND 
3.3V         →    VCC 
GPIO36 (A0)  →    AOUT (sensor output)
GPIO2        →    LED (status indicator)
```

### Arduino Code Setup

1. **Install Libraries** in Arduino IDE:
   - ArduinoJson (by Benoit Blanchon)
   - WiFi and HTTPClient (built-in for ESP32)

2. **Use Provided Code**:
   - `arduino_examples/esp32_moisture_sender.ino` - For ESP32 boards
   - `arduino_examples/arduino_uno_wifi.ino` - For Arduino Uno + WiFi module

3. **Configure Your Settings**:
```cpp
// Update these in the Arduino code
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiEndpoint = "https://your-app.vercel.app/api/arduino";
```

4. **Upload and Monitor**:
   - Upload code to your board
   - Open Serial Monitor at 115200 baud
   - Watch for connection and data sending messages

### Complete Setup Guide
See `ARDUINO_SETUP_GUIDE.md` for detailed step-by-step instructions, troubleshooting, and sensor calibration.

## 🎭 How It Works

```
Real Plant → Moisture Sensor → ESP32 → WiFi → Your API → Chaewon Plant App
     ↓             ↓            ↓       ↓         ↓            ↓
  Actual        Analog       Converts  Sends    Stores      Dramatic
  Moisture      Reading      to %      JSON     Data        Reactions!
```

When your plant gets thirsty:
1. **Moisture level drops** below 30%
2. **Chaewon's face becomes sad** (shows actual sad Chaewon image/gif)
3. **Death emojis start floating** around the screen (💀⚰️🖤)
4. **Dramatic quotes appear** like "I'm feeling wilted and lonely..."
5. **Color scheme changes** to blue/sad tones

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. **Push to GitHub**:
```bash
git add .
git commit -m "Added Chaewon Plant Monitor"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

3. **Update Arduino Code** with your live URL:
```cpp
const char* apiEndpoint = "https://your-app.vercel.app/api/arduino";
```

### Deploy to Other Platforms
Works with any platform supporting Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 📱 Project Structure

```
moisture-mami/
├── src/app/
│   ├── components/
│   │   └── SimpleChaewonPlant.tsx    # Main Chaewon plant interface
│   ├── api/
│   │   ├── arduino/route.ts          # Arduino data endpoint
│   │   └── moisture/route.ts         # Web app data endpoint
│   └── page.tsx                      # Main app page
├── arduino_examples/
│   ├── esp32_moisture_sender.ino     # ESP32 code
│   └── arduino_uno_wifi.ino          # Arduino Uno code
├── ARDUINO_SETUP_GUIDE.md            # Complete hardware guide
└── README.md                         # This file
```

## 🎨 Emotional System

| Moisture Level | Era | Chaewon Image | Floating Emojis | Quotes |
|----------------|-----|---------------|-----------------|---------|
| **>70%** | 💖 Love Era | Happy/energetic Chaewon | ✨🌟💖⭐🌸💫🎉 | "I'm blooming with pure joy!" |
| **30-70%** | 💜 Neutral Era | Calm/peaceful Chaewon | 🌸💜🌺🌿🍃🌱 | "I'm content and peaceful..." |
| **<30%** | 💀 Sad Era | Sad Chaewon GIF | 💧😢💙🌧️💀⚰️🖤 | "I'm feeling wilted and lonely..." |

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first styling
- **REST APIs** - ESP32/Arduino communication
- **Real-time updates** - Polling-based moisture monitoring

## 🧪 Testing Without Hardware

The app works great even without physical sensors:

1. **Simulated data** provides realistic moisture fluctuations
2. **Manual testing** by modifying API responses
3. **Browser testing** of all emotional states
4. **Visual verification** of emoji animations and mood changes

## 🎯 Perfect For

- **Plant enthusiasts** who want dramatic plant monitoring
- **K-pop fans** who want Chaewon to watch their plants
- **Arduino/ESP32 learners** looking for a fun IoT project
- **Web developers** interested in API integration
- **Content creators** who want unique plant content

## 🏆 Why This Project is Beautifully Useless

### Uselessness Score: 💯/💯
- **Dramatically over-engineered** plant monitoring that could be solved with a $2 moisture meter
- **Your plant gets a K-pop idol personality** complete with emotional breakdowns
- **Death emojis float around** when your plant is thirsty
- **Chaewon's face changes** based on plant mood (completely unnecessary but amazing)

### Execution Score: 🔥/🔥  
- **Fully functional web app** with real-time updates
- **Complete ESP32 integration** with working Arduino code
- **Beautiful, responsive design** optimized for single-page viewing
- **Multiple API endpoints** with robust error handling
- **Comprehensive documentation** and setup guides

### Originality Score: 🤯/🤯
- **Nobody asked for a dramatic K-pop plant monitor**
- **Combines IoT + K-pop + web development + plant care**
- **Death emojis for plant monitoring** is peak engineering overkill
- **Chaewon becomes your plant's emotional avatar**

## 🤝 Contributing

Found a bug? Want to add more dramatic plant personalities? PRs welcome!

## 📄 License

MIT - Use this to make your plants as dramatic as you want.

---

## 🌱 Start Your Plant's K-pop Career Today!

Your plant deserves to be a dramatic K-pop idol with emotional reactions to moisture levels. Set up your Chaewon Plant Monitor and watch those death emojis dance when your plant gets thirsty! 💀🌱✨
