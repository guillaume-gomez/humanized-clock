import { useState } from 'react';
import ThreeJsRendering from "./components/ThreeJsRendering";
import useDate from "./useDate";
import './App.css'

function App() {
  const { date } = useDate();


  return (
    <div>
      <ThreeJsRendering date={date}/>
    </div>
  )
}

export default App
