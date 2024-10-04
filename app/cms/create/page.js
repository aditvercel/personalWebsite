"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import JoditEditor from "jodit-react";
// import { useParams } from "next/navigation";

const CreatePage = () => {
  //   const params = useParams();
  //   const { slug } = params; // Access slug directly from params

  return (
    <div className=" relative">
      <IStoolbar Add title="Create Home manager" back="/cms" />
      <div className="bg-white py-10 px-20 relative">
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

          {/* <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                name="email"
                onBlur={(newContent) => {
                  setLetsConnectForm((item) => {
                    return { ...item, messages: newContent };
                  });
                }}
              /> */}
          <ISinput
            // onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Write your full name"
            noNumber
            noSymbol
            noSyntax
            required
            label="Description2"
          />
          <ISinput
            // onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Write your full name"
            noNumber
            noSymbol
            noSyntax
            required
            label="Description2"
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
