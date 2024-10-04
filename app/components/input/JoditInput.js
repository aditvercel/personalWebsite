import JoditEditor from "jodit-react";
import React from "react";

export default function JoditInput(props) {
  const config = {
    readonly: props.readonly || false, // Dynamically set the readonly value based on props
    // Add any other Jodit config options here
  };
  return (
    <div>
      <div className="mb-[8px] text-base font-medium">
        {props.label || "title"}
        {props.required && (
          <>
            {props.required && !props.readonly ? (
              <span className="text-red-500 ml-1">*</span>
            ) : (
              <span className="text-gray-500 ml-1">*</span>
            )}
          </>
        )}
      </div>
      <JoditEditor
        value={props.value}
        tabIndex={3} // tabIndex of textarea
        name={props.name}
        config={config} // Pass the configuration object here
        onBlur={props.onBlur}
      />
    </div>
  );
}
