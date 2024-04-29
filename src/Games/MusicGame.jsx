import React, { useState, useEffect } from "react";

import * as Tone from "tone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import PianoTiles from "../components/PianoTiles";

import "../index.css";

const MusicGame = () => {
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    generateSequence();
  }, []);

  // function to generate a random sequence of notes
  const generateSequence = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const newSequence = Array.from(
      { length: 4 },
      () => notes[Math.floor(Math.random() * notes.length)]
    );
    setSequence(newSequence);
  };

  // function to play the sequence generated before
  const playSequence = () => {
    generateSequence();
    console.log(sequence);
    const synth = new Tone.Synth().toDestination();
    sequence.forEach((note, index) => {
      synth.triggerAttackRelease(note, "8n", Tone.now() + index * 0.5);
    });
  };

  // function to check if the user's input matches the sequence
  const checkSequence = (input) => {
    if (input.join("") === sequence.join("")) {
      alert("Correct!");
      generateSequence();
    } else {
      alert("Incorrect!");
    }
  };

  return (
    <>
      <div className="bg-stone-500 p-8">
        {/* Titulo del juego */}
        <h1 className="text-3xl font-bold text-white text-center">
          Music Game
        </h1>

        {/* Boton para reproducir la secuencia */}
        <p className="font-semibold text-white text-center p-4">
          Dale al play para reproducir la secuencia a repetir
        </p>

        <div className="flex justify-center items-center flex-col">
          {/* Boton de play */}
          <button
            onClick={playSequence}
            className="m-4 bg-stone-600 hover:bg-stone-700  text-white font-semibold py-8 px-10 rounded-full"
          >
            <FontAwesomeIcon icon={faPlay} size="3x" />
          </button>

          {/* PianoTiles */}
          <div className="border-2 border-black rounded-xl p-4 bg-black">
            <p className="text-white font-bold text-center mb-4">
              Playable piano
            </p>

            <PianoTiles />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicGame;
