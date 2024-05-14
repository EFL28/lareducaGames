import React from "react";
import Response from "./Response";

const NumberKeyboard = ({ handleNumberClick, userResponse }) => {
    const numbers = new Array(10).fill(0);
    const operations = [".", "-", "=", 'Delete'];

    return (
        <>
            <div id="numbers" className="flex justify-center">
                {numbers.map((_, index) => (
                    <button
                        key={index}
                        className="w-30 h-30 m-4 hover:bg-gray-500 bg-gray-400 rounded-lg text-2xl font-semibold"
                        onClick={() => handleNumberClick(index)}
                    >
                        {index}
                    </button>
                ))}
            </div>

            <div id="operations" className="flex justify-center">
                {operations.map((operation) => (
                    <button
                        key={operation}
                        className="w-30 h-30 m-4 hover:bg-gray-500 bg-gray-400 rounded-lg text-2xl font-semibold"
                        onClick={() => handleNumberClick(operation)}
                    >
                        {operation}
                    </button>
                ))}
            </div>

            <Response response={userResponse} />
        </>



    );
};

export default NumberKeyboard;