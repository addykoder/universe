"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';

// Helper function to format dates
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Helper to get the midpoint date
const getMidpoint = (start, end) => {
  const midTime = (start.getTime() + end.getTime()) / 2;
  return new Date(midTime);
};

// Define our initial broad date range
const earliestDate = new Date('1900-01-01T00:00:00Z');
const latestDate = new Date(); // Today

// This is the main component
export default function App() {
  // State for the current search range
  const [range, setRange] = useState({ start: earliestDate, end: latestDate });
  
  // State for the current date the app is guessing
  const [currentGuess, setCurrentGuess] = useState(getMidpoint(earliestDate, latestDate));
  
  // State for the step count
  const [step, setStep] = useState(1);
  
  // State for when the date is finally found
  const [foundDate, setFoundDate] = useState(null);

  // Re-calculate guess if the range changes
  useEffect(() => {
    // Check if the range has narrowed to a single day
    if (range.start.getTime() >= range.end.getTime()) {
      setFoundDate(range.start);
    } else {
      setCurrentGuess(getMidpoint(range.start, range.end));
    }
  }, [range]);

  // Handle "Before" click
  const handleBefore = () => {
    // New end date is the day before the guess
    const newEnd = new Date(currentGuess.getTime() - 86400000); // Subtract 1 day
    setRange(prev => ({ ...prev, end: newEnd }));
    setStep(s => s + 1);
  };

  // Handle "After" click
  const handleAfter = () => {
    // New start date is the day after the guess
    const newStart = new Date(currentGuess.getTime() + 86400000); // Add 1 day
    setRange(prev => ({ ...prev, start: newStart }));
    setStep(s => s + 1);
  };
  
  // Handle reset
  const handleReset = () => {
    setRange({ start: earliestDate, end: latestDate });
    setStep(1);
    setFoundDate(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8 flex flex-col items-center justify-center font-sans">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg text-center">
        
        <h1 className="text-3xl font-bold mb-2">The Birthday Interrogator</h1>
        
        {!foundDate ? (
          <>
            <p className="text-gray-400 mb-6">
              We'll find your birthday... eventually.
            </p>
            <p className="text-xl font-semibold mb-4 text-yellow-400">
              Question #{step}
            </p>
            
            <p className="text-lg text-gray-300 mb-4">Were you born before or after:</p>
            
            {/* Guessed Date */}
            <div className="bg-gray-700 p-4 rounded-lg text-3xl font-mono tracking-wide shadow-inner mb-8">
              {formatDate(currentGuess)}
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={handleBefore}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all"
              >
                <ArrowLeft />
                <span>Before</span>
              </button>
              <button
                onClick={handleAfter}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all"
              >
                <ArrowRight />
                <span>After</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-400 mb-6">
              After {step} grueling questions, we've found it!
            </p>
            
            <p className="text-lg text-gray-300 mb-4">Your birthday is:</p>
            
            {/* Found Date */}
            <div className="bg-green-800 p-4 rounded-lg text-4xl font-mono tracking-wide shadow-inner mb-8 text-green-100">
              {formatDate(foundDate)}
            </div>
            
            <p className="text-lg text-gray-300 mb-6">Is this correct?</p>
            
            {/* Confirmation Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => alert("Great! We won't save this, of course.")}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-green-600 hover:bg-green-500 text-white transition-all"
              >
                <Check />
                <span>Yes, that's it!</span>
              </button>
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-red-600 hover:bg-red-500 text-white transition-all"
              >
                <X />
                <span>No, start over.</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
