import React from "react";

export default function ButtonFilled(props) {
  const buttonStyles = {
    backgroundColor: props.disabled ? "#8b8c92" : props.color || "#14baba",
    color: props.textTitleColor || "#ffffff",
    cursor: props.disabled ? "not-allowed" : "pointer",
  };

  return (
    <div
      className="flex gap-10 justify-center items-center hover:animate-pulse min-w-[80px]"
      onClick={!props.disabled ? props.onClick : null}
    >
      <div
        className={`font-bold text-sm p-3 rounded-md text-center flex items-center align-middle`}
        style={buttonStyles}
      >
        <div>{props.title}</div>
      </div>
    </div>
  );
}
