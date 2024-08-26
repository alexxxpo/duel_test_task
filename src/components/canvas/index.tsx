import { useRef, useEffect } from 'react';

interface CanvasProps extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    width: number;
    height: number;
    draw: (context: CanvasRenderingContext2D) => void;
}


export function Canvas({ width, height, draw, ...canvasProps }: CanvasProps) {

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

        return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            {...canvasProps}
        />
    );
}
