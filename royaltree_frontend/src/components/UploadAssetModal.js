import React, { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import GradientButton from "./GradientButton";
import MockAudioPlayer from "./MockAudioPlayer";

/**
 * PUBLIC_INTERFACE
 * UploadAssetModal - Modal form for entering new digital IP asset details (mock only).
 * @param {boolean} open - Modal visibility state
 * @param {function} onClose - Callback for closing modal (and resetting state)
 * @param {function} onSubmit - Callback after submitting (gets new asset data, even if just demo)
 */
function UploadAssetModal({ open, onClose, onSubmit }) {
  const [step, setStep] = useState("form"); // form | confirm
  const [fields, setFields] = useState({
    name: "",
    creator: "",
    type: "Music",
    ownership: "30",
    royalty: "3.5",
    image: "",
    audio: "",
  });
  const [uploadPreview, setUploadPreview] = useState({ image: "", audio: "" });

  // Reset state on open (except if still open)
  React.useEffect(() => {
    if (!open) {
      setStep("form");
      setFields({
        name: "",
        creator: "",
        type: "Music",
        ownership: "30",
        royalty: "3.5",
        image: "",
        audio: "",
      });
      setUploadPreview({ image: "", audio: "" });
    }
  }, [open]);

  // Handle form submission
  const handleSubmit = () => {
    setStep("confirm");
    // Pass up new asset (shape matches mockAssets)
    const nextAsset = {
      id: `mock-new-${Date.now()}`,
      image: uploadPreview.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
      audio: uploadPreview.audio,
      title: fields.name || "Untitled New Asset",
      subtitle: fields.type,
      owner: fields.creator || "You",
      estRoyalty: Number(fields.royalty) || 1.0,
      ownership: Math.min(1, Math.max(0, Number(fields.ownership) / 100)),
      badges: [
        {
          key: "ownership",
          text: `${fields.ownership || "0"}% Owned`,
          style: { background: "rgba(0,255,194,0.13)", color: "#00FFC2" }
        },
        {
          key: "est",
          text: `Est. ${fields.royalty || "0"}%/yr`,
          style: { background: "rgba(255,215,0,0.13)", color: "#FFD700" }
        }
      ],
      stats: {
        userEarnings: 0,
        totalRoyalty: 0,
        userOwnership: Math.min(1, Math.max(0, Number(fields.ownership) / 100))
      }
    };
    setTimeout(() => onSubmit(nextAsset), 800);
  };

  const handleFieldChange = name => e => {
    const value = e.target.value;
    setFields(f => ({ ...f, [name]: value }));
  };

  // Image upload mock (preview only)
  const handleImageUpload = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // Audio upload mock (simulate - show MockAudioPlayer)
  const handleAudioUpload = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(prev => ({ ...prev, audio: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // InputField list
  const fieldList = [
    {
      name: "name",
      label: "Asset Name",
      placeholder: "e.g. Dreamscape Track",
      required: true,
      value: fields.name,
      onChange: handleFieldChange("name"),
      autoFocus: true
    },
    {
      name: "creator",
      label: "Creator Name",
      placeholder: "e.g. John Doe or group",
      required: true,
      value: fields.creator,
      onChange: handleFieldChange("creator")
    },
    {
      name: "type",
      label: "Asset Type",
      type: "select",
      value: fields.type,
      onChange: handleFieldChange("type"),
      required: true,
      // Below select rendered manually
    },
    {
      name: "ownership",
      label: "Ownership (%)",
      type: "number",
      placeholder: "e.g. 30",
      required: true,
      value: fields.ownership,
      onChange: handleFieldChange("ownership")
    },
    {
      name: "royalty",
      label: "Estimated Royalty (%)",
      type: "number",
      placeholder: "e.g. 3.5",
      required: true,
      value: fields.royalty,
      onChange: handleFieldChange("royalty")
    }
  ];

  // Custom select for type, before afterFields
  function renderTypeField() {
    return (
      <div style={{ marginBottom: 17 }}>
        <label htmlFor="type" style={{
          display: "block", color: "#FFD700", fontSize: 15,
          fontWeight: 600, marginBottom: 7, letterSpacing: 0.005
        }}>Asset Type *</label>
        <select
          id="type"
          name="type"
          value={fields.type}
          onChange={handleFieldChange("type")}
          style={{
            width: "100%",
            border: "none",
            borderRadius: 9,
            background: "rgba(15,16,31,0.38)",
            color: "#fff",
            fontSize: 15.7,
            padding: "10px 15px",
            boxShadow: "0 1px 7px #00FFC210",
            outline: "none",
            marginBottom: 2,
            fontWeight: 500
          }}
        >
          <option value="Music">Music</option>
          <option value="Visual Art">Visual Art</option>
          <option value="Photography">Photography</option>
          <option value="Literature">Literature</option>
          <option value="Video">Video</option>
          <option value="Design">Design</option>
        </select>
      </div>
    );
  }

  // AfterFields section: upload pickers
  const afterFields = (
    <div style={{ display: "flex", gap: 14, marginBottom: 14, flexDirection: "column" }}>
      {/* Image upload */}
      <label style={{ color: "#FFD700", fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
        Asset Image&nbsp;
        <input
          type="file"
          accept="image/*"
          style={{ display: "inline-block", marginLeft: 7 }}
          onChange={handleImageUpload}
        />
      </label>
      {uploadPreview.image && (
        <img
          src={uploadPreview.image}
          alt="Uploaded asset preview"
          style={{
            width: 65,
            height: 65,
            objectFit: "cover",
            borderRadius: 9,
            marginBottom: 2,
            border: "1px solid #FFD70033",
            boxShadow: "0 2px 7px #FFD70011",
            display: "block"
          }}
        />
      )}
      {/* Audio upload */}
      {fields.type === "Music" && (
        <>
          <label style={{ color: "#00FFC2", fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
            Demo Audio (optional)&nbsp;
            <input
              type="file"
              accept="audio/*"
              style={{ display: "inline-block", marginLeft: 7 }}
              onChange={handleAudioUpload}
            />
          </label>
          {uploadPreview.audio && (
            <div style={{ margin: "5px 0" }}>
              <MockAudioPlayer title={fields.name || "Demo Track"} autoPlay={false} style={{ width: 240 }} />
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} maxWidth="500px">
      {step === "form" && (
        <div>
          <div style={{
            fontWeight: 800, fontSize: 21, color: "#FFD700", textAlign: "center", marginBottom: 13
          }}>
            Upload New Asset
          </div>
          <InputForm
            fields={fieldList.filter(f => f.name !== "type")}
            submitLabel="Submit"
            onSubmit={handleSubmit}
            afterFields={
              <>
                {renderTypeField()}
                {afterFields}
              </>
            }
          />
        </div>
      )}
      {step === "confirm" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 800, fontSize: 22, color: "#00FFC2", marginBottom: 20 }}>
            Asset Submitted!
          </div>
          <div style={{ fontSize: 16, color: "#FFD700", marginBottom: 12 }}>
            Your asset has been uploaded (for demo purposes).
          </div>
          <GradientButton wide onClick={() => onClose()}>
            Done
          </GradientButton>
        </div>
      )}
    </Modal>
  );
}

export default UploadAssetModal;
