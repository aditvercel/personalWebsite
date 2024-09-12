"use client";
import Image from "next/image";
import photosaya from "@/public/images/photo_saya.png";
export default function Home() {
  return (
    <>
      <div className="flex justify-between align-middle items-center">
        <div className="w-[500px]">
          <div className="mb-3">hello everyone...</div>
          <div className=" text-4xl mb-5 font-bold text-[#2799cb]">
            I&apos;m Aditya Marzuk
          </div>
          <p>
            Est ipsum Lorem occaecat sit minim officia anim ad reprehenderit.
            Excepteur minim mollit officia duis. Velit aliquip qui labore irure
            laboris. Consequat et aliquip tempor est consequat labore aute enim
          </p>
        </div>
        <div className="bg-white relative rounded-md shadow-md shadow-black top-5">
          <div className=" absolute w-full h-full top-2 bg-[#8b8c92] -z-10 left-2 rounded-md"></div>
          <Image src={photosaya} alt="me" width={210} height={200} />
        </div>
      </div>

      <div id="pricing">download CV</div>

      <div className="mt-10 w-full bg-red-500 px-10 py-5 grid grid-cols-3 justify-center items-center align-middle gap-5 rounded-lg">
        <div className="bg-black grid p-2 gap-10">
          <div>Icon</div>
          <div>title</div>
          <div>description</div>
        </div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
        <div className="bg-black h-24"></div>
      </div>
    </>
  );
}
