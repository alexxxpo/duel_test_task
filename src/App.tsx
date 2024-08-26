import { useEffect } from "react"
import { Canvas } from "./components"
import { Player } from "./entities"
import { setMouseCoordsToPlayers } from "./utils"

function App() {

  const playerOne = new Player({ posX: 100, posY: 30, color: 'orange' })
  const playerTwo = new Player({ posX: 700, posY: 30, color: 'lightgreen', spellDir: -1 })

  playerOne.opponent = playerTwo
  playerTwo.opponent = playerOne

  useEffect(() => { 
    playerOne.castSpell()
    playerTwo.castSpell()
   }, [])

  const draw = (context: CanvasRenderingContext2D) => {
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
