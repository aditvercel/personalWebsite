import React from "react";
import { Search2Icon } from "@chakra-ui/icons";

export default function ButtonFilled(props) {
  return (
    <>
      <div className="flex gap-10 justify-center items-center hover:animate-pulse">
        <div className=" font-bold text-sm p-3 rounded-md bg-[#00ffffaf] cursor-pointer text-gray-300">
          {props.title}
        </div>
      </div>
    </>
  );
}
