import { baseApi } from "./api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    user: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "PATCH",
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDeleteUserMutation,
  useUserQuery,
  useUsersQuery,
  useUpdateUserMutation,
} = userApi;
