import { baseApi } from "../api";

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    create: builder.mutation<any, any>({
      query: (body) => ({
        url: "resume/experience",
        method: "POST",
        body,
      }),
    }),
    update: builder.mutation<any, any>({
      query: (body) => ({
        url: "resume/experience",
        method: "PUT",
        body,
      }),
    }),
    delete: builder.mutation<any, any>({
      query: (id) => ({
        url: `resume/experience/${id}`,
        method: "DELETE",
      }),
    }),
    fineOne: builder.query<any, any>({
      query: (id) => ({
        url: `resume/experience/${id}`,
        method: "GET",
      }),
    }),
    findAll: builder.query<any, any>({
      query: () => ({
        url: `resume/experience`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
  useFineOneQuery,
  useFindAllQuery,
} = experienceApi;
