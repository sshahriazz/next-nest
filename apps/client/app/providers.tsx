"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import { baseApi } from "@client/services/axios-instance";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const fetcher = async (url: string) => {
  const response = await baseApi.get(url);
  return response.data;
};
// function localStorageProvider() {
//   // When initializing, we restore the data from `localStorage` into a map.
//   const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

//   // Before unloading the app, we write back all the data into `localStorage`.
//   window.addEventListener("beforeunload", () => {
//     const appCache = JSON.stringify(Array.from(map.entries()));
//     localStorage.setItem("app-cache", appCache);
//   });

//   // We still use the map for write & read for performance.
//   return map;
// }

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <div>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          dedupingInterval: 3000,
          fetcher: fetcher,
        }}
      >
        <NextUIProvider>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
        <Toaster />
      </SWRConfig>
    </div>
  );
}
