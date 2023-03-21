export const microsoftLearnUrl = "https://learn.microsoft.com";
export const corsProxy = "https://api.allorigins.win/get";
export const productTypes = [
  "dotnet",
  "azure",
  "vs-code",
  "vs",
  "dynamic-365",
  "github",
  "windows",
  "ms-graph",
];
export const historyLimit = 20;
export const proxyEnabled = loadItemFromLocalStorage("proxyEnabled", true);

export function formatTimeInMinutes(durationInMinutes) {
  if (durationInMinutes < 60) {
    return durationInMinutes + " min";
  }
  return `${parseInt(durationInMinutes / 60)} hr ${durationInMinutes % 60} min`;
}

export function normalizeCamelCase(camelCaseString) {
  let text = camelCaseString.replace(/([A-Z])/g, " $1");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function getDerivedPropsLearningPath(learningPath) {
  if (!learningPath) return;

  const tags = [
    ...(learningPath.levels || []),
    ...(learningPath.roles || []),
    ...(learningPath.products || []),
  ];
  const iconUrl = microsoftLearnUrl + learningPath.iconUrl;
  const numberOfModules =
    learningPath?.modules?.length || learningPath.numberOfModules;
  const captionItems = [
    formatTimeInMinutes(learningPath.durationInMinutes),
    normalizeCamelCase(learningPath.type),
    numberOfModules ? `${numberOfModules} Modules` : undefined,
  ];
  return { iconUrl, captionItems, tags };
}

export function createProductTypeQuery(selectedTypes) {
  if (selectedTypes.length > 0) {
    return (
      " and (" +
      selectedTypes
        .map((name) => `(products/any(t: t eq '${name}'))`)
        .join(" or ") +
      ")"
    );
  }

  return "";
}

export function loadItemFromLocalStorage(key, defaultValue = null) {
  let value = localStorage.getItem(key);
  return value !== null ? JSON.parse(value) : defaultValue;
}

export function storeItemInLocalStorage(key, value) {
  localStorage[key] = JSON.stringify(value);
}

export function compareHistory(h1, h2) {
  return h1.length === h2.length && h1.every((h, ix) => h.uid === h2[ix].uid);
}
