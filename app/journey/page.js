"use client";

import React, { useState, useEffect } from "react";
import api from "@/utils/axiosInstance";
import { Chrono } from "react-chrono";

export default function Page() {
  const [homePageDatas, setHomePageDatas] = useState({
    journeyDatas: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res] = await Promise.all([
          api.get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/journey`),
        ]);

        if (res.data.statusCode === 200) {
          const transformedJourneyData = transformJourneyData(res.data.result);
          setHomePageDatas((prev) => ({
            ...prev,
            journeyDatas: transformedJourneyData,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, []); // Add dependencies as necessary

  // Move the data transformation logic to a separate function
  const transformJourneyData = (data) => {
    return data
      .map((item) => {
        const date = new Date(item.year);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return {
          title: formattedDate,
          textTitle: item.title_1,
          url: item.image,
          cardSubtitle: item.description_1,
          media: {
            type: "IMAGE",
            source: {
              url: item.image,
            },
          },
          year: date,
        };
      })
      .sort((a, b) => b.year - a.year); // Sort by year with the most recent first
  };
  return (
    <div className="w-full">
      {homePageDatas.journeyDatas.length > 1 && (
        <Chrono
          items={homePageDatas?.journeyDatas}
          mode="VERTICAL_ALTERNATING"
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
          cardWidth={650}
          cardHeight={300}
          scrollable
          disableToolbar
        >
          {homePageDatas.journeyDatas.map((item) => (
            <div
              key={crypto.randomUUID()}
              className=" text-black grid align-middle justify-center self-center text-center"
            >
              <div className=" text-center font-medium text-[16px]">
                {item.textTitle}
              </div>
              <div className="mt-5">
                <div dangerouslySetInnerHTML={{ __html: item.cardSubtitle }} />
              </div>
            </div>
          ))}
        </Chrono>
      )}
    </div>
  );
}
