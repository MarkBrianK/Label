import React from "react";
import "../Assets/Styles/Button.css";

function Button({ children, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button  className="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
