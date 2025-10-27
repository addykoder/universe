"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';

// --- Configuration ---
const DEFAULT_VOLUME = 50; // The volume it "fights" to return to
const FIGHTER_DELAY = 1000; // 2 seconds before it starts fighting back
const FIGHTER_SPEED = 25; // Milliseconds per 1% change

// --- Helper Functions ---

/**
 * Generates a random position for a "Waldo" button.
 * @returns {{ top: string, left: string }}
 */
const getRandomPosition = () => {
  // Ensure it's not *too* close to the edge
  const top = Math.random() * 90 + 5;
  const left = Math.random() * 90 + 5;
  return {
    top: `${top}%`,
    left: `${left}%`,
  };
};

/**
 * A custom hook to manage the "Scream" sound via Web Audio API.
 */
const useScream = () => {
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const startScream = useCallback(() => {
    if (audioContextRef.current) return; // Already screaming

    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.type = 'sawtooth'; // Obnoxious sound
      oscillator.frequency.setValueAtTime(200, context.currentTime); // Start low
      gainNode.gain.setValueAtTime(0, context.currentTime); // Start quiet

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start();

      audioContextRef.current = context;
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.error("Web Audio API not supported or failed:", e);
    }
  }, []);

  const stopScream = useCallback(() => {
    if (!audioContextRef.current) return;

    try {
      const context = audioContextRef.c urrent;
      const gainNode = gainNodeRef.current;
      
      // Fade out to avoid a "pop"
      gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.1);
      
      setTimeout(() => {
        oscillatorRef.current?.stop();
        gainNodeRef.current?.disconnect();
        oscillatorRef.current?.disconnect();
        context.close();

        audioContextRef.current = null;
        oscillatorRef.current = null;
        gainNodeRef.current = null;
      }, 150); // Give time for fade out
    } catch (e) {
      console.error("Error stopping scream:", e);
    }
  }, []);

  const updateScream = useCallback((volume) => { // volume 0-100
    if (!audioContextRef.current) return;

    const context = audioContextRef.current;
    const oscillator = oscillatorRef.current;
    const gainNode = gainNodeRef.current;

    // Pitch: 200Hz (low) to 1200Hz (high)
    const frequency = (volume * 10) + 200;
    // Loudness: 0 to 0.5 (1.0 is too loud)
    const gain = volume / 200; 

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gainNode.gain.setValueAtTime(gain, context.currentTime);
  }, []);

  // Short burst of sound for button clicks
  const playScreamBurst = useCallback((volume) => {
    startScream();
    updateScream(volume);
    setTimeout(() => {
      stopScream();
    }, 150); // Play for 150ms
  }, [startScream, stopScream, updateScream]);
  
  // Ensure audio context is closed on unmount
  useEffect(() => {
    return () => {
      stopScream();
    };
  }, [stopScream]);

  return { startScream, stopScream, updateScream, playScreamBurst };
};

/**
 * The main component for the "Worst UI" competition.
 * This is the default export.
 */
