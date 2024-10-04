"use client"; // This is crucial for client-side hooks like useRouter

import ImagesInput from "@/app/components/input/ImagesInput";
import ISinput from "@/app/components/input/ISinput";
import IStoolbar from "@/app/components/utils/IStoolbar";
import { useParams } from "next/navigation"; // Use next/navigation in App Router

const DetailPage = () => {
  const params = useParams();
  const { slug } = params; // Access slug directly from params

  return (
    <div className=" relative">
      <IStoolbar edit back title="Update Home manager" />
      <div className="bg-white py-10 px-20 relative">
        <h1 className=" text-black">Edit Page for Item: {slug}</h1>
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

          <ISinput
            // onChange={handleInputChange}
            type="text"
            name="fullName"
            placeholder="Write your full name"
            noNumber
            noSymbol
            noSyntax
            required
            label="Description1"
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

export default DetailPage;
