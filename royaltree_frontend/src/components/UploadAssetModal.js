import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import GradientButton from "./GradientButton";

/**
 * PUBLIC_INTERFACE
 * UploadAssetModal - Responsive modal for uploading IP assets (art, music, design, video).
 * Prompts for asset name, creator name, ownership %, estimated royalty, asset type,
 * and provides a context-sensitive file input matching the selected type (with preview).
 * Keeps glassmorphic, animated, and clear layout. Includes live field validation.
 * 
 * @param {boolean} isOpen - Whether modal is shown
 * @param {function} onRequestClose - Callback for closing modal
 * @param {function} onUpload - Callback for completed upload
 */
const ASSET_TYPES = [
  { label: "Art", value: "art", accept: "image/*", inputType: "image" },
  { label: "Music", value: "music", accept: "audio/*", inputType: "audio" },
  { label: "Design", value: "design", accept: "*", inputType: "file" },
  { label: "Video", value: "video", accept: "video/*", inputType: "video" },
];

const initialState = {
  assetType: "",
  assetName: "",
  creatorName: "",
  ownershipPct: "",
  estimatedRoyalty: "",
  file: null,
  previewUrl: "",
  error: "",
};

function UploadAssetModal({ isOpen, onRequestClose, onUpload }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!isOpen) setFormData(initialState);
  }, [isOpen]);

  // Asset type selection
  function handleAssetTypeChange(e) {
    setFormData({
      ...formData,
      assetType: e.target.value,
      file: null,
      previewUrl: "",
      error: "",
    });
  }

  // Generic field input
  function handleInputChange(e) {
    const { name, value } = e.target;
    // Only allow digits/period in percentage or royalty fields
    if (name === "ownershipPct" || name === "estimatedRoyalty") {
      if (value === "" || /^[0-9]{0,2}(\.[0-9]{0,3})?$/.test(value)) {
        setFormData({ ...formData, [name]: value, error: "" });
      }
    } else {
      setFormData({ ...formData, [name]: value, error: "" });
    }
  }

  // File input and preview
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const selectedType = ASSET_TYPES.find(t => t.value === formData.assetType);
    let error = "";
    if (selectedType) {
      if (
        (selectedType.inputType === "image" && !file.type.startsWith("image/")) ||
        (selectedType.inputType === "audio" && !file.type.startsWith("audio/")) ||
        (selectedType.inputType === "video" && !file.type.startsWith("video/"))
      ) {
        error = `Invalid file type for ${selectedType.label}.`;
      }
    }
    if (error) {
      setFormData({
        ...formData,
        file: null,
        previewUrl: "",
        error,
      });
      return;
    }
    // Generate preview
    let previewUrl = "";
    if (selectedType?.inputType === "image" || selectedType?.inputType === "video") {
      previewUrl = URL.createObjectURL(file);
    } else if (selectedType?.inputType === "audio") {
      previewUrl = URL.createObjectURL(file);
    } else if (selectedType?.inputType === "file") {
      previewUrl = file.name;
    }
    setFormData({
      ...formData,
      file,
      previewUrl,
      error: "",
    });
  }

  // Upload/submit validation and event
  function handleUpload(e) {
    e.preventDefault();
    const {assetType, assetName, creatorName, ownershipPct, estimatedRoyalty, file} = formData;
    if (
      !assetType ||
      !assetName.trim() ||
      !creatorName.trim() ||
      !ownershipPct ||
      !estimatedRoyalty ||
      !file
    ) {
      setFormData({
        ...formData,
        error: "Please fill all fields and select an appropriate file.",
      });
      return;
    }
    if (parseFloat(ownershipPct) > 100.0) {
      setFormData({...formData, error: "Ownership % cannot exceed 100."});
      return;
    }
    if (parseFloat(ownershipPct) <= 0) {
      setFormData({...formData, error: "Ownership % must be greater than 0."});
      return;
    }
    if (parseFloat(estimatedRoyalty) <= 0) {
      setFormData({...formData, error: "Royalty must be positive."});
      return;
    }
    // Call mock upload
    onUpload({...formData}); // Pass the whole form data (you may extract fields elsewhere)
    setFormData(initialState);
    onRequestClose();
  }

  function handleClose() {
    setFormData(initialState);
    onRequestClose();
  }

  // Dynamic file input field
  function renderFileInput() {
    if (!formData.assetType) return null;
    const selectedType = ASSET_TYPES.find(t => t.value === formData.assetType);
    let label = "Upload File";
    let accept = "*";
    let inputType = "file";
    if (selectedType) {
      label = `Upload ${selectedType.label} ${selectedType.inputType === "file" ? "File" : ""}`;
      accept = selectedType.accept;
      inputType = selectedType.inputType === "file" ? "file" : selectedType.inputType;
    }
    let helpText = "";
    if (selectedType?.inputType === "image") helpText = "Accepts: PNG, JPG, JPEG, GIF.";
    if (selectedType?.inputType === "audio") helpText = "Accepts: MP3, WAV, OGG. Max 10MB.";
    if (selectedType?.inputType === "video") helpText = "Accepts: MP4, WebM, MOV. Max 50MB.";
    if (selectedType?.value === "design") helpText = "Any file (AI, PSD, SVG, PDF, ZIP, etc.).";

    return (
      <label className="upload-label" style={{ width: "100%", marginBottom: 13 }}>
        {label}
        <input
          key={selectedType.value}
          required
          name="file"
          type="file"
          accept={accept}
          onChange={handleFileChange}
          style={{
            width: "100%",
            margin: "6px 0 3px",
            padding: 7,
            borderRadius: 8,
            border: "none",
            background: "rgba(255,255,255,0.13)",
            color: "#fff",
          }}
        />
        <small style={{
          color: "#BAB9E3",
          fontSize: "13px",
          marginLeft: 3
        }}>{helpText}</small>
      </label>
    );
  }

  function renderPreview() {
    const selectedType = ASSET_TYPES.find(t => t.value === formData.assetType);
    if (!formData.file || !formData.previewUrl) return null;
    if (selectedType?.inputType === "image") {
      return (
        <div style={{ textAlign: "center", margin: "13px 0 17px" }}>
          <img
            alt="Preview"
            src={formData.previewUrl}
            style={{
              maxWidth: "100%",
              maxHeight: 160,
              borderRadius: 13,
              border: "2px dashed #00FFC2",
              background: "#181828",
              boxShadow: "0 2px 12px #00FFC233",
            }}
          />
        </div>
      );
    }
    if (selectedType?.inputType === "audio") {
      return (
        <div style={{
          textAlign: "center",
          margin: "2px 0 17px",
        }}>
          <audio controls style={{
            width: "90%",
            background: "rgba(24,26,34,0.19)",
            borderRadius: 10,
          }}>
            <source src={formData.previewUrl}/>
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    if (selectedType?.inputType === "video") {
      return (
        <div style={{ textAlign: "center", margin: "10px 0 17px" }}>
          <video
            controls
            src={formData.previewUrl}
            style={{
              maxWidth: "100%",
              maxHeight: 160,
              borderRadius: 13,
              background: "#000",
              boxShadow: "0 2px 12px #00FFC233",
            }}
          >Your browser does not support the video tag.</video>
        </div>
      );
    }
    // DESIGN or generic file
    return (
      <div style={{
        textAlign: "center",
        margin: "15px 0 13px",
        wordBreak: "break-all"
      }}>
        <span style={{
          padding: "4px 13px",
          borderRadius: 10,
          background: "rgba(0,255,194,0.13)",
          color: "#00FFC2",
          fontWeight: 600,
          fontSize: 16,
        }}>
          {formData.previewUrl}
        </span>
      </div>
    );
  }

  // Modal layout: glass, animated, responsive
  return (
    <Modal open={isOpen} onClose={handleClose} maxWidth="480px">
      <form
        className="upload-asset-form"
        style={{
          minWidth: 260,
          maxWidth: 440,
          width: "97vw",
          background: "rgba(24,26,34,0.74)",
          borderRadius: 22,
          boxShadow: "0 8px 56px rgba(0,0,0,0.27)",
          padding: "1.75rem 1.4rem 1.25rem 1.4rem",
          backdropFilter: "blur(18px)",
          position: "relative",
          color: "#fff",
          margin: "0 auto",
          overflowY: "auto",
          overscrollBehavior: "contain",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={handleUpload}
        autoComplete="off"
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#FFD700",
            letterSpacing: "1px",
            textAlign: "center",
            marginBottom: 16,
            textShadow: "0 0 9px #282829, 0 2px 12px #FFD70033",
          }}
        >
          Upload Asset
        </h2>

        {/* Field Ordering */}
        {/* 1. Asset Type */}
        <label className="upload-label" style={{ margin: "0.5rem 0 0.1rem" }}>
          Asset Type
          <select
            required
            name="assetType"
            value={formData.assetType}
            onChange={handleAssetTypeChange}
            className="glass-select"
            aria-label="Choose asset type"
          >
            <option value="" style={{ color: "#b0afff", background: "#222b" }}>Select Type</option>
            {ASSET_TYPES.map(type => (
              <option
                key={type.value}
                value={type.value}
                style={{
                  color: "#12121d",
                  background: "#ffd700", // fallback for contrast
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: ".02em"
                }}
              >
                {type.label}
              </option>
            ))}
          </select>
        </label>

        {/* 2. Asset Name */}
        <label className="upload-label">
          Asset Name
          <input
            required
            name="assetName"
            type="text"
            placeholder="e.g. Sunrise Canvas"
            value={formData.assetName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 13,
              padding: "0.75rem",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.13)",
              color: "#fff",
              fontWeight: 500,
              fontSize: 16,
              outline: "none",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.03)",
            }}
          />
        </label>

        {/* 3. Creator Name */}
        <label className="upload-label">
          Creator Name
          <input
            required
            name="creatorName"
            type="text"
            placeholder="Creator or Owner"
            value={formData.creatorName}
            onChange={handleInputChange}
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 13,
              padding: "0.75rem",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.13)",
              color: "#fff",
              fontWeight: 500,
              fontSize: 16,
              outline: "none",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.03)",
            }}
          />
        </label>

        {/* 4. Ownership Percentage */}
        <label className="upload-label">
          Ownership Percentage (%)
          <input
            required
            name="ownershipPct"
            type="number"
            pattern="[0-9]*"
            min="0.01"
            max="100"
            step="0.01"
            placeholder="e.g. 60"
            value={formData.ownershipPct}
            onChange={handleInputChange}
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 14,
              padding: "0.75rem",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.13)",
              color: "#fff",
              fontWeight: 500,
              fontSize: 16,
              outline: "none",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.03)",
            }}
            inputMode="decimal"
          />
        </label>

        {/* 5. Estimated Royalty (%) */}
        <label className="upload-label">
          Estimated Royalty (%) per year
          <input
            required
            name="estimatedRoyalty"
            type="number"
            pattern="[0-9]*"
            min="0.01"
            step="0.01"
            placeholder="e.g. 4.2"
            value={formData.estimatedRoyalty}
            onChange={handleInputChange}
            style={{
              width: "100%",
              marginTop: 6,
              marginBottom: 15,
              padding: "0.75rem",
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.13)",
              color: "#fff",
              fontWeight: 500,
              fontSize: 16,
              outline: "none",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.03)",
            }}
            inputMode="decimal"
          />
        </label>

        {/* 6. File Upload */}
        {renderFileInput()}

        {/* 7. Preview */}
        {renderPreview()}

        {/* 8. Error */}
        {formData.error && (
          <div
            style={{
              color: "#ff3967",
              fontWeight: 700,
              background: "rgba(255,57,103,0.058)",
              borderRadius: 7,
              padding: "6px 8px",
              marginBottom: 12,
              textAlign: "center",
              boxShadow: "0 2px 8px #FFD7001A",
            }}
          >
            {formData.error}
          </div>
        )}

        {/* 9. Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
            gap: 13,
          }}
        >
          <GradientButton
            type="button"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#FFD700",
              fontWeight: 700,
            }}
            onClick={handleClose}
          >
            Cancel
          </GradientButton>
          <GradientButton
            type="submit"
            disabled={
              !formData.assetType ||
              !formData.assetName ||
              !formData.creatorName ||
              !formData.ownershipPct ||
              !formData.estimatedRoyalty ||
              !formData.file
            }
          >
            Upload
          </GradientButton>
        </div>
      </form>
      {/* Responsive scroll styling for modal */}
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
        @media (max-width: 540px) {
          .upload-asset-form {
            max-width: 100vw !important;
            min-width: unset !important;
            padding: 1.1rem 0.23rem 0.67rem !important;
            border-radius: 14px !important;
            box-shadow: 0 0 32px #FFD70022;
            font-size: 15.1px;
          }
        }
        @media (max-width: 378px) {
          .upload-asset-form {
            padding: 0.48rem 0.05rem 0.2rem !important;
            border-radius: 8px !important;
            font-size: 13.4px;
          }
        }
      `}</style>
    </Modal>
  );
}

export default UploadAssetModal;
