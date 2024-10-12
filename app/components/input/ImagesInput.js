"use client";
import React, { useState, useRef } from "react";
import { ImageOutlined, Description } from "@mui/icons-material";

export default function FileInput(props) {
  const [fileName, setFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null); // Store the image/CV preview URL
  const [showModal, setShowModal] = useState(false); // Control the visibility of the modal
  const [zoom, setZoom] = useState(1); // Store zoom level for images
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
      setFileName(file.name); // Set the file name

      const reader = new FileReader();

      // Convert both images and PDFs to Base64
      reader.onloadend = () => {
        const base64 = reader.result;
        setFilePreview(base64); // Update the preview state for images or PDFs
        props.onChange(file.name, base64); // Call the parent function with the file name and Base64 string
      };

      if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file); // Read the image file as a data URL
      } else if (file.type === "application/pdf") {
        reader.readAsDataURL(file); // Read the PDF file as a data URL
      }
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.2));

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
      setShowModal(false); // Close modal if background is clicked
    }
  };

  return (
    <div className="mt-3">
      <div className="mb-[8px] text-base font-medium">
        {props.label || "Title"}
        <span className="text-red-500 ml-1">*</span>
      </div>
      <div className="bg-white rounded-lg border-dashed border-[4px] border-gray-500 flex items-center justify-between p-5">
        <button
          className="flex items-center"
          onClick={() => setShowModal(true)}
        >
          <div>
            {props.type === "image" ? (
              filePreview || props.value?.image ? (
                <img
                  src={filePreview || props.value?.image}
                  alt="Uploaded"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                  }}
                >
                  <span>+</span>
                </div>
              )
            ) : (
              <Description style={{ fontSize: "40px" }} />
            )}
          </div>
          <div className="ml-2">
            <div>{props.valueName}</div>
          </div>
        </button>
        <div className="flex justify-end border-2 border-black p-2 bg-gray-500 rounded-lg text-white">
          {props.disabled ? (
            <button onClick={() => setShowModal(true)}>Preview</button>
          ) : (
            <button onClick={handleBrowseClick}>Browse</button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={props.type === "image" ? "image/*" : "application/pdf"}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Modal for image/PDF zoom and download */}
      {showModal &&
        (filePreview ||
          props.value?.file ||
          props.value?.cv ||
          props.value?.image) && (
          <div
            ref={modalRef}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20"
            onClick={handleModalClick}
          >
            <div
              className="bg-white p-5 rounded-lg relative overflow-hidden"
              style={{ width: "90vw", height: "90vh" }}
            >
              {props.type === "image" ? (
                <img
                  ref={imgRef}
                  src={filePreview || props.value?.image}
                  alt="Zoomed"
                  style={{
                    transform: `scale(${zoom})`,
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
                  onMouseLeave={handleDragEnd}
                />
              ) : (
                <div
                  className="flex justify-center items-center"
                  style={{ height: "100%" }}
                >
                  <a
                    href={filePreview || props.value?.file || props.value?.cv}
                    download={`${fileName}.pdf`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Download{" "}
                    {fileName || props.value?.fileName || props.value?.cvName}
                  </a>
                </div>
              )}
              {/* Zoom buttons for images */}
              {props.type === "image" && (
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
              )}
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
