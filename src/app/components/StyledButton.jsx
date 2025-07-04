"use client";
import React from "react";
import PropTypes from "prop-types";

const StyledButton = ({
  onClick,
  children,
  size = "medium",
  disabled = false,
}) => {
  const sizeStyles = {
    small: {
      padding: "6px 20px",
      fontSize: "0.9rem",
    },
    medium: {
      padding: "8px 25px",
      fontSize: "1rem",
    },
    large: {
      padding: "8px 25px",
      fontSize: "1.2rem",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid="search_btn"
      style={{
        backgroundColor: disabled ? "rgba(0, 0, 0, 0.12)" : "var(--main_color)",
        color: disabled ? "rgba(0, 0, 0, 0.26)" : "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.3s ease", // Add transition for smooth animation
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        maxWidth: "300px",
        width: "auto",
        height: "auto",
        ...sizeStyles[size],
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "0.9";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = "1";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        }
      }}
    >
      {children}
    </button>
  );
};

StyledButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
};

export default StyledButton;
