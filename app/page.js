"use client";
import * as React from "react";
import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import photosaya from "@/public/images/photo_saya.png";
import ButtonFilled from "./components/buttons/buttonFilled.js";
import aboutDatas from "@/public/data/aboutData";
import skilldatas from "@/public/data/skillsData.js";
import Typewriter from "typewriter-effect";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import quoteIcon from "@/public/icons/quote-close-editor-svgrepo-com.svg";
import "@splidejs/react-splide/css/skyblue";
import api from "@/utils/axiosInstance.js";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import Footer from "./components/utils/Footer.js";
import {
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  CircularProgress,
  CircularProgressLabel,
  Center,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import ScrollOnTop from "./components/utils/ScrollOnTop.js";
import LatestProjectCards from "./components/cards/latestProjectCards.js";
import { AnimatePresence } from "framer-motion";
import WorkSolutionCards from "./components/cards/WorkSolutionCards.js";
import { Pagination, Stack, Switch } from "@mui/material";
import axios from "axios";

export default function Home() {
  const [homePageDatas, setHomePageDatas] = useState({
    packageService: [],
    faqs: [],
    mySkills: [],
    latestProject: [],
  });
  const [latestProjectQuery, setLatestProjectQuery] = useState({
    category: "All",
    page: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/packageService`
        );
        if (res.data.statusCode === 200) {
          setHomePageDatas((item) => {
            return { ...item, packageService: res.data.result };
          });
        }
        const tes = await api.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/faq`
        );
        if (tes.data.statusCode === 200) {
          setHomePageDatas((item) => {
            return { ...item, faqs: tes.data.result };
          });
        }
        const ues = await api.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills`
        );
        if (ues.data.statusCode === 200) {
          setHomePageDatas((item) => {
            return { ...item, mySkills: ues.data.result };
          });
        }

        // const tes = await api.post(
        //   `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/packageService`,
        //   {
        //     namaService: "testing_2",
        //     title_1: "testing_title_1",
        //     title_2: "testing_title_2",
        //     hargaService: 400000,
        //     stock: 12,
        //     deskripsi: "testing_deskripsi_2",
        //     whatsappLink: "whatsapplink_2",
        //     statusType: "POPULAR",
        //     benefit: [
        //       "3 Days delivery time",
        //       "3 pages",
        //       "3 Revisions",
        //       "static website",
        //       "Design Customization",
        //       "Content Upload",
        //       "Responsive Design",
        //       "Source Code",
        //     ],
        //   }
        // );

        // const tes = await api.post(
        //   `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/faq`,
        //   {
        //     title_1: "test Title",
        //     description: "test Description",
        //   }
        // );
        // const yes = await api.post(
        //   `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills`,
        //   {
        //     title: "React",
        //     percentage: 90,
        //   }
        // );
        // const wry = await api.post(
        //   `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/latestProject`,
        //   {
        //     image:
        //       "https://res.cloudinary.com/drymuerks/image/upload/v1726801891/362927132_675384167972498_3833124988285082399_n_2_-_Copy_sp2rsp.jpg",
        //     title_1: "test 1 title",
        //     description: "test 1 description",
        //     category: "Web Development",
        //   }
        // );
        const wry = await api.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/latestProject`
        );
        if (wry.data.statusCode === 200) {
          setHomePageDatas((item) => {
            return { ...item, latestProject: wry.data.result };
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log(homePageDatas);
  }, []);
  useEffect(() => {
    // see updated datas
    console.log("Updated homePageDatas", homePageDatas);
  }, [homePageDatas]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/latestProject?category=${latestProjectQuery.category}`
        );
        if (res.data.statusCode === 200) {
          setHomePageDatas((item) => {
            return { ...item, ...res.data.result };
          });
        }
      } catch (err) {}
    };
    fetchData();
  }, [latestProjectQuery]);

  const handleChangeQuery = (category) => {
    setLatestProjectQuery((item) => ({
      ...item,
      category, // Directly updating the category
    }));
    console.log(latestProjectQuery);
  };

  const splideRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const datas = [
    { image: "https://picsum.photos/200?random=1", title: "Title 1" },
    { image: "https://picsum.photos/200?random=2", title: "Title 2" },
    { image: "https://picsum.photos/200?random=3", title: "Title 3" },
    { image: "https://picsum.photos/200?random=4", title: "Title 4" },
    { image: "https://picsum.photos/200?random=5", title: "Title 5" },
    { image: "https://picsum.photos/200?random=6", title: "Title 6" },
    { image: "https://picsum.photos/200?random=7", title: "Title 7" },
    // Add more items as needed
  ];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };
  const slides = chunkArray(datas, 3);

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
      <div
        className="flex justify-between align-middle items-center"
        id="about"
      >
        <div className="w-[500px]">
          <div className="bg-[#0f1628] relative rounded-md top-5 flex md:hidden shadow-sm shadow-white items-center align-middle justify-center overflow-hidden h-[180px] mb-10">
            <div className="relative top-5">
              <Image src={photosaya} alt="me" width={210} height={200} />
            </div>
          </div>
          <div className="mb-3 h-5">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("hello everyone...")
                  .pauseFor(2500)
                  .start();
              }}
            />
          </div>
          <div className=" text-4xl mb-5 font-bold textLight">
            I&apos;m Aditya Marzuk
          </div>
          <p>
            a full-stack developer skilled in both front-end and back-end
            technologies. I design user interfaces, build server-side logic, and
            manage databases to create complete, efficient web applications. If
            you need someone who can handle all aspects of development, I`m here
            to help!
          </p>
        </div>
        <div className="bg-[#0f1628] relative rounded-md shadow-md shadow-black top-5 hidden md:flex">
          <div className=" absolute w-full h-full top-2 bg-[#8b8c92] -z-10 left-2 rounded-md"></div>
          <Image src={photosaya} alt="me" width={210} height={200} />
        </div>
      </div>
      <div className="flex gap-5 mt-10 md:mt-0">
        <div onClick={handleDownload} className=" cursor-pointer">
          <ButtonFilled title="Download CV" color="#00ffffaf" />
        </div>
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

      <div
        className="mt-10 w-full bg-[#131b2e] p-2 md:p-10 grid md:grid-cols-3 grid-cols-2 justify-center items-center align-middle gap-5 rounded-lg border-[10px] border-[#111a2d]"
        id="keys"
      >
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

      <div className=" mt-16 md:justify-center md:items-center py-5">
        <div>
          <div className="font-bold text-4xl textLight text-center md:mb-20">
            My Skill&apos;s
          </div>
          <div className="w-full grid grid-cols-3 md:grid-cols-5 mt-10 gap-x-5 md:gap-y-16 gap-y-10">
            {homePageDatas.mySkills.map((item, index) => (
              <div
                className="flex items-center justify-center align-middle relative"
                key={index}
              >
                <CircularProgress
                  key={index}
                  value={item.percentage}
                  color="teal.400" // Color of the progress ring
                  trackColor="gray.200" // Color of the track (background of the progress ring)
                  size={32}
                >
                  <CircularProgressLabel
                    color="white" // Color of the text inside the progress circle
                    className=" text-lg"
                  >
                    {item.percentage}%
                  </CircularProgressLabel>
                </CircularProgress>
                <div className="absolute bottom-[-30px] right-0 left-0 mr-auto text-lg text-center">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest project content  */}
      <div
        className=" mt-16  items-center grid justify-center align-middle py-5"
        id="latestProject"
      >
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
                // "Motion",
                "Graphic Design",
              ].map((category) => (
                <button
                  key={category}
                  className={`border border-blue-300 py-2 px-4 rounded-3xl md:min-w-[100px]  min-w-[150px] text-center ${
                    selectedFilter === category
                      ? "bg-blue-500 text-white"
                      : "bg-[#0f1628] text-blue-300"
                  }`}
                  onClick={() => handleChangeQuery(category)} // Pass category here
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 align-middle justify-center items-center gap-y-2 md:gap-x-3 md:gap-y-5">
            <AnimatePresence>
              {homePageDatas.latestProject?.map((item, index) => (
                <LatestProjectCards key={index} item={item} description title />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center justify-center align-middle mt-10">
          <Pagination
            count={200}
            color="primary"
            size="large"
            shape="rounded"
            className="bg-gray-400 rounded-lg"
          />
        </div>
      </div>
      {/* Latest project content  */}

      {/* Work solution*/}
      <div
        className=" mt-16 items-center grid justify-center align-middle self-center py-5"
        id="pricing"
      >
        <div className="flex justify-center align-middle">
          <div className="font-bold text-4xl textLight md:w-[480px] text-center">
            The best work solution,
            <br />
            for the best price.
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-x-5">
          {homePageDatas?.packageService?.map((item, index) => {
            return (
              <div key={index}>
                <WorkSolutionCards
                  title={item.title_1}
                  bestFor={item.title_2}
                  description={item.deskripsi}
                  price={item.hargaService}
                  discount={10 / 100}
                  whatYouGet={item.benefit}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Work solution*/}

      <div className=" mt-16  justify-center  py-5">
        <div>
          <div className="font-bold text-4xl textLight text-center">FAQs</div>
          <div className="m-w-full">
            <Accordion allowMultiple className="gap-y-1 grid mt-10 ">
              {homePageDatas.faqs.map((item, index) => {
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
                              {item.title_1}
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
                          {item.description}
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
      <div className="mt-16 py-5" id="testimonial">
        <div>
          <div className="font-bold text-4xl textLight text-center">
            Testimonials
          </div>
          <div>
            <Splide aria-label="My Favorite Images" ref={splideRef}>
              {slides.map((slide, index) => (
                <SplideSlide key={index}>
                  <div className="border-border-red-500 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                    {slide.map((item, itemIndex) => (
                      <div
                        className="flex items-center justify-center"
                        key={itemIndex}
                      >
                        <div className="mt-10 w-full bg-[#131b2e] py-5 px-5 gap-5 rounded-lg border-[10px] border-[#111a2d] relative h-[250px]">
                          <div className=" rounded-md mb-5 flex gap-5">
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={50}
                              height={50}
                              className=" rounded-full"
                            />
                            <div className="grid">
                              <div className=" text-md font-bold">
                                Marlian martezze
                              </div>
                              <div className=" text-xs">
                                Frontend developer at bina nusa
                              </div>
                            </div>
                          </div>
                          <div className="h-[80px] overflow-hidden text-ellipsis line-clamp-4 z-10 text-xs">
                            Ex culpa exercitation nulla magna consectetur. Ut
                            voluptate sunt nulla ipsum cupidatat esse dolore sit
                            veniam veniam esse reprehenderit cupidatat. Irure
                            irure dolor incididunt sint laborum aute proident.
                            Aute eiusmod irure sunt eiusmod. Officia anim et qui
                            ad nostrud consectetur amet commodo elit incididunt.
                            Dolore veniam anim qui nulla sint.
                          </div>
                          <Image
                            src={quoteIcon}
                            alt={"quote icon"}
                            width={50}
                            height={50}
                            className="absolute right-0 bottom-0 "
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SplideSlide>
              ))}
            </Splide>
            <div className="flex justify-center items-center gap-10 mt-10">
              <button
                className="custom-arrow prev-arrow text-black bg-white rounded-full p-2 text-center align-middle"
                onClick={() => splideRef.current.splide.go("<")}
              >
                <ChevronLeftIcon width={8} height={8} />
              </button>
              <button
                className="custom-arrow next-arrow text-black bg-white rounded-full p-2 text-center align-middle"
                onClick={() => splideRef.current.splide.go(">")}
              >
                <ChevronRightIcon width={8} height={8} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* FOOT BAR */}
      <div id="connect">
        <Footer />
      </div>
      {/* FOOT BAR */}
    </>
  );
}
