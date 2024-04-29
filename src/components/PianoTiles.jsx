import React from "react";

const WhiteTile = () => {
  return (
    <button className="z-1 w-8 h-44 md:w-16 md:h-50 lg:w-24 lg:h-68 bg-white rounded-md rounded-t-none mr-1 cursor-pointer hover:bg-gray-300 focus:outline-none first:rounded-t-md last:rounded-t-md" />
  );
};

const BlackTile = ({ responsiveData }) => {
  return <button className={`absolute ${responsiveData} bg-black rounded-md rounded-t-none hover:bg-blue-300`}/>;
};

const PianoTiles = () => {
  const whiteTiles = new Array(10).fill(0);
  const blackTiles = new Array(7).fill(0);
  const blackTilesPos = [
    "ml-6 w-5 h-28 md:ml-13 md:w-8 md:h-36 lg:ml-18 lg:w-10 lg:h-44",
    "ml-15 w-5 h-28 md:ml-30 md:w-8 md:h-36 lg:ml-45 lg:w-10 lg:h-44",
    "ml-34 w-5 h-28 md:ml-62 md:w-8 md:h-36 lg:ml-88 lg:w-10 lg:h-44",
    "ml-42 w-5 h-28 md:ml-82 md:w-8 md:h-36 lg:ml-98 lg:w-10 lg:h-44",
    "ml-50 w-5 h-28 md:ml-90 md:w-8 md:h-36 lg:ml-110 lg:w-10 lg:h-44",
    "ml-68 w-5 h-28 md:ml-100 md:w-8 md:h-36 lg:ml-130 lg:w-10 lg:h-44",
    "ml-76 w-5 h-28 md:ml-120 md:w-8 md:h-36 lg:ml-140 lg:w-10 lg:h-44",
  ]

  return (
    <>
      <div id="keys" className="flex relative">
        {/* White tiles */}
        {whiteTiles.map((_, index) => (
          <WhiteTile key={index} />
        ))}

        {/* Black tiles */}
        {blackTiles.map((_, index) => (
            <BlackTile key={index} responsiveData={blackTilesPos[index]} />
        ))}
      </div>
    </>
  );
};

export default PianoTiles;
