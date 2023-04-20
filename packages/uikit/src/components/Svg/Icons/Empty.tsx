import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
    <path
      opacity="0.2"
      d="M30.2222 32H1.77778V12.4444H5.33333V28.4444H26.6667V12.4444H30.2222V32ZM0 0H32V10.6667H0V0ZM11.5556 14.2222H20.4444C20.9422 14.2222 21.3333 14.6133 21.3333 15.1111V17.7778H10.6667V15.1111C10.6667 14.6133 11.0578 14.2222 11.5556 14.2222ZM3.55556 3.55556V7.11111H28.4444V3.55556H3.55556Z"
      fill="#D2D2DB"
    />
  </Svg>
);

export default Icon;
