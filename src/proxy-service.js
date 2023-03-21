import axios from "axios";
import {
  corsProxy,
  createProductTypeQuery,
  microsoftLearnUrl,
  proxyEnabled,
} from "./utils";

export function getLearningPaths(selectedProducts) {
  const msLearnAPI = `/api/contentbrowser/search?environment=prod&locale=en-us&facet=roles&facet=levels&facet=products&facet=subjects&facet=resource_type&$filter=((resource_type eq 'learning path')) ${createProductTypeQuery(
    selectedProducts
  )}&$top=30&showHidden=false&fuzzySearch=false`;

  return responseWrapper(axiosWrapper(msLearnAPI)).then((response) => {
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
  const getByIdUrl = `/api/hierarchy/paths/${uid}?locale=en-us`;

  return responseWrapper(axiosWrapper(getByIdUrl));
}

export function getModuleById(uid) {
  const getByIdUrl = `/api/hierarchy/modules/${uid}?locale=en-us`;

  return responseWrapper(axiosWrapper(getByIdUrl));
}

function axiosWrapper(url) {
  return axios({
    url: proxyEnabled() ? corsProxy : microsoftLearnUrl + url,
    params: proxyEnabled()
      ? {
          url,
        }
      : undefined,
  });
}

function responseWrapper(res) {
  return res.then((response) => {
    if (proxyEnabled()) {
      if (response.data.status?.http_code === 200)
        return JSON.parse(response.data.contents);
      else if (response.data.status?.http_code === 404) {
        return null;
      }

      return;
    }

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      return null;
    }
  });
}
