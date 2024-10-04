"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Input, Textarea } from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import Image from "next/image";
import marz_logo from "@/public/images/logo.png";
import ISinput from "../input/ISinput";
import ButtonFilled from "../buttons/buttonFilled";

export default function Footer() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [letsConnectForm, setLetsConnectForm] = useState({
    fullName: "",
    email: "",
    messages: "",
  });

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: "Messages ....",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLetsConnectForm((prev) => {
      const newForm = { ...prev, [name]: value };
      return newForm;
    });
  };

  return (
    <div className="mt-10">
      <div className="w-full bg-[#131b2e] p-2 md:px-10 md:py-5 gap-5 rounded-3xl border-[10px] border-[#111a2d] flex flex-col-reverse md:flex-row justify-between ">
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

        <div className="gap-x-1 md:relative md:left-[40px]  border border-white p-2 md:p-5 rounded-lg shadow-black shadow-md  md:max-w-full md:min-w-[450px]">
          <div className="flex justify-between">
            <div className="text-lg font-bold p-2 text-white">Lets connect</div>
            <ButtonFilled title="SEND" />
          </div>

          <div className=" grid gap-3 mt-3">
            <ISinput
              onChange={handleInputChange}
              type="text"
              name="fullName"
              placeholder="Write your full name"
              noNumber
              noSymbol
              noSyntax
              required
              label="Full name"
            />

            <ISinput
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="Write your email..."
              noNumber
              noSyntax
              required
              label="Email"
            />
            <ISinput
              onChange={handleInputChange}
              type="textarea"
              name="messages"
              placeholder="Write your messages..."
              required
              label="Messages"
            />
            {/* <JoditEditor
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
              /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
