import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserData, IUserInterface } from "../../interfaces/article";

const userData: IUserData = JSON.parse(
  localStorage.getItem("userData") || "null"
);
const isLogin = JSON.parse(localStorage.getItem("isLogin") || "null");

const initialState: IUserInterface = {
  username: userData?.username,
  email: userData?.email,
  password: userData?.password,
  isLogin: isLogin || false,
  avatar: userData?.image,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IUserData>) {
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      if (action.payload.email) {
        state.email = action.payload.email;
      }
      if (action.payload.password) {
        state.password = action.payload.password;
      }
      if (action.payload.image) {
        state.avatar = action.payload.image;
      }
    },
    setLogStatus(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { setLogStatus, setUserData } = userSlice.actions;
