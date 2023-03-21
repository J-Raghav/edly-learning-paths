import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LearningPathPage from "./components/LearningPathPage";
import ModulePage from "./components/ModulePage";
import RecentsPage from "./components/RecentsPage";
import AppContext, { DEFAULT_USER_ACTION } from "./contexts/AppContext";
import { loadItemFromLocalStorage, storeItemInLocalStorage } from "./utils";

function App() {
  const [appActions, setAppActions] = useState(
    loadItemFromLocalStorage("appActions", DEFAULT_USER_ACTION)
  );

  const navigate = useNavigate();

  useEffect(() => {
    storeItemInLocalStorage("appActions", appActions);
  }, [appActions]);

  return (
    <AppContext.Provider value={{ ...appActions, setAppActions }}>
      <div className="d-flex justify-content-between align-items-center pe-3">
        <button
          sx={{ height: "5rem" }}
          className={"btn btn-secondary rounded-0"}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <NavLink className={"text-decoration-none"} to={"/recentItems"}>
          Recent Items
        </NavLink>
      </div>
      <Routes>
        <Route key={"/"} path={"/"} element={<Home />} exact />
        <Route
          key={"/recentItems"}
          path={"/recentItems"}
          element={<RecentsPage />}
        ></Route>
        <Route
          key={"/learningPath"}
          path={"/learningPath/:uid"}
          element={<LearningPathPage />}
        />
        <Route key={"/module"} path={"/module/:uid"} element={<ModulePage />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
