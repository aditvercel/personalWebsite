"use client";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";

import React, { useState, useRef } from "react";

export default function ISinput(props) {
  const inputRef = useRef(null);
  // const [fileName, setFileName] = useState("Upload a picture...");
  // const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  // const [showModal, setShowModal] = useState(false); // Control the visibility of the modal
  // const [zoom, setZoom] = useState(1); // Store zoom level

  const [validationState, setValidationState] = useState({
    hasNumber: false,
    hasSymbol: false,
    hasSyntax: false,
    hasValue: false,
  });
  // const handleBrowseClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click(); // Trigger the hidden file input
  //   }
  // };

  const handleClickDate = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };
  const handleValidation = (value) => {
    const hasNumber = /\d/; // Regular expression to check for numbers
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\]/; // Regular expression to check for specific symbols
    const hasSyntax = /[><{}:]/; // Regular expression to check for specific syntax
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isInvalidNumber = props.noNumber && hasNumber.test(value);
    const isInvalidSymbol = props.noSymbol && hasSymbol.test(value);
    const isInvalidSyntax = props.noSyntax && hasSyntax.test(value);
    const isInvalidEmail = props.type === "email" && !emailRegex.test(value);
    const isValue = value;

    setValidationState((prevState) => ({
      ...prevState,
      hasNumber: isInvalidNumber,
      hasSymbol: isInvalidSymbol,
      hasSyntax: isInvalidSyntax,
      hasValue: isValue,
      isInvalidEmail: isInvalidEmail,
    }));
  };

  const handleChange = (e) => {
    const value = e.target.value; // Get the current input value
    handleValidation(value); // Validate input

    // Update validation state based on current input value
    const hasError = isError(); // Check for errors

    // Update the parent component if there's a change
    if (props.onChange) {
      props.onChange({
        ...e,
        target: {
          ...e.target,
          name: props.name,
          value: value,
          isValid: props.type === "email" && hasError ? false : true,
        },
      });
    }
  };

  const isError = () => {
    let check =
      !validationState.hasValue ||
      validationState.hasNumber ||
      validationState.hasSymbol ||
      validationState.hasSyntax ||
      validationState.isInvalidEmail;

    return check;
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle empty date values
    const date = new Date(dateString);
    // Extract year, month, and day and format them as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <FormControl
      isInvalid={isError()}
      isRequired={props.required}
      isDisabled={props.disabled}
      readOnly={props.readOnly}
    >
      {props.type === "textarea" && (
        <>
          <div className=" text-base font-medium mb-2">
            {props.label}
            {props.required && <span className="text-red-500 pl-1">*</span>}
          </div>
          <Textarea
            variant="filled"
            size="sm"
            className="rounded-lg text-black bg-white "
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={handleChange}
            errorBorderColor="red.300"
            isInvalid={isError}
          />
          {!props.value && (
            <FormErrorMessage color={"red.300"}>
              <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
              {props.label} required
            </FormErrorMessage>
          )}
        </>
      )}

      {props.type === "select" && (
        <>
          <div className=" text-base font-medium mb-2">
            {props.label}
            {props.required && <span className="text-red-500 pl-1">*</span>}
          </div>
          <Select
            onChange={handleChange}
            placeholder="Select option"
            value={props.value || ""}
            name={props.name}
          >
            {/* hoping items = [{value : number , text : string }] */}
            {props.items?.map((item) => {
              return (
                <option key={crypto.randomUUID()} value={item.value}>
                  {item.text}
                </option>
              );
            })}
          </Select>
          {!props.value && (
            <FormErrorMessage color={"red.300"}>
              <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
              {props.label} required
            </FormErrorMessage>
          )}
        </>
      )}

      {(props.type === "email" ||
        props.type === "text" ||
        props.type === "number") && (
        <>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Input
            variant="filled"
            placeholder={props.placeholder}
            size="sm"
            className="rounded-lg text-black bg-white  h-[42px]"
            errorBorderColor="red.300"
            isInvalid={isError()} // Use the combined error state
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={handleChange}
            autoComplete={props.type === "email" ? "off" : "on"}
          />
          <div className="grid grid-cols-2 gap-x-1">
            {props.noNumber && validationState.hasNumber && (
              <FormErrorMessage color={"red.300"}>
                <div className="h-3 w-3 rounded-full bg-white mr-1"></div>{" "}
                Numbers aren&apos;t allowed
              </FormErrorMessage>
            )}
            {props.noSymbol && validationState.hasSymbol && (
              <FormErrorMessage color={"red.300"}>
                <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
                Symbols aren&apos;t allowed
              </FormErrorMessage>
            )}
            {props.noSyntax && validationState.hasSyntax && (
              <FormErrorMessage color={"red.300"}>
                <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
                Syntax isn&apos;t allowed
              </FormErrorMessage>
            )}
            {props.type === "email" && validationState.isInvalidEmail && (
              <FormErrorMessage color={"red.300"}>
                <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
                Invalid email format
              </FormErrorMessage>
            )}
            {!props.value && (
              <FormErrorMessage color={"red.300"}>
                <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
                {props.label} required
              </FormErrorMessage>
            )}
          </div>
        </>
      )}

      {props.type === "date" && (
        <>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <div>
            <Input
              ref={inputRef}
              variant="filled"
              size="sm"
              className="rounded-lg text-black bg-white  cursor-pointer h-[42px]"
              errorBorderColor="red.300"
              isInvalid={isError()} // Use the combined error state
              type="date"
              name={props.name}
              value={props.value ? formatDate(props.value) : ""} // Format the date
              onChange={(e) => {
                const value = e.target.value;
                if (props.onChange) {
                  props.onChange(e); // Call parent onChange with the formatted value
                  handleValidation(value); // Validate input
                }
              }}
              onClick={handleClickDate}
              disabled={props.disabled} // Include the disabled prop
              readOnly={props.readOnly}
            />
            {!props.value && (
              <FormErrorMessage color={"red.300"}>
                <div className="h-3 w-3 rounded-full bg-white mr-1"></div>
                {props.label} required
              </FormErrorMessage>
            )}
          </div>
        </>
      )}
    </FormControl>
  );
}
