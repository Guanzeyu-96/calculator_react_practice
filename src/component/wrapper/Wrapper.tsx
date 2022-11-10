import React from "react";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="wrapper">{children}</div>;
};
