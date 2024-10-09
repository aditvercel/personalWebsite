"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import JoditInput from "@/app/components/input/JoditInput";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react"; // Chakra UI toast

const CreatePage = () => {
  const [isDisabled, setISdisabled] = useState({
    save: true, // Initially disabled
    edit: false,
    add: false,
  });

  const changeIsdisabled = (name, value) => {
    setISdisabled((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [detail, setDetail] = useState({
    createdAt: "",
    description_1: "",
    description_2: "",
    image: "",
    title_1: "",
    updatedAt: "",
    year: "",
    imageName: "",
  });

  const router = useRouter(); // For navigation
  const toast = useToast(); // Chakra UI toast hook

  // Disable the Save button if any detail field is empty
  useEffect(() => {
    let body = {
      description_1: detail.description_1,
      description_2: detail.description_2,
      image: detail.image,
      imageName: detail.imageName,
      title_1: detail.title_1,
      year: detail.year,
    };
    const isFormValid = Object.values(body).every(
      (value) => value.trim() !== ""
    );
    changeIsdisabled("save", !isFormValid);
  }, [detail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    changeIsdisabled("save", true);
    let body = {
      description_1: detail.description_1,
      description_2: detail.description_2,
      image: detail.image,
      imageName: detail.imageName,
      title_1: detail.title_1,
      year: detail.year,
    };

    // Show loading toast
    const toastId = toast({
      title: "Creating...",
      description: "Your query is being created.",
      status: "loading",
      duration: null, // Keep loading until action finishes
      isClosable: false,
    });

    try {
      let res = await api.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/query/create`,
        body
      );
      if (res && res.data.statusCode === 200) {
        // Close the loading toast and show success toast
        changeIsdisabled("save", false);
        toast.update(toastId, {
          title: "Creation Successful",
          description: "Your query has been created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            router.back(); // Navigate back only when the toast is closed
          },
        });
      } else {
        // Show error toast
        changeIsdisabled("save", false);
        toast.update(toastId, {
          title: "Creation Failed",
          description: "Something went wrong during creation.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Show error toast
      changeIsdisabled("save", false);
      toast.update(toastId, {
        title: "Error",
        description: "An error occurred while creating the query.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="relative">
      <IStoolbar
        save={handleSubmit} // Attach save action to the handleSubmit function
        back
        title="Create query"
        disabled={isDisabled.save} // Disable save if form is invalid
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className="w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="title_1"
            placeholder="Write your full name"
            value={detail.title_1}
            required
            label="Title"
          />
          <ISinput
            onChange={handleInputChange}
            type="date"
            name="year"
            placeholder="Write your full name"
            required
            label="Date"
            value={detail.year}
          />
          <JoditInput
            tabIndex={3} // tabIndex of textarea
            name="description_1"
            label="Description 1"
            required
            value={detail.description_1}
            onBlur={(newContent) => {
              setDetail((item) => {
                return { ...item, description_1: newContent };
              });
            }}
          />
          <JoditInput
            tabIndex={3}
            name="description_2"
            label="Description 2"
            required
            value={detail.description_2}
            onBlur={(newContent) => {
              setDetail((item) => {
                return { ...item, description_2: newContent };
              });
            }}
          />
        </div>
        <ImagesInput
          onChange={(fileName, base64) => {
            setDetail((prev) => ({
              ...prev,
              image: base64,
              imageName: fileName,
            }));
          }}
          type="image"
          name="image"
          label="Image"
          value={detail}
        />
      </div>
    </div>
  );
};

export default CreatePage;
