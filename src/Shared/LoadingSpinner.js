import React from "react";
import Styles from "../Assets/Styles/LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={Styles.loadingSpinner}>
      <div className={Styles.spinner}></div>
    </div>
  );
}
