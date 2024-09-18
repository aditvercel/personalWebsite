"use client";
import React from "react";
import { Input } from "@chakra-ui/react";
import ChakraWrapper from "../utils/ChakraWrapper";

export default function SendMeMail() {
  return (
    <ChakraWrapper>
      <div className="gap-x-1 relative left-[-20px] mt-7 border border-black w-[400px] p-2">
        <div className="text-md font-bold">Send me a message</div>
        <div>
          <Input placeholder="Basic usage" />
        </div>
      </div>
    </ChakraWrapper>
  );
}
