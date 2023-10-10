"use client";
import { authPath, getUser } from "@client/services/auth-api";
import useSWR, { useSWRConfig } from "swr";
import storage from "react-secure-storage";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function useUser() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken((prev) => (prev = storage.getItem("accessToken") as string));

    const handleStorage = () => {
      setAccessToken(
        (prev) => (prev = storage.getItem("accessToken") as string)
      );
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return useSWR(
    accessToken ? authPath : null,
    () => getUser({ accessToken: accessToken as string }),
    { refreshInterval: 0 }
  );
}
