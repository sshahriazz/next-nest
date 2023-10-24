import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center border border-green-500">
      {children}
    </div>
  );
}

export default Layout;
