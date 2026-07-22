import ThreeJsRendering from "./components/ThreeJsRendering";
import useDate from "./useDate";
import './App.css'

function App() {
  const { date } = useDate();

  return (
    <>
      <ThreeJsRendering date={date}/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
