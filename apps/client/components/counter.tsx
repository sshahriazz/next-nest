"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";

export const Counter = () => {
  const [count, setCount] = useState(2);
  console.log("count", count);
  return (
    <Button radius="full" onPress={() => setCount(count + 1)}>
      Count is {count}
    </Button>
  );
};
