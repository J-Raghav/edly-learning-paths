import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import RecentItem from "./Common/RecentItem";

export default function RecentsPage() {
  const { history } = useContext(AppContext);
  return (
    <div className="p-5">
      <h1 className="h3 mb-4">Recent Items</h1>
      <div>
        {history.map((h) => (
          <div key={h.uid}>
            <RecentItem {...h} />
          </div>
        ))}
      </div>
    </div>
  );
}
