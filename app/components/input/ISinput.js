import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import React, { useState, useRef } from "react";
import Image from "next/image";

export default function ISinput(props) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("Upload a picture...");
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  const [showModal, setShowModal] = useState(false); // Control the visibility of the modal
  const [zoom, setZoom] = useState(1); // Store zoom level
  const [dragging, setDragging] = useState(false); // Track dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Track the image position
  const fileInputRef = useRef(null);
  const imgRef = useRef(null); // Ref for the image element
  const modalRef = useRef(null); // Ref for the modal background

  const [validationState, setValidationState] = useState({
    hasNumber: false,
    hasSymbol: false,
    hasSyntax: false,
  });
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden file input
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name as the text

      // Create an image preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Store the preview image in the state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3)); // Maximum zoom level
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1)); // Minimum zoom level is 1 (no zoom out beyond original size)

  const handleDragStart = (event) => {
    setDragging(true);
    setPosition({
      x: event.clientX - imgRef.current.offsetLeft,
      y: event.clientY - imgRef.current.offsetTop,
    });
  };

  const handleDrag = (event) => {
    if (dragging) {
      imgRef.current.style.left = `${event.clientX - position.x}px`;
      imgRef.current.style.top = `${event.clientY - position.y}px`;
    }
  };

  const handleDragEnd = () => setDragging(false);

  const handleModalClick = (event) => {
    if (modalRef.current === event.target) {
      setShowModal(false); // Close modal if the background is clicked
    }
  };

  const handleClickDate = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };
  const handleValidation = (value) => {
    const hasNumber = /\d/; // Regular expression to check for numbers
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|\\]/; // Regular expression to check for specific symbols
    const hasSyntax = /[><{}:]/; // Regular expression to check for specific syntax

    const isInvalidNumber = props.noNumber && hasNumber.test(value);
    const isInvalidSymbol = props.noSymbol && hasSymbol.test(value);
    const isInvalidSyntax = props.noSyntax && hasSyntax.test(value);

    setValidationState({
      hasNumber: isInvalidNumber,
      hasSymbol: isInvalidSymbol,
      hasSyntax: isInvalidSyntax,
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (props.onChange) {
      props.onChange(e); // Call parent onChange
      handleValidation(value); // Validate input
    } else {
      console.log("no parent onChange function");
    }
  };

  const isError =
    validationState.hasNumber ||
    validationState.hasSymbol ||
    validationState.hasSyntax;

  return (
    <FormControl isInvalid={isError} isRequired={props.required}>
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
        </>
      )}

      {(props.type === "email" || props.type === "text") && (
        <>
          {props.label && <FormLabel>{props.label}</FormLabel>}
          <Input
            variant="filled"
            placeholder={props.placeholder}
            size="sm"
            className="rounded-lg text-black bg-white border border-black h-[42px]"
            errorBorderColor="red.300"
            isInvalid={isError} // Use the combined error state
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={handleChange}
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
              className="rounded-lg text-black bg-white border border-black cursor-pointer h-[42px]"
              errorBorderColor="red.300"
              isInvalid={isError} // Use the combined error state
              type="date"
              name={props.name}
              value={props.value}
              onChange={handleChange}
              onClick={handleClickDate}
            />
          </div>
        </>
      )}
    </FormControl>
  );
}
