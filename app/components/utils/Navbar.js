"use client";
import Image from "next/image";
import marz_logo from "@/public/images/logo.png";
import navbarMenuData from "@/public/data/navbarMenus";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Hashtag from "@/public/icons/hashtag.svg";
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
  InputGroup,
  InputLeftElement,
  Skeleton,
} from "@chakra-ui/react";
import { Kbd } from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Search2Icon, ExternalLinkIcon } from "@chakra-ui/icons";
import ButtonFilled from "../buttons/buttonFilled";
import api from "@/utils/axiosInstance";

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

  const [isPartiallyClosed, setIsPartiallyClosed] = useState(false);
  const [queryDatas, setQueryDatas] = useState({
    items: [],
    loaded: false,
  });
  const [searchQueries, setSearchQueries] = useState("");

  const searchTimeoutRef = useRef(null); // Ref to store the timeout ID

  const fetchData = async (page = 1, query = "") => {
    setQueryDatas((prev) => {
      return { ...prev, loaded: false };
    });
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/query/all-list?page=${page}&search=${query}`
      );

      if (res.data.statusCode === 200) {
        setQueryDatas((prev) => {
          return { ...prev, items: res.data.result.items, loaded: true };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Clear the previous timeout to avoid multiple API calls
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to wait for 1 second before triggering the API call

    searchTimeoutRef.current = setTimeout(() => {
      // Trigger the fetchData function with the current page and query
      if (searchQueries) {
        fetchData(1, searchQueries);
      }
    }, 800); // 1 second delay
  }, [searchQueries]);
  // const handleClose = () => {
  //   // Trigger the drawer to "partially close"
  //   setIsPartiallyClosed(true);
  // };

  // const handleFullyOpen = () => {
  //   setIsPartiallyClosed(false);
  //   onOpen();
  // };

  // const handleClick = (index) => {
  //   setActiveIndex(index === activeIndex ? null : index); // Toggle the active state
  // };
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
  });

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
          <div className="font-extrabold text-2xl right-3 relative hidden lg:flex text-gray-300">
            MMZ
          </div>
        </Link>
        <div className=" hidden md:flex justify-evenly gap-10 text-sm">
          {navbarMenuData.map((item, index) => (
            <Menu key={crypto.randomUUID()}>
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
                <MenuList className="bg-slate-700 w-40 px-0 py-0 rounded-md grid relative shadow-md shadow-black">
                  {item.child.map((childItem, childIndex) => (
                    <Link
                      href={childItem.link}
                      key={childIndex}
                      className={` p-2 px-5 text-sm text-ellipsis items-center h-12 hover:bg-slate-600 hover:text-white align-middle flex  
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
            <span>
              <Kbd>ctrl</Kbd> <Kbd>K</Kbd>
            </span>
            {/* <span className="shadow-sm shadow-white rounded-full py-1 px-4">
              <Kbd>ctrl</Kbd> + <Kbd>k</Kbd>
            </span> */}
          </div>
          <div className="hidden md:flex">
            <ButtonFilled title="subscribe" color="#00ffffaf" disabled />
          </div>
        </div>
        <Button
          colorScheme="blue"
          onClick={onDrawerOpen}
          className="flex md:hidden p-0 text-center justify-center items-center"
          // Ensure padding is reset if you only want the icon centered
        >
          <HamburgerIcon w={30} h={30} />
        </Button>
      </div>

      <Modal
        onClose={() => {
          setQueryDatas((prev) => {
            return { ...prev, items: [] };
          });
          onSearchClose(); // Explicitly invoke the function
        }}
        isOpen={isSearchOpen}
        isCentered
        scrollBehavior="inside"
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent className="flex flex-col relative bg-[#2e3748]">
          <ModalBody className="  rounded-xl w-full h-full overflow-auto">
            <ModalCloseButton className="absolute top-[-30px] right-[-30px] border border-black rounded-full p-2 bg-black text-white" />
            <InputGroup
              variant="flushed"
              className="sticky top-0 bg-[#2e3748] z-10 "
            >
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  setSearchQueries(e.target.value);
                  console.log(searchQueries);
                }}
              />
            </InputGroup>
            <div className="w-full mt-4 p-4 cursor-pointer rounded-lg grid gap-5">
              {searchQueries && !queryDatas.loaded
                ? [...Array(3)].map((_, index) => (
                    // Skeleton loading placeholder for when the items are still loading
                    <Skeleton
                      key={crypto.randomUUID()}
                      height="80px"
                      className="min-h-[80px] w-full border shadow-black shadow-sm p-4 rounded-xl bg-[#4a5567]"
                    />
                  ))
                : queryDatas.items?.map((item, index) => (
                    <Skeleton
                      key={crypto.randomUUID()}
                      isLoaded={queryDatas.items.length > 0}
                    >
                      <Link href={item.link}>
                        <div className="min-h-[80px] w-full border shadow-black shadow-sm p-4 rounded-xl bg-[#4a5567] hover:bg-[#309794] flex justify-between align-middle text-black items-center">
                          <div className="flex gap-3">
                            <Image
                              src={Hashtag}
                              alt="hashtag_icon"
                              width={30}
                              className="text-gray-300"
                            />
                            <div className="text-gray-300">
                              <div className="text-sm">{item.top_title}</div>
                              <div className="text-lg font-medium">
                                {item.bottom_title}
                              </div>
                            </div>
                          </div>

                          <ExternalLinkIcon
                            width={15}
                            height={15}
                            className="text-gray-300"
                          />
                        </div>
                      </Link>
                    </Skeleton>
                  ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        placement="right"
        onClose={onDrawerClose}
        isOpen={isDrawerOpen || isPartiallyClosed}
        size={isPartiallyClosed ? "xs" : "md"}
        trapFocus={false}
      >
        <DrawerOverlay onClick={onDrawerClose} />
        <DrawerContent
          transform={isPartiallyClosed ? "translateX(-80%)" : "translateX(0)"}
          transition="transform 0.3s ease"
          className="w-[250px] bg-slate-700 text-black px-4 py-12"
        >
          <DrawerHeader className="text-slate-400 font-bold text-lg text-center mb-5">
            Navigation Menu
          </DrawerHeader>
          <DrawerBody>
            <div className="grid text-md gap-6 mt-5 text-slate-400">
              {navbarMenuData.map((item, index) => (
                <Menu key={crypto.randomUUID()}>
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
                          <AccordionPanel pb={4} key={childIndex}>
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
