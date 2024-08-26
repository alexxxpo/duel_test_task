import { Canvas } from "./components"
import { Player } from "./entities"
import { setMouseCoordsToPlayers } from "./utils"

function App() {

  const playerOne = new Player(100, 30, '#fff000')
  const playerTwo = new Player(700, 30, '#f0f000')

  function draw(context: CanvasRenderingContext2D) {
    playerOne.draw(context)
    playerTwo.draw(context)
  }

  const mouseHandler: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    setMouseCoordsToPlayers(e, playerOne, playerTwo)
  }

  return (
    <>
      <Canvas
        width={800}
        height={600}
        draw={draw}
        style={{ border: '2px solid black' }}
        onMouseMove={mouseHandler}
      />
    </>
  )

}
export default App
