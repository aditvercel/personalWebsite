"use client"; // Ensures client-side rendering

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import cmsNavbar from "@/public/data/cmsNavbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function CMSlayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const pathname = usePathname();
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure(); // Controls the login modal
  const toast = useToast();
  const { data: session } = useSession(); // Get session data to check login state

  // Disable login button if username or password is empty
  const isLoginDisabled = !loginData.userName || !loginData.password;

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  // Handle login form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  function openAppOrPlayStore() {
    const appUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.example.myapp";

    // Coba buka aplikasi
    window.location.href = appUrl;

    // Set timer untuk cek apakah aplikasi terbuka
    setTimeout(() => {
      // Jika masih di halaman yang sama, arahkan ke Play Store
      if (document.hidden) {
        window.location.href = playStoreUrl;
      }
    }, 1000);
  }

  // Handle login form submission
  const handleLogin = async () => {
    // Show loading toast
    const loadingToastId = toast({
      title: "Logging in...",
      status: "loading",
      duration: null, // Keeps the toast open until manually closed
      isClosable: true,
    });
    try {
      // Use NextAuth's signIn function
      const result = await signIn("credentials", {
        redirect: false,
        userName: loginData.userName,
        password: loginData.password,
      });

      // Close loading toast
      toast.close(loadingToastId);

      if (result.error) {
        throw new Error(result.error);
      }

      // Show success toast
      toast({
        title: "Login successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose(); // Close the modal after login
    } catch (error) {
      // Close loading toast
      toast.close(loadingToastId);

      // Show error toast
      toast({
        title: "Login failed.",
        description: error.message || "Invalid credentials.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <div className="grid gap-5 md:hidden text-white items-center align-middle justify-center font-bold text-5xl">
        <p className=" text-red-500"> CMS not accessable ! </p>
        your viewport to small
        <button onClick={openAppOrPlayStore}>test deep link</button>
      </div>
      <div className="hidden md:flex">
        <div className="absolute w-full h-full left-0 top-[120px]">
          <div className="relative">
            <div className="h-full w-full flex gap-x-10 pb-5 relative">
              {/* Drawer */}
              <div className="relative">
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
                      {cmsNavbar.map((item) =>
                        item.child && item.child.length > 0 ? (
                          <AccordionItem key={crypto.randomUUID()}>
                            <AccordionButton className="flex items-center justify-start p-0">
                              <div className="flex items-center space-x-2">
                                <div
                                  className="text-xl cursor-pointer"
                                  onClick={openDrawer}
                                >
                                  <Image
                                    src={item.icon}
                                    alt={"quote icon"}
                                    width={25}
                                    height={25}
                                    className="inline-block"
                                  />
                                </div>
                                {isOpen && (
                                  <span
                                    className="flex-grow text-[14px]"
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
                                {item.child.map((itemChild) => (
                                  <Link
                                    href={itemChild.link}
                                    key={crypto.randomUUID()}
                                    className={`bg-white flex items-center mb-3 cursor-pointer ${
                                      pathname === itemChild.link
                                        ? "text-blue-500"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      className="text-xl cursor-pointer"
                                      onClick={openDrawer}
                                    >
                                      <Image
                                        src={itemChild.icon}
                                        alt={"quote icon"}
                                        width={18}
                                        height={18}
                                        className="inline-block"
                                      />
                                    </div>
                                    {isOpen && (
                                      <span className="ml-2">
                                        {itemChild.childName}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </AccordionPanel>
                          </AccordionItem>
                        ) : (
                          <Link key={crypto.randomUUID()} href={item.link}>
                            <div
                              className={`bg-white flex items-center text-start ${
                                pathname === item.link ? "text-blue-500" : ""
                              }`}
                              style={{ fontWeight: 600 }}
                            >
                              <div
                                className="text-xl cursor-pointer"
                                onClick={openDrawer}
                              >
                                <Image
                                  src={item.icon}
                                  alt={"quote icon"}
                                  width={25}
                                  height={25}
                                  className="inline-block"
                                />
                              </div>
                              {isOpen && (
                                <span className="ml-2">{item.parentName}</span>
                              )}
                            </div>
                          </Link>
                        )
                      )}
                    </Accordion>

                    <div className="flex items-center justify-center">
                      {session ? (
                        <Button
                          className="relative text-center mt-5 w-full mb-20"
                          onClick={() => signOut()}
                        >
                          LOGOUT
                        </Button>
                      ) : (
                        <Button
                          className="relative text-center mt-5 w-full mb-20"
                          onClick={onOpen}
                        >
                          LOGIN
                        </Button>
                      )}
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

          {/* Login Modal */}
          <Modal isOpen={isModalOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="userName" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="userName"
                    value={loginData.userName}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="password" isRequired mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleLogin}
                  isDisabled={isLoginDisabled} // Disable if username or password is empty
                >
                  Login
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
