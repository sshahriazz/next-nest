"use client";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useAppDispatch, useAppSelector } from "@client/store/hooks";
import { signout } from "@client/features/authSlice";

function ProfileDropdown() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  function handleSignout() {
    dispatch(signout());
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
          {user.email}
        </DropdownItem>
        <DropdownItem textValue="My Settings" key="settings">
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
