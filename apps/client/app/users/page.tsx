"use client";
import React from "react";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableColumn,
  TableBody,
  getKeyValue,
} from "@nextui-org/table";
import useSWR from "swr";

function Users() {
  const { data: users, isLoading } = useSWR<any[]>("/users");
  console.log(users);

  return (
    <Table
      classNames={{
        table: "min-h-[90px]",
      }}
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn key={"firstname"}>NAME</TableColumn>
        <TableColumn key={"email"}>EMAIL</TableColumn>
        <TableColumn key={"role"}>ROLE</TableColumn>
        <TableColumn key={"emailVerified"}>Verified</TableColumn>
      </TableHeader>
      <TableBody
        items={
          users ?? [
            {
              id: 1,
              firstname:
                "Firstname Firstname Firstname Firstname Firstname Firstname",
              email: "Hello",
              role: ["Admin"],
              emailVerified: true,
            },
          ]
        }
        emptyContent="No users found."
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="h-[10px]">
                {JSON.stringify(getKeyValue(item, columnKey))}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default Users;
