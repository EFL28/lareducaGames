import React, { useState, useEffect } from "react";
import axios from "axios";

import * as Tone from "tone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PianoTiles from "../components/MusicGame/PianoTiles";
import "../index.css";

const MusicGame = () => {
  const [sequence, setSequence] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const user_id = params.get("user_id");

  useEffect(() => {
    generateSequence();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      let note;
      switch (event.key) {
        case "a":
          note = "C4";
          break;
        case "s":
          handleUserInput("D4");
          break;
        case "d":
          handleUserInput("E4");
          break;
        case "f":
          handleUserInput("F4");
          break;
        case "g":
          handleUserInput("G4");
          break;
        case "h":
          handleUserInput("A4");
          break;
        case "j":
          handleUserInput("B4");
          break;
        case "k":
          handleUserInput("C5");
          break;
        case "l":
          handleUserInput("D5");
          break;
        case "ñ":
          handleUserInput("E5");
          break;
        case "w":
          handleUserInput("C#4");
          break;
        case "e":
          handleUserInput("D#4");
          break;
        case "t":
          handleUserInput("F#4");
          break;
        case "y":
          handleUserInput("G#4");
          break;
        case "u":
          handleUserInput("A#4");
          break;
        case "o":
          handleUserInput("C#5");
          break;
        case "p":
          handleUserInput("D#5");
          break;
        default:
          break;
      }
      if (note) {
        handleUserInput(note);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sequence, currentNoteIndex]);

  // function to generate a random sequence of notes
  const generateSequence = () => {
    const notes = [
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
      "C5",
      "D5",
      "E5",
      "C#4",
      "D#4",
      "F#4",
      "G#4",
      "A#4",
      "C#5",
      "D#5",
    ];
    const newSequence = Array.from(
      { length: 4 },
      () => notes[Math.floor(Math.random() * notes.length)]
    );
    setSequence(newSequence);
  };

  // function to play the sequence generated before
  const playSequence = () => {
    console.log(sequence);
    const synth = new Tone.Synth().toDestination();
    sequence.forEach((note, index) => {
      setTimeout(() => {
        setCurrentNote(note);
        synth.triggerAttackRelease(note, "8n");
      }, index * 500);
    });

    setTimeout(() => {
      setCurrentNote(null);
    }, sequence.length * 500);
  };

  const playNote = (note) => {
    switch (note) {
      case "C4":
        new Tone.Synth().toDestination().triggerAttackRelease("C4", "8n");
        break;
      case "D4":
        new Tone.Synth().toDestination().triggerAttackRelease("D4", "8n");
        break;
      case "E4":
        new Tone.Synth().toDestination().triggerAttackRelease("E4", "8n");
        break;
      case "F4":
        new Tone.Synth().toDestination().triggerAttackRelease("F4", "8n");
        break;
      case "G4":
        new Tone.Synth().toDestination().triggerAttackRelease("G4", "8n");
        break;
      case "A4":
        new Tone.Synth().toDestination().triggerAttackRelease("A4", "8n");
        break;
      case "B4":
        new Tone.Synth().toDestination().triggerAttackRelease("B4", "8n");
        break;
      case "C5":
        new Tone.Synth().toDestination().triggerAttackRelease("C5", "8n");
        break;
      case "D5":
        new Tone.Synth().toDestination().triggerAttackRelease("D5", "8n");
        break;
      case "E5":
        new Tone.Synth().toDestination().triggerAttackRelease("E5", "8n");
        break;
      case "C#4":
        new Tone.Synth().toDestination().triggerAttackRelease("C#4", "8n");
        break;
      case "D#4":
        new Tone.Synth().toDestination().triggerAttackRelease("D#4", "8n");
        break;
      case "F#4":
        new Tone.Synth().toDestination().triggerAttackRelease("F#4", "8n");
        break;
      case "G#4":
        new Tone.Synth().toDestination().triggerAttackRelease("G#4", "8n");
        break;
      case "A#4":
        new Tone.Synth().toDestination().triggerAttackRelease("A#4", "8n");
        break;
      case "C#5":
        new Tone.Synth().toDestination().triggerAttackRelease("C#5", "8n");
        break;
      case "D#5":
        new Tone.Synth().toDestination().triggerAttackRelease("D#5", "8n");
        break;
      default:
        break;
    }
  };

  const saveScore = async () => {
    const formatDateForMySQL = (date) => {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    };
  
    const startTime = new Date();
    const endTime = new Date();
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/game-results",
        {
          game_id: 1,
          user_id: user_id,
          score: score,
          start_time: formatDateForMySQL(startTime),
          end_time: formatDateForMySQL(endTime),
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  

  useEffect(() => {
    if (attempts === 3) {
      console.log("Game over!");
      alert("Has fallado 3 veces, fin del juego");
      setGameOver(true);
    }
  }, [attempts]); // Depend on attempts

  useEffect(() => {
    if (gameOver) {
      saveScore();
    }
  }, [gameOver]); // Depend on gameOver

  // function to check if the user's input matches the sequence
  const checkSequence = (note) => {
    if (!gameOver) {
      if (note === sequence[currentNoteIndex]) {
        // La nota es correcta, pasa a la siguiente nota
        setCurrentNoteIndex(currentNoteIndex + 1);
        const newScore = score + 1;
        setScore(newScore);
        console.log("Puntuación: ", score);

        if (currentNoteIndex + 1 === sequence.length) {
          // La secuencia completa fue tocada correctamente
          console.log("Sequence completed!");
          // Aquí puedes hacer algo para indicar que la secuencia fue tocada correctamente
          alert("Secuencia completada correctamente");
          setGameOver(true);
          //generateSequence();
          //setCurrentNoteIndex(0);
          //saveScore();
        }
      } else {
        // La nota es incorrecta, reinicia la secuencia
        console.log("Incorrect note!");
        setAttempts((currentAttempts) => {
          const newAttempts = currentAttempts + 1;
          console.log("Intentos: ", newAttempts);
          return newAttempts;
        });
        setCurrentNoteIndex(0);
        // Aquí puedes hacer algo para indicar que la nota fue incorrecta
      }
    } else {
      saveScore();
    }
  };

  const handleUserInput = (note) => {
    // se ha reproducido la secuncia generada, ahora el usuario debera repetirla en el piano y se comprobara si es correcta
    playNote(note);
    console.log("Nota clickada: ", note);
    console.log(
      "Orden de la secuencia a repetir: ",
      sequence[currentNoteIndex]
    );
    checkSequence(note);
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
            <p className="text-white font-bold text-center mb-4">Piano</p>

            <PianoTiles
              handleTileClick={handleUserInput}
              currentNote={currentNote}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicGame;
