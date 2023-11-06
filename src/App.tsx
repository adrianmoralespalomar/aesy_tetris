import { Board } from "./components/Board"

function App():JSX.Element{
  return (
    <>
      <main className="bg-cyan-950 flex justify-center min-w-full min-h-screen flex-col">
        <h1 className="text-6xl text-white self-center mb-4">React Tetris</h1>
        <Board/>
      </main>
    </>
  )
}

export default App
