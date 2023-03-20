import React from "react";
import { microsoftLearnUrl } from "../../utils";

export default function StartButton({ url }) {
  return (
    <a
      style={{ maxWidth: "8rem" }}
      href={microsoftLearnUrl + url}
      title={"Open MSLearn resource"}
      className="btn btn-primary fw-semibold text-decoration-none rounded-0 py-1 px-3"
      target={"_blank"}
      rel="noreferrer"
    >
      Start
    </a>
  );
}
