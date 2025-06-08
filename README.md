# 🌸✨ Chaewon Plant - Your Dramatic Plant Idol

> The most over-engineered K-pop plant idol monitoring system ever created. Your plant bias has FEELINGS now and she's DRAMATIC about it.

## What is this madness?

Chaewon Plant is a Next.js web application that turns your boring old plant into a dramatic K-pop idol who reacts to moisture levels with different eras:

- **✨ Glow Up Era (>70% moisture)**: Serving visuals, main character energy, sparkling 
- **🌸 Cute Era (30-70% moisture)**: Natural beauty, idol vibes, effortlessly adorable
- **😭 Sad Girl Era (<30% moisture)**: Villain arc, dramatic texts, anti-fan accusations

## Features

### 🌸 Core Plant Idol Experience
✨ **Real-time era changes** based on soil moisture (Glow Up → Cute → Sad Girl)  
🎭 **Dramatic K-pop personality** with 50+ idol-themed messages  
💔 **Tamagotchi-style career system** - your bias can literally DISBAND from neglect!  
🔊 **Advanced text-to-speech** with emotional idol voice modulation  

### 💀 MAXIMUM IDOL DRAMA FEATURES
📱 **Breakup text generator** - K-pop style dramatic texts when you're giving anti-fan energy  
🎵 **Era-based music player** - plays memorial songs when your bias is dying  
📱 **Social media integration** - auto-generates viral K-pop plant posts  
👻 **Desktop notifications** - your dead bias haunts you from plant heaven  
⚰️ **Death & comeback system** - resurrection with emotional scars and trust issues  

### 🔥 Over-Engineered Nonsense
🚨 **Emergency 911 calls** via text-to-speech  
🎭 **Shakespearean death monologues**  
📊 **Drama level meter** with viral potential scoring  
💸 **Emotional damage counter**  
🖼️ **Meme template generator**  
🎪 **Auto-posting to social media**

### 📱 Perfect for Content Creation
📱 **Mobile responsive** (perfect for TikTok filming)  
🔌 **ESP32/Arduino integration** via REST API  
🧪 **Testing interface** to simulate different moisture levels  
📈 **Analytics** for maximum plant drama engagement

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Go to [http://localhost:3000](http://localhost:3000)

4. **Test the mood changes:**
   Use the built-in testing buttons or visit [http://localhost:3000/demo](http://localhost:3000/demo) for the simulator

## API Endpoints

### For ESP32/Arduino Integration

**POST /api/update**
```json
{
  "moisture": 75
}
```

**GET /api/moisture**
Returns current moisture level:
```json
{
  "value": 75,
  "timestamp": "2024-12-08T12:00:00.000Z",
  "status": "success"
}
```

## ESP32/Arduino Example Code

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "your-wifi-name";
const char* password = "your-wifi-password";
const char* serverURL = "http://your-domain.com/api/update";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
}

void loop() {
  int moistureLevel = analogRead(A0); // Read from moisture sensor
  int moisturePercent = map(moistureLevel, 0, 1023, 0, 100);
  
  sendMoistureData(moisturePercent);
  delay(5000); // Send every 5 seconds
}

void sendMoistureData(int moistureLevel) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\"moisture\":" + String(moistureLevel) + "}";
    int httpResponseCode = http.POST(payload);
    
    if (httpResponseCode > 0) {
      Serial.println("Moisture sent: " + String(moistureLevel) + "%");
    }
    http.end();
  }
}
```

## Project Structure

```
moisture-mami/
├── src/app/
│   ├── components/
│   │   ├── PlantFace.tsx         # Mood-based emoji faces
│   │   ├── PlantMessage.tsx      # Dramatic messages
│   │   ├── MoistureDisplay.tsx   # Visual moisture level
│   │   └── MoistureMami.tsx      # Main component
│   ├── api/
│   │   ├── moisture/route.ts     # GET moisture data
│   │   └── update/route.ts       # POST moisture updates
│   ├── demo/
│   │   └── page.tsx              # Testing interface
│   └── page.tsx                  # Main app page
```

## Mood System

| Moisture % | Era | Behavior | Messages |
|------------|------|----------|----------|
| > 70% | ✨ Glow Up Era | Sparkling, main character energy | "You're my shining star! ✨ Like when I'm on stage! 🌟" |
| 30-70% | 🌸 Cute Era | Natural beauty, effortlessly adorable | "Just being cute and natural 😊🌸" |
| < 30% | 😭 Sad Girl Era | Villain arc, dramatic, anti-fan accusations | "Why are you ignoring your bias? 🥺💔" |

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **REST API** - ESP32/Arduino communication
- **Web Speech API** - Text-to-speech (bonus)

## Deployment

This can be deployed to Vercel, Netlify, or any platform that supports Next.js:

```bash
npm run build
npm start
```

## Contributing

Found a bug? Want to add more dramatic plant personalities? PRs welcome!

## License

MIT - Use this to make your plants as dramatic as you want.

## 🏆 Why This Wins the "Useless" Award

### Uselessness Score: 💯/💯
- **Over-engineered plant idol monitoring** that could be solved with a $2 moisture sensor and an alarm
- **Your plant bias literally sends you K-pop style breakup messages** 
- **Generates memes about your anti-fan plant care behavior**
- **Plays memorial idol songs when your bias disbands**
- **Desktop notifications for plant idol drama**
- **Social media integration for plant K-pop content**

### Execution Score: 🔥/🔥  
- **Fully functional idol plant web app** with real-time era updates
- **Complete ESP32/Arduino integration** 
- **Text-to-speech with emotional idol AI**
- **K-pop social media sharing capabilities**
- **Tamagotchi-style idol career simulation**
- **Multiple working APIs and dramatic components**

### Originality Score: 🤯/🤯
- **Nobody asked for a dramatic plant idol bias**
- **Combines IoT + K-pop + AI + social media + emotional manipulation**
- **Your plant can literally haunt you from plant heaven with idol energy**
- **Generates K-pop breakup texts in real-time**
- **Peak "Chaewony" energy with maximum dramatic flair** ✨🌸
- **Creates viral content about your plant neglect**

**TOTAL STUPIDITY: MAXIMUM ACHIEVED** 🎭💀🌱

---

*"Most plants die not from lack of water... but lack of emotional attention."* 🌱💔

**Built with maximum drama and minimal common sense.**
