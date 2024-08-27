import { Player } from "../entities"

export const compareCoords = (e: React.SyntheticEvent<HTMLCanvasElement, MouseEvent>, player: Player) => {
    console.log(player.clX, player.clY, e.nativeEvent.clientX, e.nativeEvent.clientY, e);

    if (
        //@ts-expect-error
        e.nativeEvent.clientX - e.target.offsetLeft >= player.posX - player.size &&
        //@ts-expect-error
        e.nativeEvent.clientX - e.target.offsetLeft <= player.posX + player.size &&
        //@ts-expect-error
        e.nativeEvent.clientY - e.target.offsetTop >= player.posY - player.size &&
        //@ts-expect-error
        e.nativeEvent.clientY - e.target.offsetTop <= player.posY + player.size
    ) return true

    return false
}