export default function App() {
  // --- State ---
  const [volume, setVolume] = useState(DEFAULT_VOLUME); // The "actual" volume (0-100)
  const [waldoPositions, setWaldoPositions] = useState({ plus: null, minus: null });

  // --- Refs ---
  const lastInteractionTimeRef = useRef(Date.now());
  const fighterIntervalRef = useRef(null);

  // --- Hooks ---
  const { startScream, stopScream, updateScream, playScreamBurst } = useScream();

  // --- "Liar" Slider ---
  // The slider's value is the "display" value, which is the inverse of the real volume.
  const displayVolume = 100 - volume;
  
  const handleSliderChange = (e) => {
    const newDisplayVolume = parseInt(e.target.value, 10);
    const newActualVolume = 100 - newDisplayVolume;
    
    setVolume(newActualVolume);
    updateScream(newActualVolume); // Update scream pitch/loudness
    lastInteractionTimeRef.current = Date.now(); // Record interaction for "Fighter"
  };

  // --- "Where's Waldo" ---
  // Set random positions on component mount
  useEffect(() => {
    setWaldoPositions({
      plus: getRandomPosition(),
      minus: getRandomPosition(),
    });
  }, []);

  const handleWaldoClick = (amount) => {
    setVolume(prevVolume => {
      const newVolume = Math.max(0, Math.min(100, prevVolume + amount));
      playScreamBurst(newVolume); // Play short sound
      lastInteractionTimeRef.current = Date.now(); // Record interaction
      return newVolume;
    });
  };

  // --- "Fighter" ---
  // Set up an interval to check if it should "fight" back
  useEffect(() => {
    fighterIntervalRef.current = setInterval(() => {
      const now = Date.now();
      if (now - lastInteractionTimeRef.current > FIGHTER_DELAY) {
        // Time to fight back!
        setVolume(prevVolume => {
          if (prevVolume > DEFAULT_VOLUME) {
            playScreamBurst(prevVolume - 1);
            return prevVolume - 1;
          } else if (prevVolume < DEFAULT_VOLUME) {
            playScreamBurst(prevVolume + 1);
            return prevVolume + 1;
          }
          return prevVolume; // Already at default
        });
      }
    }, FIGHTER_SPEED);

    // Clean up interval on unmount
    return () => {
      clearInterval(fighterIntervalRef.current);
    };
  }, [playScreamBurst]); // Empty dependency array, runs once on mount

  // --- "Scream" ---
  // Update scream pitch whenever "Fighter" changes the volume
  useEffect(() => {
    updateScream(volume);
  }, [volume, updateScream]);
  

  // --- Render ---
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-900 text-white font-sans p-4 relative overflow-hidden">
      
      {/* Main Control Box */}
      <div
        className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 z-10 transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${volume - 50}vh) rotate(${(volume - 50) * 1.8}deg)`,
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">Volume Control</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          "Adjust the volume... if you dare!"
        </p>
        
        {/* The "Liar" Slider with "Scream" and "Fighter" mechanics */}
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={displayVolume} // "Liar"
            onInput={handleSliderChange} // Real-time update for "Scream"
            onMouseDown={startScream} // "Scream"
            onMouseUp={stopScream} // "Scream"
            onTouchStart={startScream}
            onTouchEnd={stopScream}
            className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer range-thumb"
            style={{
              // Custom thumb styling to show it works
              '--thumb-color': `rgb(${255 - volume * 2.5}, ${volume * 2.5}, 0)`,
            }}
          />
          {/* Custom CSS for the thumb color */}
          <style>{`
            .range-thumb::-webkit-slider-thumb {
              background-color: var(--thumb-color);
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border: 2px solid white;
              cursor: grab;
            }
            .range-thumb::-moz-range-thumb {
              background-color: var(--thumb-color);
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border: 2px solid white;
              cursor: grab;
            }
          `}</style>
        </div>

        <div className="text-center text-5xl font-mono mt-6">
          {volume}
        </div>
      </div>

      {/* "Where's Waldo" Plus Button */}
      {waldoPositions.plus && (
        <button
          onClick={() => handleWaldoClick(-5)}
          className="absolute z-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-400 active:scale-90 transition-all"
          style={{
            top: waldoPositions.plus.top,
            left: waldoPositions.plus.left,
          }}
          aria-label="Increase volume slightly"
        >
          <Plus size={12} />
        </button>
      )}

      {/* "Where's Waldo" Minus Button */}
      {waldoPositions.minus && (
        <button
          onClick={() => handleWaldoClick(5)}
          className="absolute z-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-400 active:scale-90 transition-all"
          style={{
            top: waldoPositions.minus.top,
            left: waldoPositions.minus.left,
          }}
          aria-label="Decrease volume slightly"
        >
          <Minus size={12} />
        </button>
      )}
    </div>
  );
}



