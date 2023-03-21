import axios from "axios";
import {
  corsProxy,
  createProductTypeQuery,
  microsoftLearnUrl,
  proxyEnabled,
} from "./utils";

export function getLearningPaths(selectedProducts) {
  const msLearnAPI = `https://learn.microsoft.com/api/contentbrowser/search?environment=prod&locale=en-us&facet=roles&facet=levels&facet=products&facet=subjects&facet=resource_type&$filter=((resource_type eq 'learning path')) ${createProductTypeQuery(
    selectedProducts
  )}&$top=30&showHidden=false&fuzzySearch=false`;

  return responseWrapper(
    axios({
      url: proxyEnabled ? corsProxy : microsoftLearnUrl,
      params: proxyEnabled
        ? {
            url: msLearnAPI,
          }
        : undefined,
    })
  ).then((response) => {
    return response.results.map((i) => ({
      ...i,
      type: "learningPath",
      durationInMinutes: i.duration_in_minutes,
      iconUrl: i.icon_url,
      numberOfModules: i.number_of_children,
    }));
  });
}

export function getLearningPathById(uid) {
  const getByIdUrl = `https://learn.microsoft.com/api/hierarchy/paths/${uid}?locale=en-us`;

  return responseWrapper(
    axios({
      url: proxyEnabled ? corsProxy : microsoftLearnUrl,
      params: proxyEnabled
        ? {
            url: getByIdUrl,
          }
        : undefined,
    })
  );
}

export function getModuleById(uid) {
  const getByIdUrl = `https://learn.microsoft.com/api/hierarchy/modules/${uid}?locale=en-us`;

  return responseWrapper(
    axios({
      url: proxyEnabled ? corsProxy : microsoftLearnUrl,
      params: proxyEnabled
        ? {
            url: getByIdUrl,
          }
        : undefined,
    })
  );
}

function responseWrapper(res) {
  return res.then((response) => {
    if (response.data.status?.http_code === 200)
      return JSON.parse(response.data.contents);
    else if (response.data.status?.http_code === 404) {
      return null;
    }

    // Showing error message from proxy.
    alert(response.data);
    throw new Error("Network response was not ok.");
  });
}
