import { useState } from 'react'
import MusicGame from './Games/MusicGame'
import SimonSays from './Games/SimonSays'
import GeoGuesser from './Games/GeoGuesser'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return(
    <Router>
      <Routes>
        <Route path='/piano-tiles' element={<MusicGame/>}/>
        <Route path='/stem-game' element={<SimonSays/>}/>
        <Route path='/geoguesser' element={<GeoGuesser/>}/>
      </Routes>
    </Router>
  )
  
}

export default App
