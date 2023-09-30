import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { defaultQueryFn } from "./providers";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: defaultQueryFn,
        },
      },
    })
);
export default getQueryClient;
