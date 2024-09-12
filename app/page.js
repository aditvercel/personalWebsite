"use client";
import Image from "next/image";
import photosaya from "@/public/images/photo_saya.png";
import ButtonFilled from "../app/components/buttonFilled.js";
import aboutDatas from "@/public/data/aboutData";
import { Button } from "@chakra-ui/react";
export default function Home() {
  return (
    <>
      {/* circle light  */}
      <div className="w-[500px] h-[500px] absolute top-[160px] left-[-150px] -z-30 rounded-full circleLight"></div>
      <div className="w-[500px] h-[500px] absolute top-[100px] right-[0px] -z-30 rounded-full circleLight"></div>
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
      {/* 
      <div id="pricing">download CV</div> */}
      <Button className="hidden md:flex">
        <ButtonFilled title="Download CV" />
      </Button>

      <div className="mt-10 w-full bg-[#131b2e] p-2 md:p-10 grid md:grid-cols-3 grid-cols-2 justify-center items-center align-middle gap-5 rounded-lg border-[10px] border-[#111a2d]">
        {aboutDatas.map((item, index) => {
          return (
            <>
              <div
                className="grid p-2 rounded-md mb-5 min-h-[150px]"
                key={index}
              >
                <div className="mb-5 w-10 h-10 bg-white rounded-full p-2">
                  {item.icon}
                </div>
                <div className="font-bold max-w-[100px]">{item.title}</div>
                <div className=" text-[10px]">{item.description}</div>
              </div>
            </>
          );
        })}
      </div>
      {/* About content*/}

      {/* lattest project content  */}
      <div className=" mt-10">
        <div className=" text-center grid items-center justify-center">
          <div className="font-bold text-2xl textLight">My Latest Project</div>
          <div className=" mt-5 min-w-[150px]">
            The convention is the main event of the year for professionals in
            the world of design and architecture
          </div>
        </div>
      </div>
    </>
  );
}
