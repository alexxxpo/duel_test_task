import { useEffect, useState } from 'react';
import styles from './scores.module.css'

interface CanvasProps extends React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> {
    setScores: () => number;
}


export function Scores({ setScores }: CanvasProps) {
    const [scores, setScoresState] = useState(0)

    useEffect(() => {
        
        let animationID: number;

        const animation = () => {

            setScoresState(setScores())
            requestAnimationFrame(animation)
        }
        animation()

        return () => {
            cancelAnimationFrame(animationID)
        }

    }, []);

        return (
        <div className={styles.scores}>Очки: {scores}</div>
    );
}
