import React, { useState } from "react";
import Modal from "./Modal";
import GradientButton from "./GradientButton";
import MockAudioPlayer from "./MockAudioPlayer";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PUBLIC_INTERFACE
 * UploadAssetModal - Enhanced modal form for entering new digital IP asset details (mock only).
 * Features modern glassmorphic floating labels, animated type preview,
 * field-level validation, animated feedback, and live preview for asset types.
 *
 * @param {boolean} open - Modal visibility state
 * @param {function} onClose - Callback for closing modal (and resetting state)
 * @param {function} onSubmit - Callback after submitting (gets new asset data, even if just demo)
 */
function UploadAssetModal({ open, onClose, onSubmit }) {
  // Form state and UX-enhanced validation + preview
  const [step, setStep] = useState("form"); // form | anim-success
  const [fields, setFields] = useState({
    name: "",
    creator: "",
    type: "Music",
    ownership: "",
    royalty: "",
  });
  const [uploadPreview, setUploadPreview] = useState({ image: "", audio: "" });
  const [errors, setErrors] = useState({});
  const [submissionFeedback, setSubmissionFeedback] = useState(false);

  // Reset state on open
  React.useEffect(() => {
    if (!open) {
      setStep("form");
      setFields({
        name: "",
        creator: "",
        type: "Music",
        ownership: "",
        royalty: "",
      });
      setUploadPreview({ image: "", audio: "" });
      setErrors({});
      setSubmissionFeedback(false);
    }
  }, [open]);

  // Field validation rules: required + type checks
  function validateForm(nextFields = fields) {
    let err = {};
    if (!nextFields.name.trim()) err.name = "Asset name is required.";
    if (!nextFields.creator.trim()) err.creator = "Creator name is required.";
    if (nextFields.ownership === "") err.ownership = "Ownership % required.";
    else if (isNaN(Number(nextFields.ownership)) || Number(nextFields.ownership) < 0 || Number(nextFields.ownership) > 100)
      err.ownership = "Enter a number between 0 and 100.";
    if (nextFields.royalty === "") err.royalty = "Estimated royalty % required.";
    else if (isNaN(Number(nextFields.royalty)) || Number(nextFields.royalty) < 0)
      err.royalty = "Enter a non-negative number.";
    return err;
  }

  // Animate type icon/image/audio preview for primary modal header
  function getTypeIcon(type) {
    switch (type) {
      case "Music":
        return (
          <motion.span
            key="music"
            initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
            animate={{ scale: 1.12, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ type: "spring", stiffness: 440, damping: 25 }}
            style={{
              color: "#FFD700", fontSize: 32, marginRight: 11, filter: "drop-shadow(0 1px 13px #FFD700dd)"
            }}
            aria-label="Music"
          >🎵</motion.span>
        );
      case "Visual Art":
        return (
          <motion.span
            key="art"
            initial={{ scale: 0.8, opacity: 0, rotate: 18 }}
            animate={{ scale: 1.13, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0, rotate: -20 }}
            transition={{ type: "spring", stiffness: 360, damping: 16 }}
            style={{
              color: "#00FFC2", fontSize: 32, marginRight: 12, filter: "drop-shadow(0 2px 10px #00FFC2bb)"
            }}
            aria-label="Visual Art"
          >🖼️</motion.span>
        );
      case "Photography":
        return (
          <motion.span
            key="photo"
            initial={{ scale: 0.8, opacity: 0, y: -9 }}
            animate={{ scale: 1.05, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            style={{
              color: "#FFD700", fontSize: 28, marginRight: 9
            }}
            aria-label="Photography"
          >📸</motion.span>
        );
      case "Literature":
        return (
          <motion.span
            key="book"
            initial={{ scale: 0.8, opacity: 0, x: -13 }}
            animate={{ scale: 1.1, opacity: 1, x: 0 }}
            exit={{ scale: 0.6, opacity: 0, x: 10 }}
            transition={{ type: "spring", stiffness: 340, damping: 19 }}
            style={{
              color: "#b0afff", fontSize: 30, marginRight: 10
            }}
            aria-label="Literature"
          >📖</motion.span>
        );
      case "Video":
        return (
          <motion.span
            key="vid"
            initial={{ scale: 0.85, opacity: 0, rotate: 13 }}
            animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.7, opacity: 0, rotate: -15 }}
            transition={{ type: "spring", stiffness: 370, damping: 16 }}
            style={{
              color: "#FFD700", fontSize: 29, marginRight: 11
            }}
            aria-label="Video"
          >🎬</motion.span>
        );
      case "Design":
        return (
          <motion.span
            key="design"
            initial={{ scale: 0.76, opacity: 0 }}
            animate={{ scale: 1.11, opacity: 1 }}
            exit={{ scale: 0.76, opacity: 0 }}
            transition={{ type: "spring", stiffness: 370, damping: 20 }}
            style={{
              color: "#00FFC2", fontSize: 27, marginRight: 9
            }}
            aria-label="Design"
          >🎨</motion.span>
        );
      default:
        return null;
    }
  }

  // Form field handlers
  function handleFieldChange(name) {
    return (e) => {
      const value = e.target.value;
      setFields(f => {
        const nextFields = { ...f, [name]: value };
        setErrors(validateForm(nextFields));
        return nextFields;
      });
    };
  }

  // File upload handlers for preview
  function handleImageUpload(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  function handleAudioUpload(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadPreview(prev => ({ ...prev, audio: reader.result }));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // Submission handler: validate and show animated feedback
  function handleSubmit(e) {
    e.preventDefault();
    const err = validateForm();
    setErrors(err);
    if (Object.keys(err).length !== 0) return;

    setSubmissionFeedback(true); // animate feedback
    setStep("anim-success");
    // Pass up new asset (shape matches mockAssets)
    const nextAsset = {
      id: `mock-new-${Date.now()}`,
      image: uploadPreview.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&w=600&q=80",
      audio: uploadPreview.audio,
      title: fields.name,
      subtitle: fields.type,
      owner: fields.creator,
      estRoyalty: Number(fields.royalty),
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
    setTimeout(() => onSubmit(nextAsset), 1050);
  }

  // --- FIELD DEFINITIONS (with floating/animated labels, error hints, helper text, etc.) ---
  const typeOptions = [
    { label: "Music", icon: "🎵" },
    { label: "Visual Art", icon: "🖼️" },
    { label: "Photography", icon: "📸" },
    { label: "Literature", icon: "📖" },
    { label: "Video", icon: "🎬" },
    { label: "Design", icon: "🎨" }
  ];

  // Animated main modal content
  return (
    <Modal open={open} onClose={onClose} maxWidth="500px">
      <AnimatePresence mode="wait" initial={false}>
        {step === "form" && (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="input-form-glass"
            style={{
              background: "linear-gradient(120deg,rgba(30,38,62,0.87) 90%,rgba(0,255,194,0.13))",
              borderRadius: 22,
              border: "1.7px solid #FFD70033",
              boxShadow: "0 7px 45px #FFD70024,0 1.5px 13px #00FFC217",
              padding: "2.1rem 2.5rem 2.3rem 2.5rem",
              width: "100%",
              maxWidth: 470,
              color: "#fafbfa",
              margin: "0 auto"
            }}
            autoComplete="off"
          >
            {/* Main animated type preview and floating modal header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: 0.01,
                marginBottom: 7
              }}>
              {getTypeIcon(fields.type)}
              <span style={{
                background: "linear-gradient(97deg,#FFD700, #00FFC2 67%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 800,
                fontSize: "1.21em",
                lineHeight: 1.13,
                letterSpacing: 0.01
              }}>
                Upload New&nbsp;{fields.type || "Asset"}
              </span>
            </motion.div>
            {/* TYPE FIELD */}
            <div className="floating-input-block" style={{ marginBottom: 23 }}>
              <label htmlFor="type" style={{
                color: "#FFD700", fontWeight: 600, fontSize: 15.8, marginBottom: 7, letterSpacing: 0.005,
                display: "inline-block"
              }}>
                Asset Type <span style={{ color: "#FFD700", fontWeight: 700 }}>*</span>
              </label><br />
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <select
                  id="type"
                  name="type"
                  value={fields.type}
                  onChange={handleFieldChange("type")}
                  required
                  style={{
                    width: "100%",
                    border: "none",
                    borderRadius: 9,
                    background: "rgba(15,16,31,0.48)",
                    color: "#fff",
                    fontSize: 15.7,
                    padding: "11px 15px",
                    fontWeight: 600,
                    boxShadow: "0 1px 8px #FFD70015",
                    outline: "none",
                    appearance: "none"
                  }}
                  aria-label="Choose asset type"
                >
                  {typeOptions.map(opt =>
                    <option value={opt.label} key={opt.label}>{opt.icon} {opt.label}</option>
                  )}
                </select>
              </div>
              <div style={{ color: "#bab9e3", fontSize: 13.2, marginTop: 2, marginLeft: 2 }}>
                For example, "Music" for a song or beat, "Visual Art" for a drawing or painting, etc.
              </div>
            </div>
            {/* NAME FIELD */}
            <div className="floating-input-block" style={{ marginBottom: 20 }}>
              <div style={{ position: "relative" }}>
                <input
                  id="name"
                  type="text"
                  value={fields.name}
                  onChange={handleFieldChange("name")}
                  placeholder=" "
                  required
                  aria-invalid={!!errors.name}
                  style={{
                    width: "100%",
                    background: "rgba(34,35,60,0.74)",
                    border: errors.name ? "1.6px solid #FF5B94" : "1.4px solid #FFD70041",
                    borderRadius: 9,
                    color: "#FFD700",
                    fontSize: 16,
                    padding: "14px 16px 14px 16px",
                    boxShadow: "0 2px 8px #FFD70012",
                    outline: "none"
                  }}
                  autoFocus
                />
                <label htmlFor="name" style={{
                  position: "absolute", left: 16, top: fields.name ? 3 : 16,
                  transition: "all 0.22s cubic-bezier(.61,.17,.38,.97)", fontWeight: 700,
                  color: fields.name ? "#FFD700" : "#bab9e3", fontSize: fields.name ? 13 : 15,
                  pointerEvents: "none"
                }}>
                  Asset Name <span style={{ color: "#FFD700" }}>*</span>
                </label>
              </div>
              <div style={{
                minHeight: 16,
                color: errors.name ? "#FF5B94" : "#bab9e3",
                fontSize: 13.0,
                marginTop: 3,
                marginLeft: 2
              }}>
                {errors.name ? errors.name : "Enter the name of your new asset."}
              </div>
            </div>
            {/* CREATOR FIELD */}
            <div className="floating-input-block" style={{ marginBottom: 20 }}>
              <div style={{ position: "relative" }}>
                <input
                  id="creator"
                  type="text"
                  value={fields.creator}
                  onChange={handleFieldChange("creator")}
                  placeholder=" "
                  required
                  aria-invalid={!!errors.creator}
                  style={{
                    width: "100%",
                    background: "rgba(34,36,67,0.69)",
                    border: errors.creator ? "1.6px solid #FF5B94" : "1.2px solid #FFD70035",
                    borderRadius: 9,
                    color: "#00FFC2",
                    fontSize: 15.7,
                    padding: "14px 16px 14px 16px",
                    boxShadow: "0 0.5px 5px #00FFC215",
                    outline: "none"
                  }}
                />
                <label htmlFor="creator" style={{
                  position: "absolute", left: 16, top: fields.creator ? 3 : 16,
                  transition: "all 0.19s cubic-bezier(.61,.17,.38,.97)", fontWeight: 700,
                  color: fields.creator ? "#00FFC2" : "#bab9e3", fontSize: fields.creator ? 13 : 15,
                  pointerEvents: "none"
                }}>
                  Creator Name <span style={{ color: "#FFD700" }}>*</span>
                </label>
              </div>
              <div style={{
                minHeight: 16,
                color: errors.creator ? "#FF5B94" : "#bab9e3",
                fontSize: 13.0,
                marginTop: 3,
                marginLeft: 2
              }}>
                {errors.creator ? errors.creator : "The creator/artist or group for this asset."}
              </div>
            </div>
            {/* OWNERSHIP FIELD */}
            <div className="floating-input-block" style={{ marginBottom: 20 }}>
              <div style={{ position: "relative" }}>
                <input
                  id="ownership"
                  type="number"
                  min={0}
                  max={100}
                  value={fields.ownership}
                  onChange={handleFieldChange("ownership")}
                  placeholder=" "
                  required
                  aria-invalid={!!errors.ownership}
                  style={{
                    width: "100%",
                    background: "rgba(15,35,31,0.32)",
                    border: errors.ownership ? "1.6px solid #FF5B94" : "1.2px solid #00FFC244",
                    borderRadius: 9,
                    color: "#00FFC2",
                    fontSize: 15.7,
                    padding: "14px 16px 14px 16px",
                    boxShadow: "0 1px 7px #00FFC210",
                    outline: "none"
                  }}
                />
                <label htmlFor="ownership" style={{
                  position: "absolute", left: 16, top: fields.ownership ? 3 : 16,
                  transition: "all 0.21s cubic-bezier(.57,.14,.49,.95)", fontWeight: 700,
                  color: fields.ownership ? "#00FFC2" : "#bab9e3", fontSize: fields.ownership ? 13 : 15,
                  pointerEvents: "none"
                }}>
                  Ownership % <span style={{ color: "#FFD700" }}>*</span>
                </label>
              </div>
              <div style={{
                minHeight: 16,
                color: errors.ownership ? "#FF5B94" : "#bab9e3",
                fontSize: 13.0, marginTop: 3, marginLeft: 2
              }}>
                {errors.ownership
                  ? errors.ownership
                  : "Fraction (%) you wish to fractionalize for investors (0–100)."}
              </div>
            </div>
            {/* ROYALTY FIELD */}
            <div className="floating-input-block" style={{ marginBottom: 17 }}>
              <div style={{ position: "relative" }}>
                <input
                  id="royalty"
                  type="number"
                  min={0}
                  value={fields.royalty}
                  onChange={handleFieldChange("royalty")}
                  placeholder=" "
                  required
                  aria-invalid={!!errors.royalty}
                  style={{
                    width: "100%",
                    background: "rgba(45,32,18,0.18)",
                    border: errors.royalty ? "1.6px solid #FF5B94" : "1.2px solid #FFD70035",
                    borderRadius: 9,
                    color: "#FFD700",
                    fontSize: 15.7,
                    padding: "14px 16px 14px 16px",
                    boxShadow: "0 0.5px 5px #FFD70018",
                    outline: "none"
                  }}
                />
                <label htmlFor="royalty" style={{
                  position: "absolute", left: 16, top: fields.royalty ? 3 : 16,
                  transition: "all 0.17s cubic-bezier(.53,.23,.46,.91)", fontWeight: 700,
                  color: fields.royalty ? "#FFD700" : "#bab9e3", fontSize: fields.royalty ? 13 : 15,
                  pointerEvents: "none"
                }}>
                  Est. Royalty % <span style={{ color: "#FFD700" }}>*</span>
                </label>
              </div>
              <div style={{
                minHeight: 16,
                color: errors.royalty ? "#FF5B94" : "#bab9e3",
                fontSize: 13.0, marginTop: 3, marginLeft: 2
              }}>
                {errors.royalty
                  ? errors.royalty
                  : "Annual estimated royalty for investors (e.g., 3.5)."}
              </div>
            </div>
            {/* --- UPLOAD PREVIEWS --- */}
            <div style={{
              display: "flex", flexDirection: "row",
              gap: 22, margin: "13px 0 0 0",
              alignItems: "flex-start"
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minWidth: 125,
                flex: 1
              }}>
                <label style={{
                  color: "#FFD700",
                  fontWeight: 600,
                  fontSize: 15.5,
                  marginBottom: 1,
                  marginLeft: 3
                }}>
                  Asset Image
                  <span style={{
                    color: "#FFD700",
                    fontWeight: 400,
                    fontSize: 13,
                  }}> (JPG/PNG)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    fontSize: 14,
                    background: "none",
                    color: "#FFD700",
                    marginBottom: 3
                  }}
                  aria-label="Upload asset image"
                />
                {/* Live preview or placeholder */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 11,
                    overflow: "hidden",
                    background: "linear-gradient(107deg,#23223444,#FFD70013 80%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.3px solid #FFD70033",
                    boxShadow: "0 2px 7px #FFD70011",
                  }}
                >
                  {uploadPreview.image ? (
                    <img
                      src={uploadPreview.image}
                      alt="Asset"
                      style={{
                        width: 64, height: 64, objectFit: "cover", borderRadius: 11,
                        border: "none", minHeight: 0
                      }}
                    />
                  ) : (
                    // Glassy icon placeholder
                    <span style={{
                      color: "#FFD700aa", fontSize: 29, opacity: 0.63
                    }}>{getTypeIcon(fields.type)}</span>
                  )}
                </motion.div>
                <span style={{ color: "#bab9e3", fontSize: 12.2, marginTop: 3 }}>
                  Recommended: square image, 64×64 or larger. Shown as preview/cover.
                </span>
              </div>
              {/* Only show audio demo for Music assets type */}
              {fields.type === "Music" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 125 }}>
                  <label style={{
                    color: "#00FFC2",
                    fontWeight: 600,
                    fontSize: 15.5,
                    marginBottom: 1,
                    marginLeft: 3
                  }}>
                    Demo Audio
                    <span style={{
                      color: "#FFD700",
                      fontWeight: 400,
                      fontSize: 13
                    }}> (.mp3, .wav)</span>
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    style={{
                      fontSize: 14,
                      background: "none",
                      color: "#00FFC2",
                      marginBottom: 2
                    }}
                    aria-label="Upload audio demo"
                  />
                  <div>
                    {uploadPreview.audio ? (
                      <MockAudioPlayer title={fields.name || "Demo Track"} autoPlay={false} style={{ width: 130 }} />
                    ) : (
                      <span style={{ color: "#bab9e3", fontSize: 12 }}>
                        No file chosen.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div style={{marginTop: 18}}>
              <GradientButton
                wide
                type="submit"
                disabled={Object.keys(errors).length > 0 || !fields.name || !fields.creator || !fields.ownership || !fields.royalty}
                icon={<span style={{fontSize:18}}>➕</span>}
              >
                Submit Asset
              </GradientButton>
              {/* Feedback for required fields */}
              {Object.keys(errors).length > 0 &&
                <div style={{
                  color: "#FF5B94",
                  fontWeight: 700,
                  fontSize: 14.2,
                  marginTop: 5,
                  minHeight: 16
                }}>
                  Please correct errors before submitting.
                </div>
              }
            </div>
          </motion.form>
        )}
        {step === "anim-success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.77 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.10 }}
            transition={{ type: "spring", stiffness: 320, damping: 23 }}
            style={{
              textAlign: "center",
              padding: "3em 1.2em 2.2em 1.2em",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -33 }}
              animate={{ scale: 1.0, rotate: 0 }}
              transition={{ delay: 0.02, type: "spring", stiffness: 820, damping: 23 }}
              style={{
                marginBottom: 23,
                display: "inline-block"
              }}
            >
              <svg width="82" height="82" viewBox="0 0 82 82"
                style={{
                  borderRadius: "50%",
                  background: "linear-gradient(120deg,#FFD700 61%,#00FFC2 99%)",
                  boxShadow: "0 7px 29px #FFD70043, 0 1.5px 8px #00FFC23b"
                }}>
                <circle cx="41" cy="41" r="36" fill="none" stroke="#fafbf9cc" strokeWidth="6"/>
                <motion.path
                  d="M22 43 L37 58 L59 27"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.22, duration: 0.57, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.33 }}
            >
              <div style={{
                fontWeight: 800, fontSize: 22, color: "#00FFC2", marginBottom: 10
              }}>
                Asset Submitted!
              </div>
              <div style={{
                fontSize: 16,
                color: "#FFD700",
                marginBottom: 12
              }}>
                Your asset has been uploaded (for demo purposes).
              </div>
              <GradientButton wide onClick={onClose} icon={<span style={{fontSize:19}}>✔️</span>}>
                Done
              </GradientButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

export default UploadAssetModal;
