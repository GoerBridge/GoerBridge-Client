import React from "react";
import Svg from "../Svg";

const Logo: React.FC<any> = ({ ...props }) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img alt="" className="logo" src="images/logo/logo-text.png" {...props} />
  );
};

export default Logo;
