"use cliennt";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation"; // Import router from next/navigation

export default function IStoolbar(props) {
  const router = useRouter();
  const handleGoToLink = (link) => {
    if (link && link == "") {
      // console.log(link);
      router.push(link);
    } else {
      window.history.back();
    }
  };
  return (
    <div className="w-full bg-white h-16 flex items-center align-middle px-2 text-2xl mb-5 justify-between font-bold">
      <div className="flex gap-3">
        {props.back && (
          <Button onClick={() => handleGoToLink(props.back)}>Back</Button>
        )}
        <h1>{props.title}</h1>
      </div>
      {props.add && (
        <Button
          colorScheme="green"
          size="md"
          onClick={() => handleGoToLink(props.add)}
        >
          Add
        </Button>
      )}
      {props.edit && (
        <Button
          colorScheme="green"
          size="md"
          onClick={() => handleGoToLink(props.edit)}
        >
          Edit
        </Button>
      )}
      {props.save && (
        <Button colorScheme="green" size="md" onClick={() => handleGoToLink}>
          Save
        </Button>
      )}
    </div>
  );
}
