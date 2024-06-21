import React from "react";
import "./loaderSpin.scss";
// import RotatingText from "./RotatingText";
import { useState } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import CircleLoader from "react-spinners/CircleLoader";

const LoaderSpin = () => {
  return (
    <div className="loader">
      {/* <ClipLoader color={"#123abc"} loading={true} size={50} /> */}
      {/* <RotatingText text="XSUSTAIN." /> */}
      <CircleLoader color={"#123abc"} loading={true} size={50} />
    </div>
  );
};

export default LoaderSpin;
