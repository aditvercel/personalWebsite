import React from "react";

export default function ButtonFilled(props) {
  const buttonStyles = {
    backgroundColor: props.color || "#000000",
    color: props.textTitleColor || "#ffffff",
  };

  return (
    <div className="flex gap-10 justify-center items-center hover:animate-pulse">
      <div
        className={`font-bold text-sm p-3 rounded-md cursor-pointer`}
        style={buttonStyles}
      >
        {props.title}
      </div>
    </div>
  );
}
