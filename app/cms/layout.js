"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import cmsNavbar from "@/public/data/cmsNavbar";

export default function CMSlayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle drawer open/close
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute w-full h-full left-0 top-[120px]">
      <div className="relative">
        <div className="h-full w-full flex gap-x-10 pb-5 relative">
          {/* Drawer */}
          <div className="relative">
            {/* Drawer Content */}
            <div
              className={`h-[420px] flex flex-col items-center overflow-y-scroll bg-white transition-all duration-300 ease-in-out sticky top-10 z-10
              ${isOpen ? "w-64" : "w-20"}
              `}
            >
              <button
                className="absolute top-4 right-[0px] bg-gray-300 rounded-full p-2 z-10 text-black w-8 h-8 flex align-middle items-center justify-center"
                onClick={toggleDrawer}
              >
                {isOpen ? "<" : ">"}
              </button>
              {isOpen ? (
                // Full Drawer Menu when open
                <div className="mt-20 text-black h-full">
                  <Accordion allowToggle className="gap-3 grid text-sm">
                    {cmsNavbar.map((item, index) => {
                      return item.child && item.child.length > 0 ? (
                        <AccordionItem key={index}>
                          <AccordionButton>
                            <span
                              className="flex-grow text-center mb-2"
                              style={{ fontWeight: 600 }}
                            >
                              {item.parentName}
                            </span>

                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <ul className="gap-2 grid">
                              {item.child.map((itemChild, index) => (
                                <li key={index}>{itemChild.childName}</li>
                              ))}
                            </ul>
                          </AccordionPanel>
                        </AccordionItem>
                      ) : (
                        <div key={index}>
                          <Button
                            className="bg-white"
                            style={{ fontWeight: 600 }}
                          >
                            {item.parentName}
                          </Button>
                        </div>
                      );
                    })}
                  </Accordion>

                  <div className="flex items-center justify-center">
                    <Button className=" relative bottom-[-20px] left-0 right-0 m-auto text-center mt-5 w-full mb-20">
                      LOGIN
                    </Button>
                  </div>
                </div>
              ) : (
                // Icon-only when closed
                <div className="mt-20 flex flex-col items-center text-black">
                  <div className="mb-4">📄</div>
                  <div className="mb-4">📄</div>
                  <div className="mb-4">📄</div>
                  <div className="mb-4">📄</div>
                  <div className="mb-4">📄</div>
                  <div className="mb-4">🔍</div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full px-5 pr-5 max-w-[90%]">
            <div className="rounded-xl shadow-md shadow-black w-full p-5 text-black">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
