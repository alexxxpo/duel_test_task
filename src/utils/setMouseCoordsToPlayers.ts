import { Player } from "../entities"

export const setMouseCoordsToPlayers = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, ...players: Player[]) => {
    players.forEach((player) => {
        player.clX = e.clientX
        player.clY = e. clientY
    })
}