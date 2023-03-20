import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LearningPathPage from "./components/LearningPathPage";
import ModulePage from "./components/ModulePage";

function App() {
  return (
    <div>
      <Routes>
        <Route key={"/"} path={"/"} element={<Home />} exact />
        <Route
          key={"/learning-path"}
          path={"/learning-path/:uid"}
          element={<LearningPathPage />}
        />{" "}
        <Route
          key={"/learning-path"}
          path={"/learning-path/:uid"}
          element={<LearningPathPage />}
        />
        <Route key={"/module"} path={"/module/:uid"} element={<ModulePage />} />
      </Routes>
    </div>
  );
}

export default App;
