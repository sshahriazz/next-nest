"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableColumn,
  TableBody,
} from "@nextui-org/table";

function Users() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>Verified</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default Users;
