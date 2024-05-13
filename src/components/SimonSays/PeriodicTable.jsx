import React from "react";
import data from "./PeriodicTableFull.json";
import Response from "./Response";

import "./periodicTable.css";

const colorMap = {
  "noble gas": "#FFBC42",
  "alkaline earth metal": "#EC674E",
  "diatomic nonmetal": "#D81159",
  "alkali metal": "#8F2D56",
  "transition metal": "#58586B",
  "post-transition metal": "#218380",
  lanthanide: "#4AABAF",
  metalloid: "#73D2DE",
};

const PeriodicTable = () => {
  return (
    <>
    <div className="periodic-table flex justify-center">
      {data.elements.map((element) => (
        <div
          className="element"
          key={element.name}
          style={{
            gridRow: element.ypos,
            gridColumn: element.xpos,
            borderColor: colorMap[element.category],
            cursor: "pointer",
          }}
        >
          <strong className="text-xl">{element.symbol}</strong>
          <small className="number">{element.number}</small>
          <small className="name">{element.name}</small>
        </div>
      ))}
    </div>
    <Response />
    
    </>
    
  );
};

export default PeriodicTable;