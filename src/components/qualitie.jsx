import React from "react";

function Qualitie({ _id, color, name }) {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
}
export default Qualitie;
