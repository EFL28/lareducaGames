import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";

import './switch.css'

const SwitchMode = ({ handleSwitchMode }) => {
    return (
        <>
            <div className="flex align-middle justify-between p-4 bg-lime-300">
                <h1 className="flex items-center justify-center font-semibold text-xl">Simon Says</h1>
                <div className="flex">
                    <p className="mr-3">Math</p>
                    <div >
                        <label className="switch">
                            <input onClick={handleSwitchMode} type="checkbox"></input>
                            <span>
                            </span>
                        </label>
                    </div>
                    <p>Chemistry</p>
                </div>
            </div>
        </>
    );
}

export default SwitchMode;