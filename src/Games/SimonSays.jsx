import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

import SwitchMode from "../components/SimonSays/SwitchMode";
import NumberKeyboard from "../components/SimonSays/NumberKeyboard";
import PeriodicTable from "../components/SimonSays/PeriodicTable";

import acids from "../components/SimonSays/Acids.json";


const SimonSays = () => {
    const switchOn = <FontAwesomeIcon icon={faToggleOn} />;
    const switchOff = <FontAwesomeIcon icon={faToggleOff} />;

    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [gameMode, setGameMode] = useState("math"); // "math" or "chemistry"
    const [score, setScore] = useState(0);

    useEffect(() => {
        generateRandomSequence();
    }, [gameMode]);

    // const [gameState, setGameState] = useState({
    //     game: false,
    //     sequence: [],
    //     playerSequence: [],
    //     round: 0,
    //     score: 0,
    //     message: "Press Start to Play",
    // });

    // const startGame = () => {
    //     setGameState({
    //         game: true,
    //         sequence: [],
    //         playerSequence: [],
    //         round: 0,
    //         score: 0,
    //         message: "Watch the sequence",
    //     });
    //     setTimeout(() => {
    //         nextRound();
    //     }, 1000);
    // };

    // const nextRound = () => {
    //     const newSequence = generateRandomSequence();
    //     setGameState({
    //         ...gameState,
    //         sequence: newSequence,
    //         playerSequence: [],
    //         round: gameState.round + 1,
    //         message: "Watch the sequence",
    //     });
    //     playSequence(newSequence);
    // };

    // const playSequence = (sequence) => {
    //     sequence.forEach((color, index) => {
    //         setTimeout(() => {
    //             playColor(color);
    //         }, index * 1000);
    //     });
    //     setTimeout(() => {
    //         setGameState({
    //             ...gameState,
    //             message: "Repeat the sequence",
    //         });
    //     }, sequence.length * 1000);
    // };

    // const playColor = (color) => {
    //     const button = document.querySelector(`button[data-color="${color}"]`);
    //     button.classList.add("active");
    //     setTimeout(() => {
    //         button.classList.remove("active");
    //     }, 500);
    // };

    const generateRandomSequence = () => {
        if (gameMode === "math") {
            const operations = ["+", "-", "*", "/"];
            const numbers = new Array(10).fill(0).map((_, index) => index);
            const sequence = [];
            let lastElement = "operator";
            for (let i = 0; i < 7; i++) {
                if (lastElement === "operator") {
                    const number = numbers[Math.floor(Math.random() * numbers.length)];
                    sequence.push(number);
                    lastElement = "number";
                } else {
                    const operation = operations[Math.floor(Math.random() * operations.length)];
                    sequence.push(operation);
                    lastElement = "operator";
                }
            }
            setSequence(sequence);
        } else {
            const acid = acids[Math.floor(Math.random() * acids.length)].nombre;
            console.log(acid);
            setSequence(acid);
        }
    };

    const handleSwitchMode = () => {
        setGameMode(gameMode === 'math' ? 'chemistry' : 'math');
    };

    const handleNumberClick = (number) => {
        console.log(number);
    };

    return (
        <>
            <div>
                {/* header */}
                <SwitchMode handleSwitchMode={handleSwitchMode} />

                {/* Container donde se mostraran las secuencias de operaciones o de formulas quimicas*/}
                {/* Ademas de mostrar la puntuación */}
                <div className="border border-black rounded p-5 m-6 relative">
                    {/* Puntuación en la esquina superior derecha */}
                    <div className="absolute top-0 right-0 p-2">
                        Puntuación:
                    </div>

                    {/* Secuencia en el centro */}
                    <div className="flex items-center justify-center h-full">
                        <p className="font-medium text-3xl">
                            {sequence}
                        </p>
                    </div>
                </div>

                {/* Container donde se mostrara la tabla periodica (con sus elementos) o un teclado numerico */}
                {gameMode === "math" ? <NumberKeyboard handleNumberClick={handleNumberClick} /> : <PeriodicTable />}
            </div>
        </>
    );
};

export default SimonSays;