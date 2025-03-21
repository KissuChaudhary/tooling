// components/PopupMessage.tsx
"use client"; // Add this line at the top

import { useState, useEffect } from "react";

const PopupMessage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg shadow-lg relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Hey there!</h2>
        <p className="text-gray-700 mb-4">
          Sorry about this, but I’ve been hit with some serious spam attacks.  
          Feels like nobody wants this service running for free, huh?  
          I’m working on it, and things should be back soon. Thanks for your patience!
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
