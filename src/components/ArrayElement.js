import { useState } from "react";
import "./ArrayElement.css";

function ArrayElement({config}) {
//   console.log(config);
  return (
    <div
      className="bar"
      style={{
        left: config.left + "px",
        width: config.width + "px",
        bottom: 0,
        height: config.height + "px",
      }}
    ></div>
  );
}

export default ArrayElement;
