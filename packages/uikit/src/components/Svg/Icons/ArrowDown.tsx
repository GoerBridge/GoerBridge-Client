import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 21 11" {...props}>
      <path d="M2 1.5L10.8643 8.5L19 1.5" stroke="white" strokeWidth="3" strokeLinecap="round" fill="transparent" />
    </Svg>
  );
};

export default Icon;
