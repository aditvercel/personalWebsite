"use client"; // This is crucial for client-side hooks like useRouter

import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useParams } from "next/navigation"; // Use next/navigation in App Router
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import api from "@/utils/axiosInstance";

import { useToast } from "@chakra-ui/react"; // Chakra UI toast

const UpdatePage = () => {
  const params = useParams();
  const { slug } = params; // Access slug directly from params
  const router = useRouter(); // Router for navigation
  const toast = useToast(); // Chakra UI toast hook

  const [isDisabled, setISdisabled] = useState({
    save: true, // Initially disabled
    edit: false,
    add: false,
  });

  const [detail, setDetail] = useState({
    createdAt: "",
    updatedAt: "",
    title: "",
    percentage: "",
  });

  const changeIsdisabled = (name, value) => {
    setISdisabled((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
    console.log(detail);
  };

  // const getDetail = async () => {
  //   try {
  //     let res = await api.get(
  //       `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills/getById?id=${slug}`
  //     );
  //     if (res && res.data.statusCode === 200) {
  //       setDetail(res.data.result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getDetail();
  // }, []);

  // Disable the Save button if any detail field is empty
  useEffect(() => {
    let body = {
      title: detail.title,
      percentage: detail.percentage,
    };
    const isFormValid = Object.values(body).every(
      (value) => value !== "" && value !== 0 && value !== null
    );
    changeIsdisabled("save", !isFormValid);
  }, [detail]);

  const handleSave = async () => {
    changeIsdisabled("save", true);
    let body = {
      id: slug,
      title: detail.title,
      percentage: detail.percentage,
    };

    // Show loading toast
    const toastId = toast({
      title: "Create...",
      description: "Your Data is in progress.",
      status: "loading",
      duration: null, // Keep loading until action finishes
      isClosable: false,
    });

    try {
      let res = await api.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/mySkills/create`,
        body
      );
      if (res && res.data.statusCode === 200) {
        // Close the loading toast and show success toast
        changeIsdisabled("save", false);
        toast.update(toastId, {
          title: "Data Created Successfully",
          description: "Your Data has been updated successfully.",
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
          title: "Create Data Failed",
          description: "Something went wrong during the update.",
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
        description: "An error occurred while Creating Data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="relative">
      <IStoolbar
        save={handleSave}
        back
        title="Create Skills"
        disabled={isDisabled.save} // Disable save if form is invalid
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className="w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="title"
            placeholder="Write your full name"
            value={detail.title}
            required
            label="Title"
          />
          <ISinput
            onChange={handleInputChange}
            type="number"
            name="percentage"
            placeholder="0"
            value={detail.percentage}
            required
            label="Percentage"
          />
          {/* <ISinput
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
          /> */}
        </div>

        {/* <ImagesInput
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
        /> */}
      </div>
    </div>
  );
};

export default UpdatePage;
