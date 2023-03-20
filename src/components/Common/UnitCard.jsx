import { Box } from "@mui/material";
import React from "react";
import { formatTimeInMinutes, microsoftLearnUrl } from "../../utils";

export default function UnitCard(props) {
  const { unit } = props;
  return (
    <Box
      sx={{
        paddingLeft: ".75rem",
        borderLeft: "3px solid #e6e6e6",
        ":hover": {
          paddingLeft: ".75rem",
          borderLeft: "3px solid #0d6efd",
        },
      }}
    >
      <h4 className="h6 mb-1 link-primary">
        <a
          href={microsoftLearnUrl + unit.url}
          className="text-decoration-none"
          target="_blank"
          rel="noreferrer"
        >
          {unit.title}
        </a>
      </h4>
      <p>{formatTimeInMinutes(unit.durationInMinutes)}</p>
    </Box>
  );
}
