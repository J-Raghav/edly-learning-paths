import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getModuleById } from "../proxy-service";
import { getDerivedPropsLearningPath } from "../utils";
import CenterComponent from "./Common/CenterComponent";
import LearningPathHeader from "./Common/LearningPathHeader";
import ModuleHeader from "./Common/ModuleHeader";
import NotFound from "./Common/NotFound";
import UnitList from "./Common/UnitList";

export default function ModulePage() {
  const { uid } = useParams();
  const [module, setModule] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      getModuleById(uid).then((result) => setModule(result));
    }
  }, [uid]);

  if (module === null) {
    return <NotFound />;
  }

  if (module === undefined) {
    return (
      <CenterComponent>
        <CircularProgress className="mx-auto" />
      </CenterComponent>
    );
  }

  return (
    <div>
      <button
        className={"btn btn-secondary btn-sm rounded-0"}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <ModuleHeader
        module={module}
        titleSize="h3"
        className="border shadow shadow-sm p-5 m-5 mb-0"
      />
      <div className="row align-items-stretch m-5 mt-0">
        <div className="col-4 border bg-white p-5">
          <div className="">
            <h5 className="h5 mb-3">Units</h5>
            <UnitList units={module.units} />
          </div>
        </div>

        <div className="col-8 border bg-white p-5">
          <div className="">
            <h5 className="h5 mb-3">Related Learning Paths</h5>
            {module.parents?.map((lp) => {
              const headerProps = getDerivedPropsLearningPath(lp);

              return (
                <NavLink
                  key={lp.uid}
                  to={`/learning-path/${lp.uid}`}
                  className={"text-decoration-none"}
                >
                  <LearningPathHeader
                    sx={{
                      ":hover": {
                        outline: "rgba(0, 0, 0, .15) solid 1px;",
                        boxShadow: "0 .5rem 1rem rgba(0, 0, 0, .15);",
                      },
                    }}
                    learningPath={lp}
                    className="align-items-center h-100 p-4"
                    titleSize="h5"
                    hideSummary={true}
                    {...headerProps}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
