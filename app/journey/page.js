"use client";
import { StepNumber } from "@chakra-ui/react";
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
          setHomePageDatas((prev) => ({
            ...prev,
            journeyDatas: res.data.result.map((item) => {
              const date = new Date(item.year);
              const formattedDate = date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return {
                title: formattedDate,
                // cardTitle: item.title_1,
                url: item.image,
                cardSubtitle: item.description_1,
                cardDetailedText:
                  "Deserunt amet nulla nisi cillum aliquip exercitation nisi mollit. Sit reprehenderit aliqua consequat ad deserunt nulla proident adipisicing irure eu consectetur. Pariatur Lorem laborum et proident eiusmod adipisicing elit ex officia. Tempor incididunt ut cillum aliquip pariatur aliquip non sunt irure cupidatat.",
                media: {
                  type: "IMAGE",
                  source: {
                    url: item.image,
                  },
                },
              };
            }),
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
        />
      )}
    </div>
  );
}
