import { Box } from "@mui/material";
import React from "react";
import StartButton from "./StartButton";

export default function LearningPathHeader(props) {
  const {
    learningPath,
    iconUrl,
    captionItems,
    tags,
    className,
    titleSize,
    hideSummary,
    sx,
  } = props;
  return (
    <Box
      sx={sx}
      className={`row justify-content-center align-items-start bg-white ${className}`}
    >
      <img
        className="d-block col-12 col-md-3 px-3 mb-3 mb-md-0"
        style={{ maxWidth: "10rem" }}
        src={iconUrl}
        alt={learningPath.title}
      />
      <div className="col-12 col-md-9 d-flex flex-column px-3">
        <div>
          <h1 className={`text-dark ${titleSize || "h1"}`}>
            {learningPath.title}
          </h1>
          <p className="text-muted fs-6 mb-2 me-auto">
            {captionItems?.filter((i) => i).join(" • ")}
          </p>
          {tags && tags.length > 0 ? (
            <div className="mb-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="badge bg-secondary text-capitalize p-2 me-2 mb-2 rounded-0"
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : null}
          {!hideSummary ? <p>{learningPath.summary}</p> : null}
        </div>
        <StartButton url={learningPath.url} />
      </div>
    </Box>
  );
}
