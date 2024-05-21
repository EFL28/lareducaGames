import React, { useEffect, useState } from "react";
import paises from "../components/GeoGuesser/world.json";
import GeoGame from "../components/GeoGuesser/GeoGame";

import axios from "axios";
//import GeoGame from "../components/Geoguesser/GeoGame";

const GeoGuesser = () => {
  const [score, setScore] = useState(0);
  const [randomCountry, setCountry] = useState("");
  const [guessedCountry, setGuessedCountry] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [rounds, setRounds] = useState(0);

  const params = new URLSearchParams(window.location.search);
  const user_id = params.get("user_id");

  useEffect(() => {
    generateRandomCountry();
  }, []);

  useEffect(() => {
    if (rounds === 4) {
      console.log("Game over!");
      alert("Has jugado 5 rondas, fin del juego");
      setGameOver(true);
    }
  }, [attempts]);

  useEffect(() => {
    if (gameOver) {
      saveScore();
    }
  }, [gameOver]);

  const countries = paises.features.map((pais) => {
    return pais.properties.name;
  });

  const generateRandomCountry = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setCountry(countries[randomIndex]);
    console.log("Random country: ", countries[randomIndex]);
  };

  const onCountryClick = (country) => {
    for (let i = 0; i < countries.length; i++) {
      if (randomCountry === country) {
        if (countries[i] === country) {
          console.log("Correcto");
          setScore(score + 1);
          setRounds(rounds + 1);
          setGuessedCountry([...guessedCountry, country]);
          generateRandomCountry();
        }
      }
      // si falla se suma un intento si falla 5 veces se genera un nuevo pais
      else {
        setAttempts(attempts + 1);
        if (attempts === 2) {
          setRounds(rounds + 1);
          generateRandomCountry();
          setAttempts(0);
        }
      }
    }
  };

  const saveScore = async () => {
    const formatDateForMySQL = (date) => {
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const startTime = new Date();
    const endTime = new Date();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/game-results",
        {
          game_id: 3,
          user_id: user_id,
          score: score,
          start_time: formatDateForMySQL(startTime),
          end_time: formatDateForMySQL(endTime),
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } // }finally {
    //     window.location.href = "http://lareduca2.0.test/games";
    // }
  };

  return (
    <>
      <div className="p-4 bg-emerald-400">
        <h1 className="font-bold text-center text-3xl">GeoGuesser</h1>
      </div>
      <div className="p-4 flex justify-between">
        <p className="font-bold text-lg">Contry: {randomCountry}</p>
        <p className="font-bold text-lg">Score: {score}</p>
      </div>

      <GeoGame
        onCountryClick={onCountryClick}
        guessedCountry={guessedCountry}
      />
    </>
  );
};

export default GeoGuesser;
