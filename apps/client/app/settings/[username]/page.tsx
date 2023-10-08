import React from "react";

function MySettings({ params }: { params: { username: string } }) {
  return <div>MySettings {params.username}</div>;
}

export default MySettings;
