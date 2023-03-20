import React, { useState } from "react";
import UnitList from "./UnitList";
import ModuleHeader from "./ModuleHeader";
import { Link } from "@mui/material";

export default function ModuleCard(props) {
  const { module } = props;
  const [overviewExpanded, setOverviewExpanded] = useState(
    props.overviewExpanded
  );

  return (
    <ModuleHeader
      module={module}
      className="border shadow shadow-sm p-3 p-md-5"
    >
      <Link
        onClick={() => setOverviewExpanded(!overviewExpanded)}
        className="d-block link-dark text-decoration-none mt-3"
        title={`${overviewExpanded ? "Show" : "Hide"} units`}
      >
        {`Overview ${overviewExpanded ? "-" : "+"}`}
      </Link>
      {overviewExpanded ? <UnitList units={module.units} /> : null}
    </ModuleHeader>
  );
}
