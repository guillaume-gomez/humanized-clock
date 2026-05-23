import { useState } from 'react';
import ThreeJsRendering from "./components/ThreeJsRendering";
import useDate from "./useDate";
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const { date } = useDate();


  return (
    <>
      <ThreeJsRendering date={new Date()}/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
