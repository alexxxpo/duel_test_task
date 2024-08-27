import { useRef, useEffect, useState } from 'react';
import { SpellColorPicker } from '../spell-color-picker';
import { Player } from '../../entities';
import { compareCoords } from '../../utils';

interface CanvasProps extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    width: number;
    height: number;
    draw: (context: CanvasRenderingContext2D) => void;
    playerOne: Player;
    playerTwo: Player;
}


export function Canvas({ width, height, draw, playerOne, playerTwo, onMouseMove, ...canvasProps }: CanvasProps) {

    const [showOne, setShowOne] = useState(false)
    const [showTwo, setShowTwo] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const context = canvasRef.current.getContext('2d');
        if (!context) return;

        let animationID: number;

        const animation = () => {
            context.clearRect(0, 0, width, height)

            draw(context)
            requestAnimationFrame(animation)
        }
        animation()

        return () => {
            cancelAnimationFrame(animationID)
        }

    }, []);

    const setSpellColorHandler = (player: Player, spellColor: string) => {
        player.spellColor = spellColor
    }

    const openCardHandler = (e: React.SyntheticEvent<HTMLCanvasElement, MouseEvent>) => {
        if (compareCoords(e, playerOne)) {
            setShowOne(prev => !prev)
            return
        }
        if (compareCoords(e, playerTwo)) {
            setShowTwo(prev => !prev)
            return
        }
    }

    return (
        <div
            //@ts-expect-error
            onClick={openCardHandler}
            //@ts-expect-error
            onMouseMove={onMouseMove}
        >
            <SpellColorPicker handler={setSpellColorHandler} player={playerOne} open={showOne} />
            <SpellColorPicker handler={setSpellColorHandler} player={playerTwo} open={showTwo} />

            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                {...canvasProps}
            />
        </div>
    );
}
