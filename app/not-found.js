"use client";
import React from "react";
import errorLogo from "@/public/icons/404_fall.svg";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function notfound() {
  useEffect(() => {
    // Scroll to the bottom when the page is loaded
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="grid justify-center align-middle items-center text-center">
        {/* <p className=" text-xl font-bold font">you are at the wrong page</p> */}
        <div className="flex justify-center align-middle items-center">
          <Link href={"/"}>
            <Image src={errorLogo} />
          </Link>
        </div>
      </div>
    </>
  );
}
