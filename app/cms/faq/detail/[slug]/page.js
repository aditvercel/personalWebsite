"use client"; // This is crucial for client-side hooks like useRouter

import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useParams } from "next/navigation"; // Use next/navigation in App Router
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";

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

  const params = useParams();
  const { slug } = params; // Access slug directly from params

  const [detail, setDetail] = useState({
    title_1: "",
    description: "",
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

  const getDetail = async () => {
    try {
      let res = await api.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/faq/getById?id=${slug}`
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

  // Disable the Save button if any detail field is empty
  useEffect(() => {
    let body = {
      title_1: detail.title_1,
      description: detail.description,
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

  return (
    <div className="relative">
      <IStoolbar
        // save={handleSave}
        edit={`/cms/faq/update/${slug}`}
        back
        title="Detail FAQ"
        disabled={isDisabled.save} // Disable save if form is invalid
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className="w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            onChange={handleInputChange}
            type="text"
            name="title_1"
            placeholder="Write your title_1 name"
            value={detail.title_1}
            required
            label="Title"
            disabled
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
            disabled
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
          />
           */}
        </div>
        <ISinput
          onChange={handleInputChange}
          type="textarea"
          name="description"
          placeholder="Write your description"
          required
          label="Description"
          value={detail.description}
          disabled
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
          disabled
        /> */}
      </div>
    </div>
  );
};

export default UpdatePage;
