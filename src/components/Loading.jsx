import React from "react";
import loading from "../assets/loading.webp";

function Loading() {
  return (
    <div className="loading-page">
      <img src={loading} alt="loading" />
    </div>
  );
}

export default Loading;
