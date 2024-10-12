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

  const [isDisabled, setISdisabled] = useState({
    save: true, // Initially disabled
    edit: false,
    add: false,
  });

  const [detail, setDetail] = useState({
    createdAt: "",
    updatedAt: "",
    top_title: "",
    bottom_title: "",
    link: "",
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
  //       `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/query/getById?id=${slug}`
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
      top_title: detail.top_title,
      bottom_title: detail.bottom_title,
      link: detail.link,
    };
    const isFormValid = Object.values(body).every(
      (value) => value !== "" && value !== 0 && value !== null
    );
    changeIsdisabled("save", !isFormValid);
  }, [detail]);

  const handleSave = async () => {
    changeIsdisabled("save", true);
    let body = {
      top_title: detail.top_title,
      bottom_title: detail.bottom_title,
      link: detail.link,
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
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/query/create`,
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
        title="Create query"
        disabled={isDisabled.save} // Disable save if form is invalid
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className="w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="top_title"
            placeholder="Write your full name"
            value={detail.top_title}
            required
            label="Top title"
          />
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="bottom_title"
            placeholder="0"
            value={detail.bottom_title}
            required
            label="Bottom title"
          />
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="link"
            placeholder="0"
            value={detail.link}
            required
            label="Link url"
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
