import React from "react";

export default function ButtonFilled(props) {
  const buttonStyles = {
    backgroundColor: props.color || "#14baba",
    color: props.textTitleColor || "#ffffff",
  };

  return (
    <div className="flex gap-10 justify-center items-center hover:animate-pulse min-w-[80px]">
      <div
        className={`font-bold text-sm p-3 rounded-md cursor-pointer text-center flex items-center align-middle self-center`}
        style={buttonStyles}
      >
        <div>{props.title}</div>
      </div>
    </div>
  );
}
