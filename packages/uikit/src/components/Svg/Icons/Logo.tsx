import React from "react";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return <img alt="" className="logo" src="images/logo/logo-icon.png" {...props} />;
};

export default Icon;
