import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "@client/features/authSlice";
import resumeReducer from "@client/features/resumeSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@client/services/auth";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { experienceApi } from "@client/services/resume/experience";
import { baseApi } from "@client/services/api";

const persistConfig = { key: "root", storage };

const allReducers = {
  auth: authReducer,
  resume: resumeReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  // [experienceApi.reducerPath]: experienceApi.reducer,
};
const combinedReducer = combineReducers(allReducers);

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
export const persister = persistStore(store);
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
export default store;
