"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useParams } from "next/navigation"; // Use next/navigation in App Router
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import api from "@/utils/axiosInstance";
import JoditInput from "@/app/components/input/JoditInput";
import { useToast } from "@chakra-ui/react"; // Chakra UI toast

const UpdatePage = () => {
  const params = useParams();
  const { slug } = params; // Access slug directly from params
  const router = useRouter(); // Router for navigation
  const toast = useToast(); // Chakra UI toast hook

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const getDetail = async () => {
    try {
      let res = await api.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/journey/getById?id=${slug}`
      );
      if (res && res.data.statusCode === 200) {
        setDetail(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleSave = async () => {
    let body = {
      id: slug,
      description_1: detail.description_1,
      description_2: detail.description_2,
      image: detail.image,
      imageName: detail.imageName,
      title_1: detail.title_1,
      year: detail.year,
    };

    // Show loading toast
    const toastId = toast({
      title: "Updating...",
      description: "Your update is in progress.",
      status: "loading",
      duration: null, // Keep loading until action finishes
      isClosable: false,
    });

    try {
      let res = await api.put(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/journey`,
        body
      );
      if (res && res.data.statusCode === 200) {
        // Close the loading toast and show success toast
        toast.update(toastId, {
          title: "Update Successful",
          description: "Your data has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          onCloseComplete: () => {
            router.back(); // Navigate back only when the toast is closed
          },
        });
      } else {
        // Show error toast
        toast.update(toastId, {
          title: "Update Failed",
          description: "Something went wrong during the update.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Show error toast
      toast.update(toastId, {
        title: "Error",
        description: "An error occurred while updating.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="relative">
      <IStoolbar save={handleSave} back title="Update Home manager" />
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
            tabIndex={3}
            name="description_1"
            label="Description 1"
            required
            value={detail.description_1}
            onBlur={(newContent) =>
              setDetail((prev) => ({ ...prev, description_1: newContent }))
            }
          />
          <JoditInput
            tabIndex={3}
            name="description_2"
            label="Description 2"
            required
            value={detail.description_2}
            onBlur={(newContent) =>
              setDetail((prev) => ({ ...prev, description_2: newContent }))
            }
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

export default UpdatePage;
