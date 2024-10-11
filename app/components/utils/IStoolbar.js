"use client";
import { Button, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function IStoolbar(props) {
  const { data: session } = useSession(); // Get session data to check login state
  const router = useRouter();

  const handleGoToLink = (link) => {
    if (link && typeof link !== "boolean") {
      router.push(link);
    }
  };

  const handleGoBack = (link) => {
    if (link && typeof link !== "boolean") {
      router.push(link);
    } else {
      window.history.back();
    }
  };

  const loginTooltip = "You need to log in to perform this action.";
  const actionDisabledTooltip = "Action disabled.";

  return (
    <div className="w-full bg-white h-16 flex items-center align-middle px-2 text-2xl mb-5 justify-between font-bold">
      <div className="flex gap-3">
        {props.back && (
          <Button onClick={() => handleGoBack(props.back)}>Back</Button>
        )}
        <h1>{props.title}</h1>
      </div>

      {props.add && (
        <Tooltip
          label={
            !session
              ? loginTooltip
              : props.disabled
              ? actionDisabledTooltip
              : ""
          }
          isDisabled={session && !props.disabled} // Show tooltip only if not logged in or action is disabled
        >
          <Button
            colorScheme={!session || props.disabled ? "gray" : "green"}
            size="md"
            onClick={
              !session || props.disabled
                ? null
                : () => handleGoToLink(props.add)
            }
            className={!session || props.disabled ? "cursor-not-allowed" : ""}
            isDisabled={!session || props.disabled} // Disable button if not logged in or disabled
          >
            Add
          </Button>
        </Tooltip>
      )}

      {props.edit && (
        <Tooltip
          label={
            !session
              ? loginTooltip
              : props.disabled
              ? actionDisabledTooltip
              : ""
          }
          isDisabled={session && !props.disabled} // Show tooltip if not logged in or action is disabled
        >
          <Button
            colorScheme={!session || props.disabled ? "gray" : "green"}
            size="md"
            onClick={
              !session || props.disabled
                ? null
                : () => handleGoToLink(props.edit)
            }
            className={!session || props.disabled ? "cursor-not-allowed" : ""}
            isDisabled={!session || props.disabled} // Disable button if disabled
          >
            Edit
          </Button>
        </Tooltip>
      )}

      {props.save && (
        <Tooltip
          label={
            !session
              ? loginTooltip
              : props.disabled
              ? actionDisabledTooltip
              : ""
          }
          isDisabled={session && !props.disabled} // Show tooltip if not logged in or action is disabled
        >
          <Button
            colorScheme={!session || props.disabled ? "gray" : "green"}
            size="md"
            onClick={!session || props.disabled ? null : props.save}
            className={!session || props.disabled ? "cursor-not-allowed" : ""}
            isDisabled={!session || props.disabled} // Disable button if disabled
          >
            Save
          </Button>
        </Tooltip>
      )}
    </div>
  );
}
