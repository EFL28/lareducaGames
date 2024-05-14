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

const PeriodicTable = ({handleElementClick, userResponse}) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Enter'];
  return (
    <>
        <div className="numberOptions flex align-middle justify-center">
          {numbers.map((number) => (
            <div className="flex justify-center" key={number} onClick={() => handleElementClick(number)}>
              <div className="cursor-pointer number m-2 w-13 h-13 border border-black flex items-center justify-center">{number}</div>
            </div>
          ))}
        </div>

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
            onClick={() => handleElementClick(element.symbol)}
          >
            <strong className="text-xl">{element.symbol}</strong>
            <small className="number">{element.number}</small>
            <small className="name">{element.name}</small>
          </div>
        ))}
      </div>
      <Response response={userResponse}/>

    </>

  );
};

export default PeriodicTable;