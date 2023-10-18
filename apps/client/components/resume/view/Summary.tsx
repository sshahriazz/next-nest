import React from "react";
import { ISummary } from "../types";

function Summary({ summary }: { summary: ISummary }) {
  return summary.type === "bullet" ? <div>Bullet</div> : <div>Summary</div>;
}

export default Summary;
