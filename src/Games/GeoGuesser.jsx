import React, { useEffect, useState } from "react";
import paises from "../components/GeoGuesser/world.json";

import GeoGame from "../components/GeoGuesser/GeoGame";

const GeoGuesser = () => {
    const [score, setScore] = useState(0);
    const [randomCountry, setCountry] = useState("");
    const [guessedCountry, setGuessedCountry] = useState([]);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        generateRandomCountry();
    }, []);
    
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
                    setGuessedCountry([...guessedCountry, country]);
                    generateRandomCountry();
                }
            }
            // si falla se suma un intento si falla 5 veces se genera un nuevo pais
            else {
                setAttempts(attempts + 1);
                if (attempts === 4) {
                    generateRandomCountry();
                    setAttempts(0);
                }
            }
        };
    }

    const saveScore = async (newScore) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/game-results", {
                game_id: 3,
                user_id: user_id,
                score: newScore,
                start_time: "2023-09-01 14:00:00",
                end_time: "2023-09-01 14:01:00",
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.response.data);
        } finally {
            window.location.href = "http://lareduca2.0.test/games";
        }
    }


    return (
        <>
            <div className="p-4 bg-emerald-400">
                <h1 className="font-bold text-center text-3xl">GeoGuesser</h1>
            </div>
            <div className="p-4 flex justify-between">
                <p className="font-bold text-lg">Contry: {randomCountry}</p>
                <p className="font-bold text-lg">Score: {score}</p>
            </div>

            <GeoGame onCountryClick={onCountryClick} guessedCountry={guessedCountry} />

        </>
    );
}

export default GeoGuesser;