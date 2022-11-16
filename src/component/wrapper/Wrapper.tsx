import React from "react";
import { useClick } from "../../hooks/use-click";
import { keyboardMapper } from "../../constant/keyboardMapper";

export const Wrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { onClick } = useClick();

  // 支持键盘输入
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (keyboardMapper[event.key as string] !== undefined) {
      onClick(keyboardMapper[event.key as string]);
    }
  };

  return (
    <div className="wrapper" tabIndex={0} onKeyDown={onKeyDown}>
      {children}
    </div>
  );
};
