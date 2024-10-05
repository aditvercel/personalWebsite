"use client";
import React, { useEffect } from "react";
import errorLogo from "@/public/icons/err_404_2.svg";
import Link from "next/link";
import Image from "next/image";

export default function CmsNotFound() {
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
          <Link href={"/cms"}>
            <Image src={errorLogo} alt="error" />
          </Link>
        </div>
      </div>
    </>
  );
}
