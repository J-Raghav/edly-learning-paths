import { createContext } from "react";

export const DEFAULT_USER_ACTION = { history: [] };
const AppContext = createContext(DEFAULT_USER_ACTION);

export default AppContext;
