import { baseApi } from "./api";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<
      any,
      { firstname: string; lastname: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSigninMutation, useSignupMutation } = authApi;
