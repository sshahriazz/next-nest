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

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
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
  );
}
