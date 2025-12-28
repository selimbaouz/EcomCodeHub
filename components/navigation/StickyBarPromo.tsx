"use client";
import { useState } from "react";

const StickyBarPromo = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("NEWYEAR30");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-primary w-full h-10 text-white flex items-center justify-center font-medium relative overflow-hidden">
      <div className="flex items-center gap-3">
        {/* Message */}
        <span className="font-semibold text-sm">Get 30% OFF with code</span>

        {/* Code Promo Button */}
        <button
          onClick={handleCopyCode}
          className="relative bg-background hover:bg-yellow-400 text-primary font-bold text-sm px-3 py-1 rounded border-2 border-yellow-400 transition-all duration-200 active:scale-95 flex items-center gap-1.5"
        >
          NEWYEAR30
          {/* Icon - Change between copy and check */}
          {copied ? (
            <svg
              className="w-3.5 h-3.5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default StickyBarPromo;
