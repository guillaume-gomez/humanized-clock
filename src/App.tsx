import { useState } from 'react'
import { humanizedClock, humanizedClockInFrench } from "./humanizedClock";
import ThreeJsRendering from "./components/ThreeJsRendering";
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState<DateTime>(new Date());

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>

        <p><span>La date</span> {date.toString()}</p>
        <p>{humanizedClockInFrench(date)}</p>
      </div>
      <ThreeJsRendering />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
