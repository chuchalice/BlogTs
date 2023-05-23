import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { articleState } from "../../types/articles";
// import { articleInterface } from "../../interfaces/article";
// import { fetchUsers } from "../action-creators/articleAtions";

const initialState: articleState = {
  articles: [],
  loading: false,
  error: null,
  offset: 0,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
  },
});


export default articleSlice.reducer;
export const { setOffset } = articleSlice.actions;
