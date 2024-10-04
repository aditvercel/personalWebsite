"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import JoditInput from "@/app/components/input/JoditInput";
import IStoolbar from "@/app/components/utils/IStoolbar";

// import { useParams } from "next/navigation";

const CreatePage = () => {
  //   const params = useParams();
  //   const { slug } = params; // Access slug directly from params

  return (
    <div className=" relative">
      <IStoolbar add title="Create Home manager" back="/cms" />
      <div className="bg-gray-100 py-10 px-20 relative">
        <div className=" w-full grid grid-cols-2 gap-x-[80px] gap-y-[10px]">
          <ISinput
            // onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Write your full name"
            noNumber
            noSymbol
            noSyntax
            required
            label="Title"
          />
          <ISinput
            // onChange={handleInputChange}
            type="date"
            name="fullName"
            placeholder="Write your full name"
            noNumber
            noSymbol
            noSyntax
            required
            label="Date"
          />
          <JoditInput
            // value={content}
            tabIndex={3} // tabIndex of textarea
            name="email"
            label="Description 1"
            required
            readonly
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
        />
      </div>
    </div>
  );
};

export default CreatePage;
