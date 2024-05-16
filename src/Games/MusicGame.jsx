import React, { useState, useEffect } from "react";
import axios from "axios";

import * as Tone from "tone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PianoTiles from "../components/MusicGame/PianoTiles";
import "../index.css";
import { getCookie } from "../utils/getCookie";

import {jwtDecode} from "jwt-decode";

const MusicGame = () => {
  const [sequence, setSequence] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [score, setScore] = useState(0);
  const token = "BtF3Ad3FTJnWolfXzMet0j7uwuevuIeB5DPdPyAEa3f8d4f7"; // toke to authenticate the user

  useEffect(() => {
    const token = getCookie('XSRF-TOKEN'); // Obtener la cookie aquí
    console.log('Token:', token);
    
    
    if (!token) {

      console.log('no')
      
    } else {
      try {
        // Si hay una cookie, intenta decodificarla para obtener la información del usuario
        const decodedToken = atob(token);
        console.log('Decoded token:', decodedToken);

        //setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        //navigate('');
      }
    }
  }, []);

  useEffect(() => {
    generateSequence();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'a':
        playNote("C4");
        break;
      case "s":
        playNote("D4");
        break;
      case "d":
        playNote("E4");
        break;
      case "f":
        playNote("F4");
        break;
      case "g":
        playNote("G4");
        break;
      case "h":
        playNote("A4");
        break;
      case "j":
        playNote("B4");
        break;
      case "k":
        playNote("C5");
        break;
      case "l":
        playNote("D5");
        break;
      case "ñ":
        playNote("E5");
        break;
      case "w":
        playNote("C#4");
        break;
      case "e":
        playNote("D#4");
        break;
      case "t":
        playNote("F#4");
        break;
      case "y":
        playNote("G#4");
        break;
      case "u":
        playNote("A#4");
        break;
      case "o":
        playNote("C#5");
        break;
      case "p":
        playNote("D#5");
        break;
      default:
        break;
    }
  };

  // function to generate a random sequence of notes
  const generateSequence = () => {
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "C#4", "D#4", "F#4", "G#4", "A#4", "C#5", "D#5"];
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
    try {
      const response = await axios.post("http://localhost:8000/api/game-results", {
        game_id: 1,
        user_id: 16,
        score: score,
        start_time: "2023-09-01 14:00:00",
        end_time: "2023-09-01 14:01:00",
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }, withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }


  // function to check if the user's input matches the sequence
  const checkSequence = (note) => {

    //console.log(sequence[currentNoteIndex]);
    if (note === sequence[currentNoteIndex]) {
      // La nota es correcta, pasa a la siguiente nota
      setCurrentNoteIndex(currentNoteIndex + 1);

      if (currentNoteIndex + 1 === sequence.length) {
        // La secuencia completa fue tocada correctamente
        console.log('Sequence completed!');
        // Aquí puedes hacer algo para indicar que la secuencia fue tocada correctamente
        alert("Secuencia completada correctamente");
        generateSequence();
        setCurrentNoteIndex(0);
        const newScore = score + 1;
        setScore(newScore);
        saveScore(newScore);
      }
    } else {
      // La nota es incorrecta, reinicia la secuencia
      console.log('Incorrect note!');
      setCurrentNoteIndex(0);
      // Aquí puedes hacer algo para indicar que la nota fue incorrecta
    }
  };

  const handleUserInput = (note) => {
    // se ha reproducido la secuncia generada, ahora el usuario debera repetirla en el piano y se comprobara si es correcta
    playNote(note);
    console.log("Nota clickada: ", note);
    console.log("Orden de la secuencia a repetir: ", sequence[currentNoteIndex]);
    checkSequence(note);
  }

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
              Piano
            </p>

            <PianoTiles handleTileClick={handleUserInput} currentNote={currentNote} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicGame;
