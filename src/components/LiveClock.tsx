"use client";

import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the time every second
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Format the time and date
  const time = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const date = currentTime.toLocaleDateString([], { day: '2-digit', month: 'long' });
  const weekday = currentTime.toLocaleDateString([], { weekday: 'long' });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl hover:bg-black p-6 text-center">
      <p className="text-5xl font-extralight text-white tabular-nums tracking-wider">
        {time}
      </p>
      <p className="text-lg text-slate-400 mt-2">
        {date}, <span className='text-[var(--accent)]'>{weekday}</span>
      </p>
    </div>
  );
}
