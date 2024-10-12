"use client";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react"; // Import useToast
import Image from "next/image";
import marz_logo from "@/public/images/logo.png";
import ISinput from "../input/ISinput";
import ButtonFilled from "../buttons/buttonFilled";
import api from "@/utils/axiosInstance"; // Import your Axios instance

export default function Footer() {
  const toast = useToast(); // Initialize the toast
  const [letsConnectForm, setLetsConnectForm] = useState({
    fullName: "",
    email: {
      emaill: "",
      isValid: false,
    },
    message: "",
  });

  // useEffect(() => {
  //   console.log("Form state updated:", letsConnectForm);
  // }, [letsConnectForm]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, isValid } = e.target;
    console.log(name, value, isValid);
    name === "email"
      ? setLetsConnectForm((prev) => ({
          ...prev,
          email: {
            emaill: value,
            isValid: isValid,
          },
        }))
      : setLetsConnectForm((prev) => ({
          ...prev,
          [name]: value,
        }));
  };

  const isFormValid =
    letsConnectForm.fullName &&
    letsConnectForm.email.isValid &&
    letsConnectForm.message;

  // Send the email using the API endpoint
  const handleSendEmail = async () => {
    let body = {
      fullName: letsConnectForm.fullName,
      email: letsConnectForm.email.emaill,
      message: letsConnectForm.message,
    };

    // Toast indicating the email is being sent
    toast({
      title: "Sending Email...",
      description: "Please wait while we send your message.",
      status: "info",
      duration: 3000, // Duration in milliseconds
      isClosable: true,
    });

    if (isFormValid) {
      try {
        const response = await api.post("/api/sendMail", body);
        if (response.status === 200) {
          // Success toast
          toast({
            title: "Email sent.",
            description: response.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          // Reset the form after successful submission
          setLetsConnectForm({
            fullName: "",
            email: {
              emaill: "",
              isValid: false,
            },
            message: "",
          });
        } else {
          // Error toast
          toast({
            title: "Error.",
            description:
              response.data.message ||
              "There was an error sending your message.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error sending email:", error);
        // Error toast
        toast({
          title: "Failed to send email.",
          description: "Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      // Warning toast
      toast({
        title: "Invalid input.",
        description: "Please fill in all the fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="mt-10">
      <div className="w-full bg-[#131b2e] p-2 md:px-10 md:py-5 gap-5 rounded-3xl border-[10px] border-[#111a2d] flex flex-col-reverse md:flex-row justify-between">
        <div className="align-middle flex items-center self-center relative top-[-10px]">
          <div>
            <div className="flex gap-x-1 items-center align-middle relative left-[-20px]">
              <Image src={marz_logo} alt="marz logo" width={80} />
              <div className="text-lg text-gray-300 font-bold">MMZ</div>
            </div>
            <div className="text-[10px] max-w-[350px] relative top-[-10px]">
              We excel in creating cutting-edge websites and web applications.
              Our expert team combines the latest technologies with a
              user-focused approach to deliver high-performance, tailored
              solutions that drive business success and enhance digital
              experiences.
            </div>
            <div className="font-bold">Address</div>
            <div className="text-[10px]">
              Jakarta Pusat, DKI Jakarta 10220, Indonesia
            </div>
            <div className="text-[10px] mt-3 underline">
              Created by @adityamms
            </div>
          </div>
        </div>

        <div className="gap-x-1 md:relative md:left-[40px] border border-white p-2 md:p-5 rounded-lg shadow-black shadow-md md:max-w-full md:min-w-[450px]">
          <div className="flex justify-between">
            <div className="text-lg font-bold p-2 text-white">
              Le&apos;s connect
            </div>
            <ButtonFilled
              title="SEND"
              disabled={!isFormValid}
              onClick={handleSendEmail}
            />
          </div>

          <div className="grid gap-3 mt-3">
            <ISinput
              onChange={handleInputChange}
              type="text"
              name="fullName"
              placeholder="Write your full name"
              noNumber
              noSymbol
              noSyntax
              required
              label="Full name"
              value={letsConnectForm.fullName}
            />

            <ISinput
              onChange={handleInputChange}
              type="email"
              name="email"
              placeholder="Write your email..."
              required
              label="Email"
              value={letsConnectForm.email.emaill}
            />

            <ISinput
              onChange={handleInputChange}
              type="textarea"
              name="message"
              placeholder="Write your messages..."
              required
              label="Messages"
              value={letsConnectForm.message}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
