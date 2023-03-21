import React from "react";
import { NavLink } from "react-router-dom";

export default function RecentItem(props) {
  const { uid, title, type, captionItems, lastOpened } = props;

  return (
    <div className="border bg-white p-2">
      <div className="d-flex justify-content-between">
        <h2 className="h5">
          <NavLink className={"text-decoration-none"} to={`/${type}/${uid}`}>
            {title}
          </NavLink>
        </h2>
        <p className="small text-muted mb-0">{lastOpened.toLocaleString()}</p>
      </div>
      <p className="small text-muted mb-0">
        {captionItems?.filter((i) => i).join(" • ")}
      </p>
    </div>
  );
}
