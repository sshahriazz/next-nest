import React from "react";
import Skill from "./Skill";

function skills({ skills, config }: { skills: []; config: any }) {
  return (
    <div>
      <Skill skill={skills} config={config} />
    </div>
  );
}

export default skills;
