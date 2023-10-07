import type { RootState } from "@client/store";
import { createSlice } from "@reduxjs/toolkit";

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
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = resumeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectResume = (state: RootState) => state.resume;

export default resumeSlice.reducer;
