// import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import thunk from "redux-thunk";
import { articleAPI } from "../services/articleService";
import { rootReducer } from "./redcers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(articleAPI.middleware),
  });
};
