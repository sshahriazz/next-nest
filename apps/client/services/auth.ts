import { LoginRequest, SignupRequest } from "@client/types/api/requests";
import { baseApi } from "./api";
import { AuthResponse, Response } from "@client/types/api/response";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<Response<AuthResponse>, LoginRequest>({
      query: (body) => ({
        url: "/auth/signin",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<Response<AuthResponse>, SignupRequest>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
    }),
    sendVerifyEmail: builder.query({
      query: ({ email, callback }) => ({
        url: `/auth/send-verification-email?email=${email}&callback=${callback}`,
        method: "GET",
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, ...body }) => ({
        method: "POST",
        url: "/auth/update-role/" + id,
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useSigninMutation,
  useSignupMutation,
  useSendVerifyEmailQuery,
  useUpdateRoleMutation,
} = authApi;
