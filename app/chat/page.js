"use client";

import { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react"; // Import signIn from NextAuth
import api from "@/utils/axiosInstance"; // Assuming encrypt is defined
import { decrypt } from "@/utils/axiosInstance";

const roomNames = ["General", "Business", "Tech"];
const rooms = ["general", "random", "tech"]; // These should match with the API or backend

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState(rooms[0]); // Default room
  const messageEndRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch message history for the selected room
    const fetchHistory = async () => {
      try {
        const response = await api.get(`/api/chat/history?room=${room}`);
        const messages = JSON.parse(decrypt(response.data.messages));

        console.log(messages);
        setMessages(messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();

    // Subscribe to Pusher for real-time updates
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(`room-${room}`);
    channel.bind("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusher.unsubscribe(`room-${room}`);
    };
  }, [room]);

  useEffect(() => {
    if (isAtBottom) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  // useEffect(() => {
  //   console.log("session :", session);
  // }, [session]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    // Encrypt the message before sending
    const encryptedData = {
      sender: session?.user?.name || "",
      content: message,
      image: session?.user.image || "",
      room,
    };

    // Send the message to the backend
    await api.post("/api/pusher", {
      ...encryptedData,
    });

    setMessage(""); // Clear the input after sending
  };

  const getHours = (theDate) => {
    const timestamp = theDate;
    const date = new Date(timestamp);
    const hour = String(date.getUTCHours()).padStart(2, "0");
    const minute = String(date.getUTCMinutes()).padStart(2, "0");
    const time = `${hour}:${minute}`;
    return time;
  };

  return (
    <>
      <div>
        <div className="grid gap-5 md:hidden text-white items-center align-middle justify-center font-bold text-5xl">
          <p className=" text-red-500"> Chat not accessable ! </p>
          Its only supported on tablet or pc for now
        </div>
        <div className="hidden md:flex ">
          <div className="absolute w-full h-full left-0 top-[120px]">
            <div className="relative">
              <div className="h-full w-full flex gap-x-10 pb-5 relative">
                {/* Drawer */}
                <div className="relative">
                  <div
                    className={`h-full w-[200px] flex flex-col items-center scrollbar-hide bg-white transition-all duration-300 ease-in-out z-10 p-2`}
                  >
                    <div className="mt-20 text-black h-full">
                      <div className="grid items-center justify-center">
                        {roomNames.map((name, index) => (
                          <Button
                            key={index}
                            onClick={() => setRoom(rooms[index])}
                            variant={
                              room === rooms[index] ? "solid" : "outline"
                            }
                            className="mb-2 w-full"
                          >
                            {name}
                          </Button>
                        ))}
                      </div>
                      {/* Google Sign-In Button */}
                      {!session ? (
                        <Button
                          onClick={() => signIn("google")} // Call Google sign-in
                          variant="outline"
                          className="mt-auto w-full mb-2"
                        >
                          Sign in with Google
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                            className=" w-5 h-5 ml-1"
                          ></img>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => signOut()} // Call Google sign-in
                          variant="outline"
                          className="mt-auto w-full mb-2"
                        >
                          Sign Out
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="w-full px-5 max-w-[90%] overflow-hidden bg-white p-5">
                  <div className="mb-2 text-xl font-bold">
                    {roomNames[rooms.indexOf(room)]}
                  </div>
                  <Box
                    p={2}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                    className="w-full border border-black"
                  >
                    <VStack spacing={4} align="stretch">
                      {/* Message List */}
                      <Box
                        h="300px"
                        overflowY="auto"
                        p={4}
                        bg="#424549"
                        borderRadius="md"
                        borderWidth="1px"
                        onScroll={handleScroll}
                        className="scrollbar-hide"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                        }}
                      >
                        <div className="grid gap-y-3 items-start">
                          {messages.map((msg, index) => (
                            <div
                              key={index}
                              className={`w-full gap-[5px] flex ${
                                msg.sender === session?.user.name
                                  ? "text-left justify-end items-end flex-row"
                                  : "text-left justify-end items-end flex-row-reverse"
                              }`}
                            >
                              <div
                                className={` div-2  px-2 py-2 relative inline-block rounded-lg w-fit 
                                ${
                                  msg.sender === session?.user.name
                                    ? "bg-[#e2ffc7] rounded-br-none"
                                    : "bg-white rounded-bl-none"
                                }
                                `}
                              >
                                <div
                                  className={`${
                                    msg.sender === session?.user.name
                                      ? "text-left"
                                      : "text-left"
                                  } text-left text-red-400 font-medium mr-10`}
                                >
                                  {msg.sender}
                                </div>
                                <div className="relative">
                                  <div className="text-left text-sm text-black mt-2 max-w-[450px]">
                                    {msg.content}
                                  </div>

                                  <div className="relative text-xs mt-1 text-end">
                                    {getHours(msg.timestamp)}
                                  </div>
                                </div>
                              </div>
                              {msg.image ? (
                                <img
                                  src={msg.image}
                                  alt="Profile"
                                  className="h-[40px] w-[40px] rounded-full cursor-pointer"
                                  referrerpolicy="no-referrer"
                                />
                              ) : (
                                <div className=" text-xs h-[40px] w-[40px] rounded-full cursor-pointer flex items-center justify-center bg-gray-200">
                                  No Image
                                </div>
                              )}
                            </div>
                          ))}

                          {/* Empty div to scroll to */}
                          <div ref={messageEndRef} />
                        </div>
                      </Box>

                      {/* Message Input */}
                      <HStack spacing={4}>
                        <Input
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button
                          colorScheme="blue"
                          isDisabled={!session}
                          onClick={sendMessage}
                        >
                          Send
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
