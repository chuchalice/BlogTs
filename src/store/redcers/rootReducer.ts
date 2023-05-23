import { combineReducers } from "@reduxjs/toolkit";
import { setupStore } from "..";
import articleReducer from "./articleReducer";
import { articleAPI } from "../../services/articleService";
import userSlice from "./userSlice";

export const rootReducer = combineReducers({
  articleReducer,
  userSlice,
  [articleAPI.reducerPath]: articleAPI.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
