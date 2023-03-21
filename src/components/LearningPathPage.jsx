import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { getLearningPathById } from "../proxy-service";
import {
  compareHistory,
  getDerivedPropsLearningPath,
  historyLimit,
} from "../utils";
import CenterComponent from "./Common/CenterComponent";
import LearningPathHeader from "./Common/LearningPathHeader";
import ModuleCard from "./Common/ModuleCard";
import NotFound from "./Common/NotFound";

export default function LearningPathPage(props) {
  const { uid } = useParams();
  const [learningPath, setLearningPath] = useState(undefined);
  const { history, setAppActions } = useContext(AppContext);
  const headerProps = getDerivedPropsLearningPath(learningPath);

  useEffect(() => {
    if (uid) {
      getLearningPathById(uid).then((result) => setLearningPath(result));
    }
  }, [uid]);

  useEffect(() => {
    if (learningPath) {
      var appActions = {
        history: [
          {
            uid: learningPath.uid,
            type: learningPath.type,
            title: learningPath.title,
            lastOpened: new Date(),
            captionItems:
              getDerivedPropsLearningPath(learningPath).captionItems,
          },
          ...history
            .filter((item) => item.uid !== learningPath.uid)
            .slice(0, historyLimit - 1),
        ],
      };

      if (!compareHistory(appActions.history, history)) {
        setAppActions(appActions);
      }
    }
  }, [learningPath]);

  if (learningPath === null) {
    return <NotFound />;
  }

  if (learningPath === undefined) {
    return (
      <CenterComponent>
        <CircularProgress className="mx-auto" />;
      </CenterComponent>
    );
  }

  return (
    <div className="w-100">
      <LearningPathHeader
        className="border mx-5 my-4 p-3 p-md-5"
        learningPath={learningPath}
        {...headerProps}
      />
      <div className="w-75 mx-auto">
        <h2 className="h4 my-4">Modules in this learning path</h2>
        <div className="my-3">
          {learningPath.modules.map((module, ix) => (
            <div key={module.uid} className="my-3">
              <ModuleCard module={module} overviewExpanded={ix === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
