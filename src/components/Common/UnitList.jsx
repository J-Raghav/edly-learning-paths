import React from "react";
import UnitCard from "./UnitCard";

export default function UnitList(props) {
  const { units } = props;
  return (
    <div className="my-3">
      {units.map((unit) => (
        <div key={unit.uid}>
          <UnitCard unit={unit} />
        </div>
      ))}
    </div>
  );
}
