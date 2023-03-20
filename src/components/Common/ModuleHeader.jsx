import React from "react";
import { NavLink } from "react-router-dom";
import {
  formatTimeInMinutes,
  microsoftLearnUrl,
  normalizeCamelCase,
} from "../../utils";
import StartButton from "./StartButton";

export default function ModuleHeader(props) {
  const { children, module, className, titleSize } = props;
  const iconUrl = microsoftLearnUrl + module.iconUrl;
  const captionItems = [
    formatTimeInMinutes(module.durationInMinutes),
    normalizeCamelCase(module.type),
    `${module.units.length} Units`,
  ];

  return (
    <div
      className={`row justify-content-center align-items-start bg-white ${className}`}
    >
      <img
        className="d-block col-12 col-md-3 px-3 mb-3 mb-md-0"
        src={iconUrl}
        style={{ maxWidth: "10rem" }}
        alt={module.title}
      />
      <div className="w-75 col-12 col-md-9 px-3">
        <h3 className={`${titleSize || "h5"}`}>
          <NavLink
            className="link-primary text-decoration-none"
            to={`/module/${module.uid}`}
          >
            {module.title}
          </NavLink>
        </h3>
        <p className="text-muted fs-6 mb-2">
          {captionItems.filter((i) => i).join(" • ")}
        </p>
        <p>{module.summary}</p>
        <StartButton url={module.url} />
        {children || null}
      </div>
    </div>
  );
}
