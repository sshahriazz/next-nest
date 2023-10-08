import { authApi } from "@client/services/auth";
import type { RootState } from "@client/store";
import { User } from "@client/types/api/response";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";

// Define a type for the slice state
interface AuthInterface {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Define the initial state using that type
const initialState: AuthInterface = {
  user: {
    id: "",
    firstname: "",
    role: [],
    lastname: "",
    email: "",
  },
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      console.log("setAccessToken", action.payload);

      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    signout: (state) => {
      state.user = {
        id: "",
        firstname: "",
        role: [],
        lastname: "",
        email: "",
      };
      state.accessToken = "";
      state.refreshToken = "";
      setCookie("accessToken", null);
      setCookie("refreshToken", null);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signin.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
        state.accessToken = payload.data.tokens.accessToken;
        state.refreshToken = payload.data.tokens.refreshToken;
      }
    );
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
        state.accessToken = payload.data.tokens.accessToken;
        state.refreshToken = payload.data.tokens.refreshToken;
      }
    );
  },
});

export const { setUser, setAccessToken, setRefreshToken, signout } =
  authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
