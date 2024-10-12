"use client"; // This is crucial for client-side hooks like useRouter

import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useParams } from "next/navigation"; // Use next/navigation in App Router
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import api from "@/utils/axiosInstance";

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

  const router = useRouter(); // Router for navigation
  const toast = useToast(); // Chakra UI toast hook

  const [detail, setDetail] = useState({
    namaService: "",
    title_1: "",
    title_2: "",
    deskripsi: "",
    statusType: "",
    benefit: "",
    hargaService: 0,
    stock: 0,
    createdAt: "",
    updatedAt: "",
  });

  let categoryItems = [
    {
      text: "No category",
      value: "false",
    },
    {
      text: "POPULAR",
      value: "POPULAR",
    },
    {
      text: "PREMIUM",
      value: "PREMIUM",
    },
  ];

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
  //       `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/packageService/getById?id=${slug}`
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
      namaService: detail.namaService,
      title_1: detail.title_1,
      title_2: detail.title_2,
      statusType: detail.statusType,
      benefit: detail.benefit,
      hargaService: detail.hargaService,
      stock: detail.stock,
      deskripsi: detail.deskripsi,
    };
    const isFormValid = Object.values(body).every(
      (value) => value !== "" && value !== 0 && value !== null
    );
    changeIsdisabled("save", !isFormValid); // Disable if the form is invalid
  }, [detail]);

  const handleSave = async () => {
    changeIsdisabled("save", true);
    let body = {
      namaService: detail.namaService,
      title_1: detail.title_1,
      title_2: detail.title_2,
      deskripsi: detail.deskripsi,
      statusType: detail.statusType,
      benefit:
        typeof detail.benefit === "string"
          ? detail.benefit.split(",")
          : detail.benefit,
      hargaService: detail.hargaService,
      stock: detail.stock,
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
      let res = await api.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/packageService/create`,
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
        title="Create Work Soution"
        disabled={isDisabled.save} // Disable save if form is invalid
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className="w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="namaService"
            placeholder="Write your namaService name"
            value={detail.namaService}
            required
            label="Nama Service"
          />
          <ISinput
            onChange={handleInputChange}
            type="number"
            name="hargaService"
            placeholder="Write your hargaService"
            value={detail.hargaService}
            required
            label="Harga Service"
          />
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="title_1"
            placeholder="Write your title_1 name"
            value={detail.title_1}
            required
            label="Title 1"
          />
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="title_2"
            placeholder="Write your title_1 name"
            value={detail.title_2}
            required
            label="Title 2"
          />

          <ISinput
            onChange={handleInputChange}
            type="select"
            name="statusType"
            items={categoryItems}
            placeholder="0"
            value={detail.statusType}
            required
            label="Category"
          />
          <ISinput
            onChange={handleInputChange}
            type="number"
            name="stock"
            placeholder="Write your title_1 name"
            value={detail.stock}
            required
            label="Stock"
          />
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
          />
           */}
        </div>
        <ISinput
          onChange={handleInputChange}
          type="textarea"
          name="deskripsi"
          placeholder="Write your deskripsi"
          required
          label="Deskripsi"
          value={detail.deskripsi}
        />
        <ISinput
          onChange={handleInputChange}
          type="textarea"
          name="benefit"
          placeholder="Write your Benefit"
          required
          label="Benefit"
          value={detail.benefit}
        />

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

export default CreatePage;
