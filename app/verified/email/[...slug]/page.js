"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use next/navigation in App Router
import { useToast, Box, Heading, Spinner, Text, Icon } from "@chakra-ui/react";
import { MdCheckCircle, MdError } from "react-icons/md"; // Check and Error icons
import api from "@/utils/axiosInstance";

export default function Page() {
  const { slug } = useParams(); // Destructure directly from useParams
  const [detail, setDetail] = useState(""); // State to store response data
  const toast = useToast(); // Chakra UI's useToast hook

  const getVerified = async () => {
    try {
      let res = await api.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/sendMail`,
        { id: slug }
      );
      if (res && res.data.statusCode === 200) {
        setDetail("success");
        toast({
          title: "Verification Successful",
          description: "Email verification was successful! Messages are sent.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setDetail("failed");
        toast({
          title: "Verification Failed",
          description: "Verification failed! Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setDetail("failed");
      toast({
        title: "An Error Occurred",
        description: "An error occurred while verifying the email.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getVerified();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading mb={4}>Verification Result</Heading>
      {detail === "success" && (
        <Box textAlign="center" color="green.500">
          <Icon as={MdCheckCircle} boxSize={8} />
          <Text mt={2}>Success</Text>
        </Box>
      )}
      {detail === "failed" && (
        <Box textAlign="center" color="red.500">
          <Icon as={MdError} boxSize={8} />
          <Text mt={2}>Failed</Text>
        </Box>
      )}
      {detail === "" && (
        <Box textAlign="center">
          <Spinner size="lg" />
          <Text mt={2}>Loading...</Text>
        </Box>
      )}
    </Box>
  );
}
