"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useParams } from "next/navigation"; // Use next/navigation in App Router
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import dynamic from "next/dynamic";
const JoditInput = dynamic(() => import("@/app/components/input/JoditInput"), {
  ssr: false,
});

const DetailPage = () => {
  const params = useParams();
  const { slug } = params; // Access slug directly from params
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

  return (
    <div className=" relative">
      <IStoolbar
        edit={`/cms/journey/update/${slug}`}
        back
        title="Detail Journey"
      />
      <div className="bg-gray-100 py-10 px-20 relative">
        {/* <h1 className=" text-black">Edit Page for Item: {slug}</h1> */}
        <div className=" w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            // onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Write your full name"
            value={detail.title_1}
            disabled
            required
            label="Title"
          />
          <ISinput
            // onChange={handleInputChange}
            type="date"
            name="fullName"
            placeholder="Write your full name"
            required
            label="Date"
            value={detail.year}
            disabled
          />

          <JoditInput
            // value={content}
            tabIndex={3} // tabIndex of textarea
            name="email"
            label="Description 1"
            required
            readonly
            value={detail.description_1}
            // onBlur={(newContent) => {
            //   setLetsConnectForm((item) => {
            //     return { ...item, messages: newContent };
            //   });
            // }}
          />
          <JoditInput
            // value={content}
            tabIndex={3} // tabIndex of textarea
            name="email"
            label="Description 2"
            required
            readonly
            value={detail.description_2}
            // onBlur={(newContent) => {
            //   setLetsConnectForm((item) => {
            //     return { ...item, messages: newContent };
            //   });
            // }}
          />
        </div>
        <ImagesInput
          // onChange={handleInputChange}
          type="image"
          name="fullName"
          label="Image"
          value={detail}
          disabled
        />
      </div>
    </div>
  );
};

export default DetailPage;
