"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import Image from "next/image";
import marz_logo from "@/public/images/logo.png";

export default function Footer() {
  const [renderCount, setRenderCount] = useState(0);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [fullName, setFullName] = useState("");

  const [letsConnectForm, setLetsConnectForm] = useState({
    fullName: "",
    email: "",
    messages: "",
  });
  const [isInvalidConnectForm, setIsInvalidConnectForm] = useState({
    fullName: false,
    email: false,
    messaages: false,
  });

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: "Messages ....",
  };

  const handleBlurValidationErr = (e) => {
    const { name, value } = e.target;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLetsConnectForm((prev) => {
      const newForm = { ...prev, [name]: value };

      // Validation for full name: should not contain numbers
      if (name === "fullName") {
        const hasNumber = /\d/; // Regular expression to check for numbers
        setIsInvalidConnectForm((prev) => ({
          ...prev,
          fullName: hasNumber.test(value),
        }));
      }

      // Validation for email
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsInvalidConnectForm((prev) => ({
          ...prev,
          email: emailRegex.test(value),
        }));
      }
      // console.log(newForm);
      return newForm;
    });
  };

  return (
    <div className="mt-10">
      <div className="w-full bg-[#131b2e] p-2 md:px-10 md:py-2 gap-5 rounded-3xl border-[10px] border-[#111a2d] flex justify-between">
        <div className=" align-middle flex items-center self-center relative top-[-10px]">
          <div>
            <div className="flex gap-x-1 items-center align-middle relative left-[-20px]">
              <Image src={marz_logo} alt="marz logo" width={80} />
              <div className=" text-lg text-gray-300 font-bold">MMZ</div>
            </div>
            <div className=" text-[10px] max-w-[350px] relative top-[-10px]">
              we excel in creating cutting-edge websites and web applications.
              Our expert team combines the latest technologies with a
              user-focused approach to deliver high-performance, tailored
              solutions that drive business success and enhance digital
              experiences.
            </div>
            <div className=" font-bold">Address</div>
            <div className=" text-[10px]">
              Jakarta Pusat, DKI Jakarta 10220, Indonesia
            </div>
            <div className=" text-[10px] mt-3 underline">
              Created by @adityamms
            </div>
          </div>
        </div>

        <div className="gap-x-1 relative left-[40px]  border border-white w-[500px] p-2 rounded-lg shadow-gray-300 shadow-md">
          <div className="text-lg font-bold p-2 text-white">Lets connect</div>
          <div className=" grid gap-3 mt-3">
            <Input
              variant="filled"
              placeholder="Full name"
              size="sm"
              className="rounded-lg text-black bg-white"
              errorBorderColor="red.300"
              isInvalid={
                letsConnectForm.fullName && isInvalidConnectForm.fullName
              }
              type="text"
              name="fullName"
              value={letsConnectForm.fullName}
              onChange={handleInputChange}
            />
            {letsConnectForm.fullName && isInvalidConnectForm.fullName && (
              <p className="text-red-300 relative text-xs top-[-5px]">
                invalid name
              </p>
            )}
            <Input
              variant="filled"
              placeholder="Email"
              size="sm"
              className="rounded-lg text-black bg-white"
              errorBorderColor="red.300"
              isInvalid={letsConnectForm.email && !isInvalidConnectForm.email}
              type="email"
              name="email"
              value={letsConnectForm.email}
              onChange={handleInputChange}
            />
            {letsConnectForm.email.length > 2 &&
              !isInvalidConnectForm.email && (
                <p className="text-red-300 relative text-xs top-[-5px]">
                  invalid Email Address
                </p>
              )}
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              name="email"
              onBlur={(newContent) => {
                setLetsConnectForm((item) => {
                  return { ...item, messages: newContent };
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
