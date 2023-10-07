import { setAccessToken, signout } from "@client/features/authSlice";
import { RootState } from "@client/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult: any = await baseQuery(
          "/auth/refresh-token",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setAccessToken(refreshResult.data.accessToken));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(signout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
