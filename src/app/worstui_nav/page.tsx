"use client";
import React, { useState, useEffect } from 'react';
import { Home, User, Mail, Briefcase, X, Check } from 'lucide-react';

// --- 3. Custom Modal Component ---
// We can't use alert() or confirm(), so we build a custom (and annoying) one.
function CustomConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-gray-900 border-4 border-yellow-400">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-500 mb-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Hold on a second!</h3>
          <p className="text-lg text-gray-700 mb-8">{message}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-gray-200 text-gray-800 px-5 py-3 font-semibold hover:bg-gray-300 transition-all active:scale-95"
          >
            <X size={20} />
            Nevermind
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-green-600 text-white px-5 py-3 font-semibold hover:bg-green-700 transition-all active:scale-95"
          >
            <Check size={20} />
            Yes, I'm Sure!
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 2. The "Runaway" Link Component ---
function RunawayLink({ children, href, icon: Icon, startPos }) {
  const [position, setPosition] = useState(startPos);
  const [confirmStep, setConfirmStep] = useState(0); // 0 = off, 1, 2, 3

  const confirmationMessages = [
    "Are you sure you want to go here? It's a big decision.",
    "Like, *really* sure? This feels impulsive. Think about your future.",
    "Okay, fine. On your head be it. Don't say I didn't warn you...",
  ];

  // Function to make the link "run"
  const runAway = () => {
    // 80% chance to run away (20% chance to stay still)
    if (Math.random() > 0.2) {
      const newTop = Math.random() * 85; // 85vh to not go off-bottom
      const newLeft = Math.random() * 85; // 85vw to not go off-right
      setPosition({ top: `${newTop}vh`, left: `${newLeft}vw` });
    }
    // 10% chance it stays still, allowing a click
  };

  // Handle the click (if the user is lucky)
  const handleClick = (e) => {
    e.preventDefault(); // Stop navigation
    setConfirmStep(1); // Start the confirmation cascade
  };

  const handleConfirm = () => {
    if (confirmStep < 3) {
      setConfirmStep(step => step + 1);
    } else {
      // Final confirmation
      console.log(`Okay, "navigating" to ${href}. Not really.`);
      setConfirmStep(0);
      runAway(); // Make it run away *after* all that effort
    }
  };

  const handleCancel = () => {
    setConfirmStep(0);
  };

  return (
    <>
      <a
        href={href}
        onMouseEnter={runAway}
        onClick={handleClick}
        className="absolute flex items-center gap-3 px-5 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 animate-float"
        style={{
          top: position.top,
          left: position.left,
          transition: 'top 0.3s ease, left 0.3s ease',
        }}
      >
        <Icon size={20} />
        {children}
      </a>
      
      <CustomConfirmModal
        isOpen={confirmStep > 0}
        message={confirmationMessages[confirmStep - 1]}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

// --- 1. Main App Component ---
// This is the default export
export default function App() {
  const links = [
    { text: 'Home', href: '/home', icon: Home, startPos: { top: '10vh', left: '10vw' } },
    { text: 'About', href: '/about', icon: User, startPos: { top: '10vh', left: '30vw' } },
    { text: 'Contact', href: '/contact', icon: Mail, startPos: { top: '10vh', left: '50vw' } },
    { text: 'Careers', href: '/careers', icon: Briefcase, startPos: { top: '10vh', left: '70vw' } },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden p-8">
      {/* Add keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center max-w-2xl mx-auto z-0">
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-300">Our Links Are... Shy.</h1>
        <p className="text-xl text-gray-400">
          Go on. Try to befriend them. Good luck.
        </p>
        <p className="text-sm text-gray-600 mt-4">
          (We've heard they only stay still 20% of the time. We think that's a lie.)
        </p>
      </div>

      {/* The Navigation "Bar" */}
      <nav>
        {links.map((link) => (
          <RunawayLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            startPos={link.startPos}
          >
            {link.text}
          </RunawayLink>
        ))}
      </nav>
    </div>
  );
}

