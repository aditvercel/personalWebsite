"use client";
import React from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { formatCurrencyIDR } from "../utils/formatCurrency";

function WorkSolutionCards(props) {
  const finalPriceProduct = props.price - props.price * props.discount || 0;
  const phoneNumber = "6282320664029"; // Your phone number with country code
  const message = `Hello, I would like to know more about your ${
    props.title
  } service
Price: ${formatCurrencyIDR(finalPriceProduct)}
List of Benefits:
${props.whatYouGet.map((item) => `* ${item}`).join("\n")}

I want to ask you about...
`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <>
      <div className="mt-10 w-full bg-[#131b2e] py-5 px-5 gap-5 rounded-lg border-[10px] border-[#111a2d] min-w-[300px]">
        <div className=" rounded-md mb-5 ">
          <div className="flex justify-between align-middle items-center ">
            <div className=" font-bold text-2xl text-gray-300">
              {props.title || "Title"}
            </div>
            {props.statusType === "POPULAR" && (
              <div className="px-3 py-1 rounded-full bg-[#75eebf] text-black">
                Popular
              </div>
            )}
            {props.statusType === "PREMIUM" && (
              <div className="px-3 py-1 rounded-full bg-[#f3706a] text-black">
                Premium
              </div>
            )}
          </div>
          <div className="items-center md:justify-start flex">
            <div className=" font-medium mt-3 text-left">
              {props.bestFor || "Best for personal use"}
            </div>
          </div>
          <div>
            <div className="font-medium pt-2 overflow-hidden text-ellipsis whitespace-wrap line-clamp-2">
              {props.description ||
                "Lorem ipsum Enim tempor ea nostrud duis ad ut officia quis voluptate velit aute. Enim duis cillum occaecat fugiat irure laboris cillum"}
            </div>
          </div>
          <div className="flex mt-5 justify-between">
            <button className="px-2 font-medium py-1 rounded-full border-[#13a5d4] border w-[100px] text-center">
              Buy service
            </button>

            <a href={url} target="_blank" rel="noopener noreferrer">
              <button className="py-1 border-b border-[#13a5d4]">
                Ask me a question
              </button>
            </a>
          </div>

          <div className="font-medium mt-5 px-2 py-1 rounded-full border-gray-900 border  text-center shadow shadow-[#0f1628]"></div>
          <div className="mt-5">
            <div className="flex gap-5 items-baseline">
              {props.discount ? (
                <div className=" font-medium text-lg text-[#fd435d]">
                  {formatCurrencyIDR(finalPriceProduct)}
                </div>
              ) : (
                <div className=" font-medium text-lg">
                  {formatCurrencyIDR(props.price || 0)}
                </div>
              )}
              {props.discount && (
                <div className=" font-medium text-sm line-through">
                  {formatCurrencyIDR(props.price || 0)}
                </div>
              )}
            </div>
            <div className=" font-bold">What you get :</div>
            <div className="mt-3 grid pl-5 gap-y-3 font-medium">
              {props.whatYouGet?.map((item, index) => (
                <div
                  className="flex gap-2 align-middle items-center"
                  key={index}
                >
                  <div className="rounded-full w-4 h-4 bg-[#13a5d4] justify-center flex items-center">
                    <CheckIcon w={10} color={"black"} />
                  </div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkSolutionCards;
