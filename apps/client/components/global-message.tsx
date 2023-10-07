import React from "react";
import { Flex, FlexItem } from "@client/components/flex";
import { Chip } from "@nextui-org/chip";

export default function GlobalMessage() {
  return (
    <Flex justify="center" align="center">
      <FlexItem className="text-primary self-center align-middle">
        <Chip size="sm">Chip</Chip>Global Message
      </FlexItem>
    </Flex>
  );
}
