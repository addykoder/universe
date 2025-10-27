"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Key, Lock, Unlock, XCircle } from 'lucide-react';

// Helper to generate a random position
const getRandomPosition = () => {
  const top = Math.random() * 80 + 10; // 10% to 90%
  const left = Math.random() * 80 + 10; // 10% to 90%
  return { top: `${top}%`, left: `${left}%` };
};

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

// Define our 5 keys
const initialKeyIds = [1, 2, 3, 4, 5];
const RESET_TIMER_DURATION = 30000; // 30 seconds

// This is the main component
export default function App() {
  // State to hold the *initial* positions of all keys
  const [keyPositions, setKeyPositions] = useState([]);
  
  // State to track which keys have been "found" (dropped on the lock)
  const [foundKeys, setFoundKeys] = useState(new Set());

  // State for a success message
  const [submitted, setSubmitted] = useState(false);

  // --- New States for Added Features ---

  // State for the button's random position (Moving Target)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  
  // State for visual feedback on wrong key (Wrong Key Order)
  const [isShaking, setIsShaking] = useState(false);
  
  // State to show the timer
  const [timeLeft, setTimeLeft] = useState(RESET_TIMER_DURATION / 1000);
  
  // State for the *random* key order
  const [requiredOrder, setRequiredOrder] = useState([]);

  // --- Refs for Intervals/Timeouts ---
  const buttonMoveIntervalRef = useRef(null); // For moving the button
  const resetTimerRef = useRef(null); // For the 30-second reset
  const countdownIntervalRef = useRef(null); // For the visual countdown

  // --- Logic ---

  // Check if the button should be unlocked
  const isUnlocked = foundKeys.size === initialKeyIds.length;

  // --- Timer Functions (Timed Reset) ---

  const stopAllTimers = () => {
    if (buttonMoveIntervalRef.current) clearInterval(buttonMoveIntervalRef.current);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const startTimers = () => {
    stopAllTimers(); // Clear any existing timers first

    // Start the 30-second doom timer
    resetTimerRef.current = setTimeout(() => {
      resetProgress();
    }, RESET_TIMER_DURATION);

    // Start the visual countdown
    setTimeLeft(RESET_TIMER_DURATION / 1000);
    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // --- Progress Reset Function ---
  const resetProgress = () => {
    setFoundKeys(new Set());
    // Show a shake animation on the card
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
    // Restart timers
    startTimers();
  };

  // --- Initial Setup ---
  useEffect(() => {
    // Generate random positions for the keys
    setKeyPositions(
      initialKeyIds.map(id => ({
        id,
        ...getRandomPosition()
      }))
    );
    
    // Create the random order
    setRequiredOrder(shuffleArray([...initialKeyIds]));

    // Start the timers
    startTimers();
    
    // Cleanup on unmount
    return () => stopAllTimers();
  }, []); // Empty array ensures this runs only once

  // --- Moving Target Logic ---
  useEffect(() => {
    if (isUnlocked) {
      // Stop moving and reset position if unlocked
      if (buttonMoveIntervalRef.current) {
        clearInterval(buttonMoveIntervalRef.current);
      }
      setButtonPosition({ x: 0, y: 0 });
      // Stop all timers on success
      stopAllTimers();
    } else {
      // Start moving if locked
      buttonMoveIntervalRef.current = setInterval(() => {
        // Max movement: 80px horizontal, 20px vertical
        const newX = (Math.random() - 0.5) * 160; 
        const newY = (Math.random() - 0.5) * 40;
        setButtonPosition({ x: newX, y: newY });
      }, 1500); // Move every 1.5 seconds
    }
    
    return () => clearInterval(buttonMoveIntervalRef.current); // Cleanup
  }, [isUnlocked]); // Re-run when lock state changes

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e, keyId) => {
    e.dataTransfer.setData("keyId", keyId.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isUnlocked) return; // Don't do anything if already unlocked

    const keyId = parseInt(e.dataTransfer.getData("keyId"), 10);

    // Not a valid key
    if (!keyId || !initialKeyIds.includes(keyId)) return;

    // --- Wrong Key Order Logic ---
    // The expected key is the one at the index of how many keys we've found
    const expectedKeyId = requiredOrder[foundKeys.size];

    if (keyId === expectedKeyId) {
      // Correct key!
      setFoundKeys(prevFoundKeys => new Set(prevFoundKeys).add(keyId));
      // ** TIMER IS NO LONGER RESET HERE **
    } else if (!foundKeys.has(keyId)) {
      // Wrong key! Reset progress.
      resetProgress();
    }
    // If they drop a key they've already found, do nothing.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUnlocked) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-gray-200 p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden">
        
        {/* --- The Keys --- */}
        {keyPositions.map((key) => {
          if (foundKeys.has(key.id)) {
            return null; // Key is "found", don't render it
          }
          return (
            <div
              key={key.id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, key.id)}
              className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 shadow-lg cursor-grab active:cursor-grabbing transition-all hover:scale-110 animate-float"
              style={{ 
                top: key.top, 
                left: key.left, 
                zIndex: 10,
                animationDelay: `${key.id * 0.5}s` // Desync animations
              }}
              title={`Key ${key.id}`}
            >
              <Key className="w-10 h-10 text-yellow-400 absolute opacity-30" />
              <span className="relative text-lg font-bold text-white">{key.id}</span>
            </div>
          );
        })}

        {/* --- The Form and Button --- */}
        <div 
          className={`text-center bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 z-0 relative ${isShaking ? 'animate-shake' : ''}`}
        >
          {!isUnlocked && (
            <div className="absolute top-4 right-4 bg-red-800 text-red-100 text-sm font-mono rounded-full px-3 py-1 flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              <span>Reset in: {timeLeft}s</span>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">The "Quest" Submit</h1>
          <p className="text-gray-400 mb-6">
            Find all the keys and drag them to the lock. <br />
            <strong className="text-yellow-400">Required order: {requiredOrder.join(', ')}</strong>
          </p>

          {/* A fake form area */}
          <div className="space-y-4 mb-8">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <input type="text" id="username" className="w-full bg-gray-700 rounded-md border-gray-600 p-2" defaultValue="BraveAdventurer" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <input type="password" id="password" className="w-full bg-gray-700 rounded-md border-gray-600 p-2" defaultValue="••••••••" />
            </div>
          </div>

          {/* --- The Lock/Submit Button --- */}
          <button
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleSubmit}
            disabled={!isUnlocked}
            // --- Moving Target Style ---
            style={{
              transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`
            }}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg
              text-xl font-semibold transition-all duration-300
              relative // Needed for transform
              ${isUnlocked
                ? 'bg-green-600 hover:bg-green-500 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-400 cursor-default'
              }
              ${!isUnlocked && 'border-2 border-dashed border-gray-500 transition-transform duration-500 ease-in-out'}
            `}
          >
            {isUnlocked ? (
              <Unlock className="w-6 h-6" />
            ) : (
              <Lock className="w-6 h-6" />
            )}
            <span>
              {isUnlocked ? 'Submit' : `Locked (${foundKeys.size}/${initialKeyIds.length})`}
            </span>
          </button>

          {submitted && (
            <p className="mt-4 text-green-400 text-lg">
              Congratulations! You submitted the form! (Not really)
            </p>
          )}
        </div>
      </div>
      
      {/* --- CSS for Animations --- */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          50% { transform: translateX(10px); }
          75% { transform: translateX(-10px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes float {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(-5px, -10px); }
          100% { transform: translate(0px, 0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

