import * as React from "react";
import { useAppEvent } from "remax/macro";

import "./app.css";
import * as initialState from "./initialState";

export const AppContext = React.createContext({});

const App = ({ children }) => {
  const [store, setStore] = React.useState(initialState);

  useAppEvent("onLauch", () => {
    wx.cloud.init({
      env: "booktracking",
      traceUser: true,
    });
  });

  return (
    <AppContext.Provider
      value={{
        store,
        setStore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default App;
