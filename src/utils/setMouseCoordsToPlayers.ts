import { Player } from "../entities"

export const setMouseCoordsToPlayers = (e: React.SyntheticEvent<HTMLCanvasElement, MouseEvent>, ...players: Player[]) => {
    players.forEach((player) => {
        //@ts-expect-error
        player.clX = e.nativeEvent.clientX - e.target.offsetLeft
        //@ts-expect-error
        player.clY = e.nativeEvent.clientY - e.target.offsetTop
    })
}