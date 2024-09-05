"use client";
import Image from "next/image";
import marz_logo from "@/public/images/logo.png";
import navbarMenuData from "@/public/data/navbarMenus";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Portal,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  Tooltip,
  Input,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Kbd } from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Search2Icon } from "@chakra-ui/icons";
import ButtonFilled from "./buttonFilled";

export default function Navbar() {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle the active state
  };
  const handleShortcut = (event) => {
    if (event.ctrlKey && event.key === "k") {
      onSearchOpen(true);
      event.preventDefault(); // Prevent default browser actions
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <>
      <div className="navBarSection h-[100px] align-middle flex items-center py-4 px-2 justify-between shadow-lg shadow-black">
        <Link
          href="/"
          className="iconSection flex justify-center align-middle items-center cursor-pointer"
        >
          <div>
            <Image src={marz_logo} alt="logo" width={120} height={120} />
          </div>
          <div className="font-extrabold text-2xl right-3 relative hidden lg:flex">
            MMZ
          </div>
        </Link>
        <div className=" hidden md:flex justify-evenly gap-10 text-sm">
          {navbarMenuData.map((item, index) => (
            <Menu key={index}>
              {item.link ? (
                <Link href={item.link} className={` hover:text-[#00ffff]`}>
                  {item.title}
                </Link>
              ) : (
                <MenuButton className={`hover:text-[#00ffff]`}>
                  {item.title}
                  {item.child.length ? <ChevronDownIcon /> : ""}
                </MenuButton>
              )}
              <Portal>
                <MenuList className="bg-gray-400 w-40 px-0 py-0 rounded-md grid relative shadow-md shadow-black">
                  {item.child.map((childItem, childIndex) => (
                    <Link
                      href={childItem.link}
                      key={childIndex}
                      className={`text-black p-2 px-5 text-sm text-ellipsis items-center h-12 hover:bg-slate-600 hover:text-white align-middle flex  
                      ${childIndex === 0 ? "rounded-t-md" : ""} 
                      ${
                        childIndex === item.child.length - 1
                          ? "rounded-b-md"
                          : ""
                      }`}
                    >
                      {childItem.title}
                    </Link>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          ))}
        </div>
        <div className="flex gap-10  items-center ">
          <div
            onClick={onSearchOpen}
            className="hidden lg:flex cursor-pointer gap-4 items-center"
          >
            <Tooltip label="search">
              <Search2Icon width={25} height={25} />
            </Tooltip>
            <span className="shadow-sm shadow-white rounded-full py-1 px-4">
              <Kbd>ctrl</Kbd> + <Kbd>k</Kbd>
            </span>
          </div>
          <Button className="hidden md:flex">
            <ButtonFilled title="subscribe" />
          </Button>
        </div>
        <Button
          colorScheme="blue"
          onClick={onDrawerOpen}
          className="flex md:hidden pr-10"
        >
          <HamburgerIcon w={30} h={30} />
        </Button>
      </div>

      <Modal onClose={onSearchClose} isOpen={isSearchOpen} isCentered>
        <ModalOverlay />
        <ModalContent className=" justify-center align-middle items-center flex relative top-16">
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalBody className="bg-white text-black max-h-[400px] w-[60%] px-16 py-8 rounded-xl relative">
            <ModalCloseButton className="absolute top-4 right-4 border border-black rounded-full p-2 bg-black text-white" />
            <p>test</p>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Drawer
        placement="right"
        onClose={onDrawerClose}
        isOpen={isDrawerOpen}
        size="sm"
      >
        <DrawerOverlay onClick={onDrawerClose} />
        <DrawerContent className="w-[250px] bg-slate-700 text-black px-4 py-12">
          <DrawerHeader className="text-slate-400 font-bold text-lg text-center mb-5">
            Navigation Menu
          </DrawerHeader>
          <DrawerBody>
            <div className="grid text-md gap-6 mt-5 text-slate-400">
              {navbarMenuData.map((item, index) => (
                <Menu key={index}>
                  {item.link ? (
                    <Link href={item.link} className="hover:text-[#00ffff]">
                      {item.title}
                    </Link>
                  ) : (
                    <Accordion allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton className="hover:text-[#00ffff] text-start">
                            <Box as="span" flex="1" textAlign="left">
                              {item.title}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        {item.child.map((childItem, childIndex) => (
                          <AccordionPanel pb={4}>
                            <Link
                              href={childItem.link}
                              className={`text-slate-500 p-2 px-5 text-sm text-ellipsis items-center h-12 hover:bg-slate-600 hover:text-white align-middle flex ${
                                childIndex === 0 ? "rounded-t-md" : ""
                              } ${
                                childIndex === item.child.length - 1
                                  ? "rounded-b-md"
                                  : ""
                              }`}
                            >
                              {childItem.title}
                            </Link>
                          </AccordionPanel>
                        ))}
                      </AccordionItem>
                    </Accordion>
                  )}
                </Menu>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
