import React from "react";

export default function CenterComponent({ children }) {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-between">
      {children}
    </div>
  );
}
