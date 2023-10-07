"use client";
import { useAppSelector } from "@client/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!user?.email) {
      router.replace("/auth/signin");
    }
  }, [user]);

  return <>{children}</>;
}

export default AuthGuard;
