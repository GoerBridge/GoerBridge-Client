import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 20 20" {...props}>
      <path d="M18 2L2 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2L10 10L18 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default Icon;
