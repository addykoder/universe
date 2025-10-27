"use client";
import React, { useState, useEffect } from 'react';
import { Sun } from 'lucide-react'; // Removed unused icons

// This is the main component
export default function App() {
  // --- State Management ---

  // The slider's visual value (0-100)
  const [sliderValue, setSliderValue] = useState(50);
  
  // What the slider is *actually* controlling
  // 'brightness', 'fontSize', 'x', or 'y'
  const [currentMode, setCurrentMode] = useState('brightness');

  // The applied values
  const [brightness, setBrightness] = useState(100); // 100%
  const [fontSize, setFontSize] = useState(16); // 16px
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 }); // 0vw, 0vh offset
  // --- NEW STATES ---
  const [hue, setHue] = useState(0); // 0deg
  const [blur, setBlur] = useState(0); // 0px
  const [skew, setSkew] = useState(0); // 0deg

  // --- Page-wide Effects ---

  // Apply page-wide brightness, blur, and hue
  useEffect(() => {
    document.documentElement.style.filter = `brightness(${brightness}%) blur(${blur}px) hue-rotate(${hue}deg)`;
  }, [brightness, blur, hue]);

  // Apply page-wide font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // --- NEW: Apply page-wide skew ---
  useEffect(() => {
    document.documentElement.style.transform = `skewX(${skew}deg)`;
  }, [skew]);


  // --- Slider Logic ---

  // NEW: handleMouseDown - This is where we roll the dice
  const handleMouseDown = () => {
    // --- The 30% Gamble ---
    // Roll the dice to see what this slider *actually* does
    const rand = Math.random();
    let newMode = '';

    if (rand < 0.30) {
      // 30% chance: Control Brightness
      newMode = 'brightness';
    } else if (rand < 0.42) {
      // 12% chance: Control Font Size
      newMode = 'fontSize';
    } else if (rand < 0.54) {
      // 12% chance: Control Card X Position
      newMode = 'x';
    } else if (rand < 0.66) {
      // 12% chance: Control Card Y Position
      newMode = 'y';
    } else if (rand < 0.78) {
      // 12% chance: Control Page Hue
      newMode = 'hue';
    } else if (rand < 0.90) {
      // 12% chance: Control Page Blur
      newMode = 'blur';
    } else {
      // 10% chance: Control Page Skew
      newMode = 'skew';
    }
    
    setCurrentMode(newMode);
  };

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);

    // Apply changes based on the *already set* mode from onMouseDown
    switch (currentMode) {
      case 'brightness':
        // Scale from 0-100 to 0%-150% (can go too bright)
        setBrightness(newValue * 1.5);
        break;
      case 'fontSize':
        // Scale from 0-100 to 6px-26px
        setFontSize((newValue / 5) + 6);
        break;
      case 'x':
        // Scale from 0-100 to -45vw to +45vw (so it stays *mostly* on screen)
        setCardPos(pos => ({ ...pos, x: (newValue - 50) * 0.9 }));
        break;
      case 'y':
        // Scale from 0-100 to -45vh to +45vh
        setCardPos(pos => ({ ...pos, y: (newValue - 50) * 0.9 }));
        break;
      // --- NEW CASES ---
      case 'hue':
        // Scale from 0-100 to 0-360 deg
        setHue(newValue * 3.6);
        break;
      case 'blur':
        // Scale from 0-100 to 0-10 px
        setBlur(newValue / 10);
        break;
      case 'skew':
        // Scale from 0-100 to -30 to 30 deg
        setSkew((newValue - 50) * 0.6);
        break;
      default:
        // Should not happen, but just in case
        setBrightness(newValue * 1.5);
    }
  };

  // DELETED the getModeIcon function as it's no longer used

  return (
    // The whole page container, which will have its styles manipulated
    <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8 transition-all duration-300 ease-in-out relative overflow-hidden">
      
      {/* Instructions */}
      <div className="text-center max-w-lg mx-auto mb-8 z-0 relative">
        <h1 className="text-3xl font-bold mb-2">The "Brightness" Slider</h1>
        <p className="text-lg text-gray-400">
          It works 30% of the time, every time. We're not sure what it does the rest of the time.
        </p>
      </div>

      {/* The Slider Card */}
      <div
        className="fixed p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 transition-transform duration-300 ease-out w-full max-w-md z-10"
        style={{
          // Start centered, then apply random offsets
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${cardPos.x}vw, ${cardPos.y}vh)`,
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Brightness Control</h2>
          {/* DELETED the mode indicator div */}
        </div>

        <div className="flex items-center gap-4">
          <Sun size={20} className="text-gray-500" />
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            onMouseDown={handleMouseDown} // <-- ADDED THIS
            className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer range-lg"
            style={{
              // Make the slider track "lie" by filling based on brightness, not its own value
              background: `linear-gradient(to right, #facc15 ${brightness / 1.5}%, #4b5563 ${brightness / 1.5}%)`
            }}
          />
          <Sun size={32} className="text-gray-400" />
        </div>
        
        {/* DELETED the div with the 4 info <p> tags */}
      </div>
    </div>
  );
}


