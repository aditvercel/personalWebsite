"use client";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation"; // Import router from next/navigation

export default function IStoolbar(props) {
  const router = useRouter();

  const handleGoToLink = (link) => {
    console.log(link);
    if (link && typeof link !== "boolean") {
      router.push(link);
    }
  };

  const handleGoBack = (link) => {
    console.log(link);
    console.log(typeof link);
    if (link && typeof link !== "boolean") {
      router.push(link);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="w-full bg-white h-16 flex items-center align-middle px-2 text-2xl mb-5 justify-between font-bold">
      <div className="flex gap-3">
        {props.back && (
          <Button onClick={() => handleGoBack(props.back)}>Back</Button>
        )}
        <h1>{props.title}</h1>
      </div>

      {props.add && (
        <Button
          colorScheme={props.disabled ? "gray" : "green"}
          size="md"
          onClick={props.disabled ? null : () => handleGoToLink(props.add)}
          className={props.disabled ? "cursor-not-allowed" : ""}
          isDisabled={props.disabled} // Disable button if disabled is true
        >
          Add
        </Button>
      )}

      {props.edit && (
        <Button
          colorScheme={props.disabled ? "gray" : "green"}
          size="md"
          onClick={props.disabled ? null : () => handleGoToLink(props.edit)}
          className={props.disabled ? "cursor-not-allowed" : ""}
          isDisabled={props.disabled} // Disable button if disabled is true
        >
          Edit
        </Button>
      )}

      {props.save && (
        <Button
          colorScheme={props.disabled ? "gray" : "green"}
          size="md"
          onClick={props.disabled ? null : props.save}
          className={props.disabled ? "cursor-not-allowed" : ""}
          isDisabled={props.disabled} // Disable button if disabled is true
        >
          Save
        </Button>
      )}
    </div>
  );
}
