import type { RootState } from "@client/store";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserInterface {}

// Define the initial state using that type
const initialState: UserInterface = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectResume = (state: RootState) => state.user;

export default userSlice.reducer;
