"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import api from "@/utils/axiosInstance";

import { useToast } from "@chakra-ui/react"; // Chakra UI toast

const UpdatePage = () => {
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

  const router = useRouter(); // Router for navigation
  const toast = useToast(); // Chakra UI toast hook

  const [detail, setDetail] = useState({
    name: "",
    image: "",
    job_title: "",
    message: "",
    createdAt: "",
    updatedAt: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetail((prevDetail) => ({
      ...prevDetail,
      [name]: value, // Update the corresponding field, e.g., "category"
    }));
  };

  // const getDetail = async () => {
  //   try {
  //     let res = await api.get(
  //       `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/testimonial/getById?id=${slug}`
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
      name: detail.name,
      image: detail.image,
      job_title: detail.job_title,
      message: detail.message,
    };
    const isFormValid = Object.values(body).every(
      (value) =>
        value !== "" &&
        value !== 0 &&
        value !== null &&
        (!Array.isArray(value) || value.length > 0)
    );

    changeIsdisabled("save", !isFormValid); // Disable if the form is invalid
  }, [detail]);

  const handleSave = async () => {
    changeIsdisabled("save", true);
    let body = {
      name: detail.name,
      image: detail.image,
      job_title: detail.job_title,
      message: detail.message,
    };
    // Show loading toast
    const toastId = toast({
      title: "Creating...",
      description: "Your testimonial is being created.",
      status: "loading",
      duration: null, // Keep loading until action finishes
      isClosable: false,
    });
    try {
      let res = await api.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/testimonial/create`,
        body
      );
      if (res && res.data.statusCode === 200) {
        // Close the loading toast and show success toast
        changeIsdisabled("save", false);
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
        changeIsdisabled("save", false);
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
      changeIsdisabled("save", false);
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
      <IStoolbar
        save={handleSave}
        back
        title="Create testimonial"
        disabled={isDisabled.save} // Disable save if form is invalid
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className="w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="name"
            placeholder="Write your name"
            value={detail.name}
            required
            label="name"
          />
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="job_title"
            placeholder="Write your Job title"
            value={detail.job_title}
            required
            label="Job title"
          />

          {/* <ISinput
            onChange={handleInputChange}
            type="select"
            name="category"
            items={categoryItems}
            placeholder="0"
            value={detail.category}
            required
            label="Category"
          /> */}
          {/* <ISinput
            onChange={handleInputChange}
            type="date"
            name="year"
            placeholder="Write your full name"
            required
            label="Date"
            value={detail.year}
          /> */}

          {/* <JoditInput
            tabIndex={3}
            name="description_1"
            label="Description 1"
            required
            value={detail.description_1}
            onBlur={(newContent) =>
              setDetail((prev) => ({ ...prev, description_1: newContent }))
            }
          /> */}
        </div>

        <div className="mt-5">
          {/* <JoditInput
            tabIndex={3}
            name="description"
            label="Description"
            required
            value={detail.description}
            onBlur={(newContent) =>
              setDetail((prev) => ({ ...prev, description: newContent }))
            }
          /> */}
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
          <ISinput
            onChange={handleInputChange}
            type="textarea"
            name="message"
            placeholder="Write your messsages"
            required
            label="Messages"
            value={detail.message}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
