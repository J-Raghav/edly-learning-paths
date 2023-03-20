import React from "react";
import { NavLink } from "react-router-dom";
import CenterComponent from "./CenterComponent";

export default function NotFound() {
  return (
    <CenterComponent>
      <div className="shadow bg-white p-3 p-md-5">
        <h1>Not Found</h1>
        <p>Resource you are trying to access doesn't exist</p>
        <NavLink to={"/"} className="btn btn-sm btn-secondary rounded-0">
          Go Back
        </NavLink>
      </div>
    </CenterComponent>
  );
}
