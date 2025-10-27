"use client";
import React, { useState, useEffect } from 'react';

// Helper function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Create an array of numbers [0, 1, 2, ... 9]
const initialIndices = Array.from({ length: 10 }, (_, i) => i);

// This is the main component
export default function App() {
  // State to hold the 10 digits of the phone number
  const [digits, setDigits] = useState(Array(10).fill(0));
  
  // State to hold the shuffled mapping.
  // e.g., mapping[0] = 5 means slider 0 controls digit 5
  const [mapping, setMapping] = useState([]);

  // On component mount, create the random mapping
  useEffect(() => {
    setMapping(shuffleArray([...initialIndices]));
  }, []); // Empty array ensures this runs only once

  // Handle a change from any slider
  const handleSliderChange = (sliderIndex, newValue) => {
    // Find out which *actual digit* this slider is mapped to
    const digitIndexToChange = mapping[sliderIndex];
    
    // Create a new array for the state update
    const newDigits = [...digits];
    // Ensure value is an integer
    newDigits[digitIndexToChange] = parseInt(newValue, 10);
    
    setDigits(newDigits);
  };

  // Format the digits array into a (XXX) XXX-XXXX string
  const formatPhoneNumber = () => {
    const d = digits;
    if (d.length < 10) return "(???) ???-????"; // Fallback for initial render
    return `(${d[0]}${d[1]}${d[2]}) ${d[3]}${d[4]}${d[5]}-${d[6]}${d[7]}${d[8]}${d[9]}`;
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8 flex flex-col items-center justify-center font-sans">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-2">The "Shell Game" Phone Input</h1>
        <p className="text-center text-gray-400 mb-6">We scrambled the controls. Good luck.</p>

        {/* Phone Number Display */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-700 p-4 rounded-lg text-4xl font-mono tracking-widest shadow-inner">
            {formatPhoneNumber()}
          </div>
        </div>

        {/* The Sliders */}
        <div className="flex justify-around items-end h-64 border-t border-gray-700 pt-6">
          {initialIndices.map((sliderIndex) => {
            // Get the *digit index* this slider controls
            const controlledDigitIndex = mapping[sliderIndex];
            // Get the *value* of that digit
            const sliderValue = (controlledDigitIndex !== undefined && digits[controlledDigitIndex] !== undefined)
              ? digits[controlledDigitIndex] 
              : 0;

            return (
              <div key={sliderIndex} className="flex flex-col items-center">
                <input
                  type="range"
                  min="0"
                  max="9"
                  step="1"
                  value={sliderValue}
                  onChange={(e) => handleSliderChange(sliderIndex, e.target.value)}
                  // Styling for vertical slider
                  className="w-8 h-48 appearance-none bg-gray-700 rounded-full cursor-pointer slider-vertical"
                  style={{ writingMode: 'bt-lr' }} // For vertical orientation
                />
                {/* The label span that was here has been removed */}
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS for vertical slider styling */}
      <style>{`
        .slider-vertical {
          -webkit-appearance: slider-vertical;
        }
      `}</style>
    </div>
  );
}

