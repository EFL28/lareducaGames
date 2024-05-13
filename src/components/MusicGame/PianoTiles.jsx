import React from "react";
import * as Tone from "tone";

const notesWhite = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];
const notesBlack = ["C#4", "D#4", "F#4", "G#4", "A#4", "C#5", "D#5"];
const synth = new Tone.Synth().toDestination();

const teclas = {
  'C4': 'A',
  'D4': 'S',
  'E4': 'D',
  'F4': 'F',
  'G4': 'G',
  'A4': 'H',
  'B4': 'J',
  'C5': 'K',
  'D5': 'L',
  'E5': 'Ñ',
  'C#4': 'W',
  'D#4': 'E',
  'F#4': 'T',
  'G#4': 'Y',
  'A#4': 'U',
  'C#5': 'O',
  'D#5': 'P'
};


const WhiteTile = ({ onClick, note, letter }) => {
  return (
    <button className="z-1 w-8 h-44 md:w-16 md:h-50 lg:w-24 lg:h-68 bg-white rounded-md rounded-t-none mr-1 cursor-pointer hover:bg-gray-300 focus:outline-none first:rounded-t-md last:rounded-t-md" onClick={() => onClick(note)}>
      {letter}
    </button>
  );
};

const BlackTile = ({ responsiveData, onClick, note, letter}) => {
  return (
    <button className={`text-white absolute ${responsiveData} bg-black rounded-md rounded-t-none hover:bg-blue-300`} onClick={() => onClick(note)}>
    {letter}
    </button>
  );
};

const PianoTiles = ({handleTileClick}) => {
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
          <WhiteTile key={index} note={notesWhite[index]} onClick={handleTileClick} letter={teclas[notesWhite[index]]} />
        ))}

        {/* Black tiles */}
        {blackTiles.map((_, index) => (
          <BlackTile key={index} note={notesBlack[index]} onClick={handleTileClick} letter={teclas[notesBlack[index]]} responsiveData={blackTilesPos[index]} />
        ))}
      </div>
    </>
  );
};

export default PianoTiles;
