import React, { useState, useEffect } from "react";

import SwitchMode from "../components/SimonSays/SwitchMode";
import NumberKeyboard from "../components/SimonSays/NumberKeyboard";
import PeriodicTable from "../components/SimonSays/PeriodicTable";

import acids from "../components/SimonSays/Chemistry.json";


const SimonSays = () => {

    const [sequence, setSequence] = useState([]);
    const [acidFormula, setAcidFormula] = useState("");
    const [playerAnswer, setPlayerAnswer] = useState([]);
    const [gameMode, setGameMode] = useState("math"); // "math" or "chemistry"
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(0);

    useEffect(() => {
        generateRandomSequence();
        //console.log("Game mode: ", gameMode)
    }, [gameMode]);

    useEffect(() => {
    }, [playerAnswer]);

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
            const result = eval(sequence.join(""));
            const resultRounded = parseFloat(result.toFixed(2));
            setResult(resultRounded);
            console.log("Resultado: ", resultRounded);
        } else {
            const acid = acids[Math.floor(Math.random() * acids.length)];
            console.log("Acido a resolver", acid.nombre);
            setAcidFormula(acid.formula);
            console.log("Formula del acido a resolver", acid.formula);
            setSequence(acid.nombre);
        }
    };

    const handleSwitchMode = () => {
        setGameMode(gameMode === 'math' ? 'chemistry' : 'math');
    };

    const handleNumberClick = (number) => {
        if (gameMode === 'math') {
            if (typeof number === "number" || number === "." || number === "-") {
                setPlayerAnswer([...playerAnswer, number]);
            } else {
                if (number === "=") {
                    const playerResult = eval(playerAnswer.join(""));
                    const playerResultRounded = parseFloat(playerResult.toFixed(2));

                    if (playerResultRounded === result) {
                        //console.log("Correcto");
                        setScore(prevScore => {
                            const newScore = prevScore + 1;
                            return newScore;
                        });
                        generateRandomSequence();
                        setPlayerAnswer([] || 0);
                    }
                    else {
                        console.log("Incorrecto");
                        setPlayerAnswer([] || 0);
                    }
                }
            }
        }
    };

    const handleElementClick = (element) => {
        if (gameMode === 'chemistry') {
            if (element === "Enter") {
                const playerAnswerString = playerAnswer.join("");
                console.log("Respuesta del jugador: ", playerAnswerString);
                console.log("Formula del acido: ", acidFormula);
                if (playerAnswerString === acidFormula) {
                    console.log("Correcto");
                    setScore(prevScore => {
                        const newScore = prevScore + 1;
                        return newScore;
                    });
                    generateRandomSequence();
                    setPlayerAnswer([] || 0);
                } else {
                    console.log("Incorrecto");
                    setPlayerAnswer([] || 0);
                }

            } else {
                console.log("Elemento: ", element);
                const newPlayerAnswer = [...playerAnswer, element];
                setPlayerAnswer(newPlayerAnswer);
                console.log("Respuesta: ", newPlayerAnswer);
            }

        }
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
                        Puntuación: {score}
                    </div>

                    {/* Secuencia en el centro */}
                    <div className="flex items-center justify-center h-full">
                        <p className="font-medium text-3xl">
                            {sequence}
                        </p>
                    </div>
                </div>

                {/* Container donde se mostrara la tabla periodica (con sus elementos) o un teclado numerico */}
                {gameMode === "math" ? <NumberKeyboard handleNumberClick={handleNumberClick} userResponse={playerAnswer} /> : <PeriodicTable handleElementClick={handleElementClick} userResponse={playerAnswer} />}
            </div>
        </>
    );
};

export default SimonSays;