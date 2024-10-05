import React, { useState, useRef } from "react";
import { ImageOutlined } from "@mui/icons-material";

export default function ImagesInput(props) {
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL
  const [showModal, setShowModal] = useState(false); // Control the visibility of the modal
  const [zoom, setZoom] = useState(1); // Store zoom level
  const [dragging, setDragging] = useState(false); // Track dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Track the image position
  const fileInputRef = useRef(null);
  const imgRef = useRef(null); // Ref for the image element
  const modalRef = useRef(null); // Ref for the modal background

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
        const base64 = reader.result; // Store the Base64 string
        setImagePreview(base64); // Update the image preview state

        // Send the file name and Base64 string to the parent component
        props.onChange(file.name, base64); // Call the parent function with the file name and Base64
      };

      // Read the file as a data URL (Base64)
      reader.readAsDataURL(file);
    }
  };
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3)); // Maximum zoom level
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.2)); // Minimum zoom level is 1 (no zoom out beyond original size)

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

  return (
    <div className="mt-3">
      <div className="mb-[8px] text-base font-medium">
        {props.label || "title"}
        <span className="text-red-500 ml-1">*</span>
      </div>
      {/* Display the input field for the image */}
      <div className="bg-red w-full h-[80px] bg-white rounded-lg border-dashed border-[4px] border-gray-500 flex items-center justify-between p-5">
        <button
          className="flex items-center"
          onClick={() => setShowModal(true)}
        >
          <div>
            {imagePreview || props.value?.image ? (
              <img
                src={imagePreview || props.value.image}
                alt="Uploaded"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover", // Ensures the image fits the space
                  borderRadius: "4px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#e0e0e0", // Placeholder background
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                }}
              >
                <span>+</span>
              </div>
            )}
          </div>
          <div className="ml-2">
            <div>{fileName || props.value?.imageName || ""}</div>
          </div>
        </button>
        <div className="flex justify-end border-2 border-black p-2 bg-gray-500 rounded-lg text-white">
          {props.disabled ? (
            <button onClick={() => setShowModal(true)}>preview</button>
          ) : (
            <button onClick={handleBrowseClick}>Browse</button>
          )}
        </div>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Modal for image zoom */}
      {showModal && (imagePreview || props.value?.image) && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20"
          onClick={handleModalClick}
        >
          <div
            className="bg-white p-5 rounded-lg relative overflow-hidden"
            style={{ width: "90vw", height: "90vh" }}
          >
            <img
              ref={imgRef}
              src={imagePreview || props.value?.image}
              alt="Zoomed"
              style={{
                transform: `scale(${zoom})`, // Apply zoom scale
                transition: "transform 0.3s ease-in-out",
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                left: "0",
                top: "0",
                cursor: dragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              draggable="false"
              onMouseLeave={handleDragEnd} // To handle cases where mouse leaves the image during drag
            />
            {/* Zoom buttons */}
            <div className="absolute bottom-2 left-2 flex space-x-2">
              <button
                onClick={handleZoomOut}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Zoom Out
              </button>
              <button
                onClick={handleZoomIn}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Zoom In
              </button>
            </div>
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
