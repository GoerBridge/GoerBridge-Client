import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 16 26" {...props}>
      <path
        d="M11.5 4L3.20711 12.2929C2.81658 12.6834 2.81658 13.3166 3.20711 13.7071L11.5 22"
        stroke="white"
        strokeWidth="5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </Svg>
  );
};

export default Icon;
