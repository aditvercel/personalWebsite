"use client";
import React from "react";
import { useState, useEffect } from "react";

function ScrollOnTop() {
  const [visible, setVisible] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Show button after scrolling 300px
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[50px] right-[50px] w-10 h-10 p-3 bg-blue-500 text-white rounded-full shadow-lg ${
        visible ? "block" : "hidden"
      }`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}

export default ScrollOnTop;
