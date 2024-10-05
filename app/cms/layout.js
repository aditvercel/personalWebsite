"use client"; // Ensures client-side rendering

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import cmsNavbar from "@/public/data/cmsNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Replacing useRouter with usePathname

export default function CMSlayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path using usePathname

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  return (
    <div className="absolute w-full h-full left-0 top-[120px]">
      <div className="relative">
        <div className="h-full w-full flex gap-x-10 pb-5 relative">
          {/* Drawer */}
          <div className="relative">
            {/* Drawer Content */}
            <div
              className={`h-[420px] flex flex-col items-center overflow-y-scroll bg-white transition-all duration-300 ease-in-out sticky top-[70px] z-10
              ${isOpen ? "w-64" : "w-20"}`}
            >
              <button
                className="absolute top-4 right-0 bg-gray-300 rounded-full p-2 z-10 text-black w-8 h-8 flex items-center justify-center"
                onClick={toggleDrawer}
              >
                {isOpen ? "<" : ">"}
              </button>

              <div className="mt-20 text-black h-full">
                <Accordion
                  allowToggle
                  className="gap-[20px] grid text-sm justify-center p-0"
                >
                  {cmsNavbar.map((item, index) => {
                    return item.child && item.child.length > 0 ? (
                      <AccordionItem key={index}>
                        <AccordionButton className="flex items-center justify-center p-0">
                          <div className="flex items-center justify-center">
                            <div
                              className="text-xl cursor-pointer"
                              onClick={openDrawer}
                            >
                              📄
                            </div>
                            {isOpen && (
                              <span
                                className="flex-grow text-center"
                                style={{ fontWeight: 600 }}
                              >
                                {item.parentName}
                              </span>
                            )}
                          </div>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <div className="mt-5">
                            {item.child.map((itemChild, index) => (
                              <Link
                                href={itemChild.link}
                                key={index}
                                className={`bg-white flex text-start items-center align-middle mb-3 cursor-pointer  ${
                                  pathname === itemChild.link
                                    ? "text-blue-500" // Change color if the link matches the current path
                                    : ""
                                }`}
                              >
                                <div
                                  className="text-xl cursor-pointer"
                                  onClick={openDrawer}
                                >
                                  📄
                                </div>
                                {isOpen && <span>{itemChild.childName}</span>}
                              </Link>
                            ))}
                          </div>
                        </AccordionPanel>
                      </AccordionItem>
                    ) : (
                      <Link key={index} href={item.link}>
                        <div
                          className={`bg-white flex items-center text-center ${
                            pathname === item.link
                              ? "text-blue-500" // Change color if the link matches the current path
                              : ""
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          <div
                            className="text-xl cursor-pointer"
                            onClick={openDrawer}
                          >
                            📄
                          </div>
                          {isOpen && <span>{item.parentName}</span>}
                        </div>
                      </Link>
                    );
                  })}
                </Accordion>

                <div className="flex items-center justify-center">
                  <Button className="relative text-center mt-5 w-full mb-20">
                    LOGIN
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full px-5 max-w-[90%] overflow-hidden">
            <div className="rounded-xl shadow-md shadow-black w-full p-5 text-black">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
