import { authApi } from "@client/services/auth";
import type { RootState } from "@client/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

// Define a type for the slice state
interface ResumeInterface {
  user: Record<string, any>;
  accessToken: string;
  refreshToken: string;
}

// Define the initial state using that type
const initialState: ResumeInterface = {
  user: {},
  accessToken: "",
  refreshToken: "",
};

export const resumeSlice = createSlice({
  name: "resume",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = resumeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.resume;

export default resumeSlice.reducer;
