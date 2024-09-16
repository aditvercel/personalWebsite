"use client";
import React, { useState } from "react";
import Image from "next/image";
import photosaya from "@/public/images/photo_saya.png";
import ButtonFilled from "./components/buttons/buttonFilled.js";
import aboutDatas from "@/public/data/aboutData";
import {
  Button,
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import ScrollOnTop from "./components/utils/ScrollOnTop.js";
import LatestProjectCards from "./components/cards/latestProjectCards.js";
import { AnimatePresence } from "framer-motion";
import WorkSolutionCards from "./components/cards/WorkSolutionCards.js";
import Link from "next/link.js";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const cardData = [
    { id: 1, category: "Web Development", content: "Web Dev Card 1" },
    { id: 2, category: "Mobile App", content: "Mobile App Card 1" },
    { id: 3, category: "Graphic Design", content: "Motion Card 1" },
    { id: 4, category: "Graphic Design", content: "Graphic Design Card 1" },
    { id: 5, category: "Web Development", content: "Web Dev Card 2" },
    { id: 6, category: "Web Development", content: "Web Dev Card 3" },
  ];

  const filteredCards = cardData.filter(
    (card) => selectedFilter === "All" || card.category === selectedFilter
  );

  const handleFilterClick = (category) => {
    setSelectedFilter(category);
  };

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = "/data/pdf/aditya_frontend.pdf"; // Correct path to the PDF
    link.download = "aditya_frontend.pdf"; // Filename to download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  return (
    <>
      <ScrollOnTop />
      {/* circle light  */}
      <div className="w-[500px] h-[500px] absolute top-[160px] left-[-150px] -z-30 rounded-full circleLight"></div>
      <div className="w-[500px] h-[500px] absolute top-[100px] right-[0px] -z-30 rounded-full circleLight"></div>
      <div className="w-[500px] h-[500px] absolute top-[800px] right-[0px] -z-30 rounded-full circleLight"></div>
      {/* circle light  */}
      {/* About content*/}
      <div className="flex justify-between align-middle items-center">
        <div className="w-[500px]">
          <div className="bg-[#0f1628] relative rounded-md top-5 flex md:hidden shadow-sm shadow-white items-center align-middle justify-center overflow-hidden h-[180px] mb-10">
            <div className="relative top-5">
              <Image src={photosaya} alt="me" width={210} height={200} />
            </div>
          </div>
          <div className="mb-3">hello everyone...</div>
          <div className=" text-4xl mb-5 font-bold textLight">
            I&apos;m Aditya Marzuk
          </div>
          <p>
            Est ipsum Lorem occaecat sit minim officia anim ad reprehenderit.
            Excepteur minim mollit officia duis. Velit aliquip qui labore irure
            laboris. Consequat et aliquip tempor est consequat labore aute enim
          </p>
        </div>
        <div className="bg-[#0f1628] relative rounded-md shadow-md shadow-black top-5 hidden md:flex">
          <div className=" absolute w-full h-full top-2 bg-[#8b8c92] -z-10 left-2 rounded-md"></div>
          <Image src={photosaya} alt="me" width={210} height={200} />
        </div>
      </div>
      <div className="flex gap-5 mt-10 md:mt-0">
        <Button onClick={handleDownload}>
          <ButtonFilled title="Download CV" color="#00ffffaf" />
        </Button>
        <a
          href="https://teer.id/aditya_marzuk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonFilled
            title="Buy me a Coffe"
            color="#ffde07"
            textTitleColor="black"
          />
        </a>
      </div>

      <div className="mt-10 w-full bg-[#131b2e] p-2 md:p-10 grid md:grid-cols-3 grid-cols-2 justify-center items-center align-middle gap-5 rounded-lg border-[10px] border-[#111a2d]">
        {aboutDatas.map((item, index) => (
          <div className=" grid p-2 rounded-md mb-5 min-h-[150px]" key={index}>
            <div className="flex align-middle justify-center md:justify-start">
              <div className="mb-5 w-10 h-10 bg-white rounded-full p-2">
                {item.icon}
              </div>
            </div>
            <div className=" justify-center items-center md:justify-start flex">
              <div className="font-bold max-w-[100px] text-gray-300 text-center md:text-left">
                {item.title}
              </div>
            </div>
            <div className=" justify-center items-center flex">
              <div className=" text-[10px] pt-2 text-center md:text-left">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* About content*/}

      {/* Latest project content  */}
      <div className=" mt-16  items-center grid justify-center align-middle py-5">
        <div className=" text-center grid items-center justify-center">
          <div className="font-bold text-4xl textLight">My Latest Project</div>
          <div className=" mt-5 md:w-[400px] ">
            The convention is the main event of the year for professionals in
            the world of design and architecture
          </div>
        </div>
        <div className="mt-10 flex items-center align-middle justify-center overflow-x-scroll md:overflow-hidden">
          <div className="w-[1300px] pl-[500px] md:pl-0 flex items-center justify-center align-middle self-center">
            <div className="flex items-center align-middle gap-2 lg:gap-5 justify-center w-[1500px] md:max-w-full self-center">
              {[
                "All",
                "Web Development",
                "Mobile App",
                "Motion",
                "Graphic Design",
              ].map((category) => (
                <div
                  key={category}
                  className={`border border-blue-300 py-2 px-4 rounded-3xl md:min-w-[100px]  min-w-[150px] text-center ${
                    selectedFilter === category
                      ? "bg-blue-500 text-white"
                      : "bg-[#0f1628] text-blue-300"
                  } 
              
                `}
                  onClick={() => handleFilterClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 ">
          <div className="grid grid-cols-2 md:grid-cols-3 align-middle justify-center items-center gap-y-2 md:gap-x-3 md:gap-y-5">
            <AnimatePresence>
              {filteredCards.map((item, index) => (
                <LatestProjectCards key={index} item={item} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Latest project content  */}

      <div className=" mt-16 items-center grid justify-center align-middle self-center py-5">
        <div className="flex justify-center align-middle">
          <div className="font-bold text-4xl textLight md:w-[480px] text-center">
            The best work solution,
            <br />
            for the best price.
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-x-5">
          <WorkSolutionCards
            title="Standard"
            price={600000}
            discount={10 / 100}
            whatYouGet={[
              "2 Days delivery time",
              "1 pages",
              "1 Revisions",
              "static website",
              "Design Customization",
              "Content Upload",
              "Responsive Design",
              "Source Code",
            ]}
          />
          <WorkSolutionCards
            popular={true}
            title="Business"
            price={1500000}
            discount={10 / 100}
            whatYouGet={[
              "3 Days delivery time",
              "3 pages",
              "3 Revisions",
              "static website",
              "Design Customization",
              "Content Upload",
              "Responsive Design",
              "Source Code",
            ]}
          />
          <WorkSolutionCards
            premium={true}
            title="Enterprise"
            price={5000000}
            discount={10 / 100}
            whatYouGet={[
              "3 Days delivery time",
              "5 pages",
              "3 Revisions",
              "Dynamic website",
              "Design Customization",
              "Content Upload",
              "Responsive Design",
              "Source Code",
            ]}
          />
        </div>
      </div>

      {/* Latest project */}

      <div className=" mt-16  justify-center  py-5">
        <div>
          <div className="font-bold text-4xl textLight text-center">FAQs</div>
          <div className="m-w-full">
            <Accordion allowMultiple className="gap-y-5 grid mt-10 ">
              {cardData.map((item, index) => {
                return (
                  <AccordionItem
                    className="border-y border-[#131b2e] py-5"
                    key={index}
                  >
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              className=" font-medium text-lg text-gray-300"
                            >
                              Section 1 title
                            </Box>
                            {isExpanded ? (
                              <div className="p-2 rounded-full border border-black h-10 w-10 flex items-center justify-center bg-[#0fbbcf]">
                                <MinusIcon fontSize="12px" color={"black"} />
                              </div>
                            ) : (
                              <div className="p-2 rounded-full border border-[#3c556c] h-10 w-10 flex items-center justify-center ">
                                <AddIcon fontSize="12px" color={"#3c556c"} />
                              </div>
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} className="mt-10 max-w-[90%]">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>

      <div className=" mt-16  justify-center  py-5">
        <div>
          <div className="font-bold text-4xl textLight text-center">
            Testimonials
          </div>
        </div>
      </div>
    </>
  );
}
