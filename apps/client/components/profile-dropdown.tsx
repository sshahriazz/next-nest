"use client";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDropdown,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import storage from "react-secure-storage";
import { useSWRConfig } from "swr";
import { authPath as cacheKey } from "@client/services/auth-api";
import useUser from "@client/hooks/useUser";

function ProfileDropdown() {
  const router = useRouter();
  const { cache } = useSWRConfig();
  const { data: user, mutate } = useUser();

  function handleSignout() {
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
    storage.clear();
    window.dispatchEvent(new Event("storage"));
    cache.delete(cacheKey);
    mutate(cacheKey);

    router.replace("/auth/signin");
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          textValue="User info"
          key="profile"
          className="h-14 gap-2"
        >
          <p className="font-semibold">Signed in as</p>
          {user && user.email}
        </DropdownItem>
        <DropdownItem
          onClick={() => router.push(`/settings/id`)}
          textValue="My Settings"
          key="settings"
        >
          My Settings
        </DropdownItem>
        <DropdownItem
          onClick={handleSignout}
          textValue="Log Out"
          key="logout"
          color="danger"
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default ProfileDropdown;
