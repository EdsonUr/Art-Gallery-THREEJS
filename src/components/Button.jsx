import React from "react";

export default function Button({ onClick, text }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        opacity: 1,
        transition: "opacity 1s ease-in-out",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={onClick}
        style={{
          fontSize: "24px",
          padding: "14px 28px",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          border: "2px solid white",
          cursor: "pointer",
          borderRadius: "12px",
          transition: "transform 0.3s ease-in-out",
          fontWeight: "bold",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {text}
      </button>
    </div>
  );
}
