"use client";
import { useState } from "react";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle drawer open/close
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute w-full h-full border border-red-500 left-0 top-0 pt-[120px]">
      <div className="h-[100vw] w-full border border-green">
        {/* Drawer */}
        <div
          className={`relative bg-white h-full transition-width duration-300 ${
            isOpen ? "w-64" : "w-20"
          }`}
        >
          {/* Drawer Toggle Button */}
          <button
            className="absolute top-4 right-[-10px] bg-gray-300 rounded-full px-2 py-1"
            onClick={toggleDrawer}
          >
            {isOpen ? "<" : ">"}
          </button>

          {/* Drawer Content */}
          <div className="h-full flex flex-col items-center">
            {isOpen ? (
              // Full Drawer Menu when open
              <div className="mt-10">
                <ul>
                  <li className="py-2">Menu Item 1</li>
                  <li className="py-2">Menu Item 2</li>
                  <li className="py-2">Menu Item 3</li>
                </ul>
              </div>
            ) : (
              // Icon-only when closed
              <div className="mt-10 flex flex-col items-center">
                <div className="mb-4">🔍</div>
                <div className="mb-4">📄</div>
                <div className="mb-4">⚙️</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
