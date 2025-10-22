import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string; // To allow for custom grid-spans etc.
}

/**
 * A reusable card component for the dashboard and content feeds.
 * Uses the recommended dark-on-dark styling.
 */
export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        bg-slate-900
        border border-slate-800
        rounded-xl
        shadow-lg
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}
