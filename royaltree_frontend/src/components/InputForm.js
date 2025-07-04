import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

// PUBLIC_INTERFACE
/**
 * InputForm - Glassmorphism styled form generator.
 * @param {Array} fields Array of {name,label,type,placeholder,value,onChange,required,autoFocus}
 * @param {string} submitLabel
 * @param {Function} onSubmit
 * @param {boolean} loading Show submit animated loader
 * @param {React.Component} afterFields Optional component after fields
 */
function InputForm({
  fields,
  submitLabel = "Submit",
  onSubmit,
  loading,
  afterFields,
}) {
  return (
    <motion.form
      className="input-form-glass"
      onSubmit={e => {
        e.preventDefault();
        if (!loading) onSubmit();
      }}
      style={{
        background: "linear-gradient(120deg,rgba(30,38,62,0.77) 90%,rgba(0,255,194,0.07))",
        borderRadius: 16,
        backdropFilter: "blur(3px)",
        boxShadow: "0 2px 16px rgba(0,255,194,0.08)",
        padding: "1.4rem 2.2rem",
        width: "100%",
        border: "1.2px solid #00FFC230",
        maxWidth: 470,
        color: "#fff",
      }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {fields.map((field, i) => (
        <div key={field.name} style={{ marginBottom: 22 }}>
          <label htmlFor={field.name} style={{
            display: "block",
            color: "#FFD700",
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 7,
            letterSpacing: 0.005
          }}>{field.label}{field.required && " *"}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type ?? "text"}
            autoFocus={!!field.autoFocus}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
            required={field.required}
            style={{
              width: "100%",
              border: "none",
              borderRadius: 9,
              background: "rgba(15,16,31,0.38)",
              color: "#fff",
              fontSize: 15.7,
              padding: "11px 17px",
              boxShadow: "0 1px 7px #00FFC210",
              outline: "none",
              marginBottom: 2,
              fontWeight: 400
            }}
          />
        </div>
      ))}
      {afterFields}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.04, background: "linear-gradient(90deg,#FFD700,#00FFC2 87%)" } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        style={{
          background: "linear-gradient(90deg,#FFD700,#00FFC2 85%)",
          color: "#181828",
          fontWeight: 600,
          fontSize: 17,
          padding: "12px 0",
          border: "none",
          borderRadius: 9,
          width: "100%",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.73 : 1,
          boxShadow: "0 1.5px 16px #FFD70018"
        }}
      >
        {loading ? <span className="blip-loader"></span> : submitLabel}
      </motion.button>
    </motion.form>
  );
}

InputForm.propTypes = {
  fields: PropTypes.array.isRequired,
  submitLabel: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  afterFields: PropTypes.node,
};

export default InputForm;
