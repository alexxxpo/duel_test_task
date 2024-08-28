import { Canvas, Regulator } from "./components"
import { DEFAULT_CAST_SPEED, DEFAULT_SPEED_PLAYER, MAX_CAST_SPEED, MAX_SPEED_PLAYER, MIN_CAST_SPEED, MIN_SPEED_PLAYER } from "./consts"
import { Player } from "./entities"
import { setMouseCoordsToPlayers } from "./utils"

import styles from './app.module.css'
import { Scores } from "./components/scores"
import { createContext } from "react"


export const playersContext = createContext({
  playerOne: {} as Player,
  playerTwo: {} as Player,
})

function App() {


  const playerOne = new Player({ posX: 100, posY: 30, color: 'orange' })
  const playerTwo = new Player({ posX: 700, posY: 30, color: 'lightgreen', spellDir: -1 })


  playerOne.opponent = playerTwo
  playerTwo.opponent = playerOne

  const draw = (context: CanvasRenderingContext2D) => {
    playerOne.draw(context)
    playerTwo.draw(context)
  }

  const setScores = (player: Player) => {
    return player.scores
  }

  const mouseHandler: React.MouseEventHandler<HTMLCanvasElement> = (e: React.SyntheticEvent<HTMLCanvasElement, MouseEvent>) => {
    setMouseCoordsToPlayers(e, playerOne, playerTwo)
  }

  const setSpeed = (player: Player, speed: number) => {
    player.speed = speed
  }

  const setCastSpeed = (player: Player, castSpeed: number) => {
    player.castSpeed = MAX_CAST_SPEED + MIN_CAST_SPEED - castSpeed
  }

  return (
    <div
      className={styles.container}
    >
      <div className={styles.regContainer}>

        <Scores setScores={() => setScores(playerOne)} />


        <Regulator
          title="Скорость героя 1"
          type="range"
          min={MIN_SPEED_PLAYER}
          max={MAX_SPEED_PLAYER}
          defaultValue={DEFAULT_SPEED_PLAYER}
          onChange={(e) => setSpeed(playerOne, Number(e.target.value))}
          className={styles.regulator}
        />

        <Regulator
          title="Скорость заклинаний героя 1"
          type="range" min={MIN_CAST_SPEED}
          max={MAX_CAST_SPEED}
          defaultValue={DEFAULT_CAST_SPEED}
          onChange={(e) => setCastSpeed(playerOne, Number(e.target.value))}
          className={styles.regulator}
        />
      </div>

      <playersContext.Provider value={{playerOne, playerTwo}}>

        <Canvas
          width={800}
          height={600}
          draw={draw}
          style={{ border: '2px solid black' }}
          onMouseMove={mouseHandler}
        />
      </playersContext.Provider>
      <div className={styles.regContainer}>


        <Scores setScores={() => setScores(playerTwo)} />


        <Regulator
          title="Скорость героя 2"
          type="range" min={MIN_SPEED_PLAYER}
          max={MAX_SPEED_PLAYER}
          defaultValue={DEFAULT_SPEED_PLAYER}
          onChange={(e) => setSpeed(playerTwo, Number(e.target.value))}
          className={styles.regulator}
        />
        <Regulator
          title="Скорость заклинаний героя 2"
          type="range" min={MIN_CAST_SPEED}
          max={MAX_CAST_SPEED}
          defaultValue={DEFAULT_CAST_SPEED}
          onChange={(e) => setCastSpeed(playerTwo, Number(e.target.value))}
          className={styles.regulator}
        />
      </div>
    </div >
  )

}
export default App
