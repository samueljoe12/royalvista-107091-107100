import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import GradientButton from "./GradientButton";

/**
 * PUBLIC_INTERFACE
 * UploadAssetModal - Responsive upload modal with scroll/flexible height, glassmorphic style,
 * asset-type-specific upload fields (image or music), animated feedback, and previews.
 * @param {boolean} isOpen - Whether modal is shown
 * @param {function} onRequestClose - Callback for closing modal
 * @param {function} onUpload - Callback for completed upload (mocked)
 */
const assetTypes = [
  { label: "Music", value: "music", accept: "audio/*" },
  { label: "Image", value: "image", accept: "image/*" },
];

const initialState = {
  assetType: "",
  title: "",
  file: null,
  previewUrl: "",
  error: "",
};

function UploadAssetModal({ isOpen, onRequestClose, onUpload }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!isOpen) setFormData(initialState);
  }, [isOpen]);

  // Handle changing the asset type (resets file/preview for consistency)
  function handleTypeChange(e) {
    setFormData({
      ...formData,
      assetType: e.target.value,
      file: null,
      previewUrl: "",
      error: "",
    });
  }

  // Handle title change
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: "" });
  }

  // Handle file selection and live preview
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Conditional validation per asset type
    if (
      (formData.assetType === "music" && !file.type.startsWith("audio/")) ||
      (formData.assetType === "image" && !file.type.startsWith("image/"))
    ) {
      setFormData({
        ...formData,
        file: null,
        previewUrl: "",
        error: "Invalid file type for the selected asset type.",
      });
      return;
    }
    // Generate preview if image
    let previewUrl = "";
    if (formData.assetType === "image") {
      previewUrl = URL.createObjectURL(file);
    } else if (formData.assetType === "music") {
      previewUrl = file.name;
    }
    setFormData({
      ...formData,
      file,
      previewUrl,
      error: "",
    });
  }

  // Validate and submit (simulates upload)
  function handleUpload(e) {
    e.preventDefault();
    if (!formData.assetType || !formData.title || !formData.file) {
      setFormData({
        ...formData,
        error: "Please complete all fields and select a valid file.",
      });
      return;
    }
    onUpload(formData);
    setFormData(initialState);
    onRequestClose();
  }

  function handleClose() {
    setFormData(initialState);
    onRequestClose();
  }

  // Modal content: glassmorphic, animated + responsive + scroll if needed
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <form
        className="upload-asset-form"
        style={{
          minWidth: 260,
          maxWidth: 430,
          width: "97vw",
          maxHeight: "95vh",
          background: "rgba(24,26,34,0.72)",
          borderRadius: 20,
          boxShadow: "0 8px 48px rgba(0,0,0,0.27)",
          padding: "1.7rem 1.1rem 1.1rem 1.1rem",
          backdropFilter: "blur(17px)",
          position: "relative",
          color: "#fff",
          margin: "0 auto",
          animation: "fadeInPop 0.36s cubic-bezier(.33,1.5,.58,1) both",
          overflowY: "auto",         // for oversize screens
          overscrollBehavior: "contain",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleUpload}
        autoComplete="off"
      >
        <h2
          style={{
            fontSize: 23,
            fontWeight: 700,
            color: "#FFD700",
            letterSpacing: "1px",
            textAlign: "center",
            marginBottom: 18,
            textShadow: "0 0 8px #222, 0 2px 12px #FFD70033",
          }}
        >
          Upload Asset
        </h2>
        {/* ASSET TYPE */}
        <label className="upload-label" style={{ margin: "0.5rem 0 0.2rem" }}>
          Asset Type
          <select
            required
            name="assetType"
            value={formData.assetType}
            onChange={handleTypeChange}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.09)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 14,
              outline: "none",
              marginTop: 6,
              marginBottom: 13,
            }}
            aria-label="Choose asset type"
          >
            <option value="">Select Type</option>
            {assetTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </label>
        {/* TITLE FIELD */}
        <label className="upload-label">
          Title
          <input
            required
            name="title"
            type="text"
            placeholder="Asset Title"
            value={formData.title}
            onChange={handleInputChange}
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 13,
              padding: "0.7rem",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.11)",
              color: "#fff",
              fontWeight: 500,
              fontSize: 15,
              outline: "none",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.04)",
            }}
          />
        </label>
        {/* CONDITIONAL FILE UPLOAD INPUTS BY TYPE */}
        <div style={{ width: "100%" }}>
          {formData.assetType === "image" && (
            <label className="upload-label" style={{ width: "100%" }}>
              Image File
              <input
                key="imginput"
                required
                name="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  margin: "6px 0 10px",
                  padding: 6,
                  borderRadius: 8,
                  border: "none",
                  background: "rgba(255,255,255,0.13)",
                  color: "#fff",
                }}
              />
              <small>JPG, PNG etc.</small>
            </label>
          )}
          {formData.assetType === "music" && (
            <label className="upload-label" style={{ width: "100%" }}>
              Audio File
              <input
                key="audinput"
                required
                name="file"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  margin: "6px 0 10px",
                  padding: 6,
                  borderRadius: 8,
                  border: "none",
                  background: "rgba(255,255,255,0.13)",
                  color: "#fff",
                }}
              />
              <small>MP3/WAV/OGG files, max 10MB.</small>
            </label>
          )}
        </div>
        {/* PREVIEW FIELDS */}
        {formData.assetType === "image" && formData.previewUrl && (
          <div style={{ textAlign: "center", margin: "13px 0 16px" }}>
            <img
              alt="Preview"
              src={formData.previewUrl}
              style={{
                maxWidth: "100%",
                maxHeight: 155,
                borderRadius: 13,
                border: "2px dashed #00FFC2",
                background: "#222c",
                boxShadow: "0 2px 12px #00FFC233",
              }}
            />
          </div>
        )}
        {formData.assetType === "music" && formData.previewUrl && (
          <div style={{
            textAlign: "center",
            marginTop: 10,
            marginBottom: 16,
            wordBreak: "break-all"
          }}>
            <span style={{
              padding: "2px 12px",
              borderRadius: 10,
              background: "rgba(0,255,194,0.13)",
              color: "#00FFC2",
              fontWeight: 600,
              fontSize: 15,
            }}>
              {formData.previewUrl}
            </span>
          </div>
        )}
        {/* ERROR HANDLING */}
        {formData.error && (
          <div
            style={{
              color: "#ff3967",
              fontWeight: 700,
              background: "rgba(255,57,103,0.04)",
              borderRadius: 7,
              padding: "6px 8px",
              marginBottom: 10,
              marginTop: -2,
              textAlign: "center",
              boxShadow: "0 2px 6px #FFD70020",
            }}
          >
            {formData.error}
          </div>
        )}
        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 14,
          }}
        >
          <GradientButton
            type="button"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#FFD700",
            }}
            onClick={handleClose}
          >
            Cancel
          </GradientButton>
          <GradientButton
            type="submit"
            disabled={
              !formData.assetType ||
              !formData.title ||
              !formData.file
            }
          >
            Upload
          </GradientButton>
        </div>
      </form>
      <style>{`
        @keyframes fadeInPop {
          0% { opacity: 0; transform: scale(0.89) translateY(27px);}
          80% { opacity: 1; transform: scale(1.09) translateY(-8px);}
          100% { opacity: 1; transform: scale(1) translateY(0);}
        }
        .upload-asset-form::-webkit-scrollbar {
          width: 7px;
          background: transparent;
        }
        .upload-asset-form::-webkit-scrollbar-thumb {
          background: #222b;
          border-radius: 8px;
        }
        @media (max-width: 450px) {
          .upload-asset-form {
            max-width: 100vw !important;
            min-width: unset !important;
            padding: 1.08rem 0.14rem 0.67rem !important;
            border-radius: 13px !important;
            box-shadow: 0 0 32px #FFD70022;
            max-height: 97vh !important;
          }
        }
        @media (max-width: 350px) {
          .upload-asset-form {
            padding: 0.49rem 0.015rem 0.2rem !important;
            border-radius: 8px !important;
            font-size: 14px;
          }
        }
      `}</style>
    </Modal>
  );
}

export default UploadAssetModal;
