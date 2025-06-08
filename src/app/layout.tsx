import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaewon Plant - Your Dramatic Plant Idol 🌸✨",
  description: "The most over-engineered K-pop plant idol monitoring system ever created. Your plant bias has FEELINGS now.",
  keywords: ["plant", "chaewon", "kpop", "idol", "dramatic", "IoT", "Arduino", "ESP32", "plant care", "bias"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
