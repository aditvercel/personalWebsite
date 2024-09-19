"use client";
import { StepNumber } from "@chakra-ui/react";
import React, { useState } from "react";
import { Chrono } from "react-chrono";

export default function Page() {
  const items = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      cardDetailedText:
        "Men of the British Expeditionary Force (BEF) wade out to..",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg",
        },
      },
    },
  ];

  return (
    <div className="w-full">
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING" //VERTICAL_ALTERNATING
        theme={{
          primary: "#1b9bc8",
          secondary: "#2e3748",
          cardBgColor: "#ffffff",
          titleColor: "#8b8c92",
          titleColorActive: "#ffffff",
        }}
        buttonTexts={{
          first: "Jump to First",
          last: "Jump to Last",
          next: "Next",
          previous: "Previous",
        }}
        // slideShow
        // slideItemDuration={5000} // Increased to 5 seconds
        cardWidth={650}
        cardHeight={300}
        scrollable
        disableToolbar
      />
    </div>
  );
}
