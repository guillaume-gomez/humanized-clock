import ThreeJsRendering from "./components/ThreeJsRendering";
import useDate from "./useDate";
import './App.css'

function App() {
  const { date } = useDate();

  return (
    <>
      <ThreeJsRendering date={date}/>
    </>
  )
}

export default App
