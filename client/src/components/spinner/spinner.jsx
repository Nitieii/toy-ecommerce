import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return <ClipLoader size={100} color={"#fbb710"} loading />;
};
export default React.memo(Spinner);
