import React, { useState } from "react";
import axios from "axios";
import "./uploadprescription.css";
import { FiUploadCloud } from "react-icons/fi";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file && !text) {
      alert("Please upload a prescription or enter some text.");
      return;
    }
    const formData = new FormData();
    if (file) formData.append("prescription", file);
    if (text) formData.append("description", text);

    try {
      await axios.post("/api/upload-prescription", formData);
      alert("Prescription uploaded successfully!");
    } catch (error) {
      console.error("Upload error", error);
      alert("Failed to upload prescription.");
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload Your Prescription</h2>
      <div className="upload-card">
        {/* Left side - File Upload */}
        <div
          className="upload-box"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FiUploadCloud className="upload-icon" />
          <p className="upload-text">Drag & drop or click to upload</p>
          <small className="upload-format">Supports JPG, PNG, HEIC</small>
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={handleFileChange}
          />
          {file && <p className="file-name">{file.name}</p>}
        </div>

        {/* Right side - Text Input */}
        <div className="text-input-container">
          <textarea
            className="text-input"
            placeholder="Enter additional details (optional)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button className="analyze-btn" onClick={handleSubmit}>
        Upload Here
      </button>
    </div>
  );
};

export default UploadPrescription;
