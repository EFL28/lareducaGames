import React from "react";

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoMercator } from 'd3-geo';
import worldData from '../GeoGuesser/world.json';



const GeoGame = ({ onCountryClick, guessedCountry }) => {
    return (
        <>
            <ComposableMap projection="geoEqualEarth">
                <Geographies geography={worldData}>
                    {({ geographies }) =>
                        geographies.map(geo => {

                            const isGuessed = guessedCountry.includes(geo.properties.name);
                            return (

                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onClick={() => onCountryClick(geo.properties.name)}
                                    style={{
                                        default: { fill: isGuessed ? "#47e652" : "#D6D6DA", outline: "none" },
                                        hover: { fill: isGuessed ? "#36963d" : "#344cad", outline: "none" },
                                        pressed: { fill: "#344cad", outline: "none" }
                                    }}
                                />
                            )
                        })
                    }
                </Geographies>
            </ComposableMap>
        </>
    );
};

export default GeoGame;