import { Player } from '../../entities'
import styles from './spellColorPicker.module.css'

interface Props {
    player: Player;
    handler: (player: Player, spellColor: string) => void;
    open: boolean
}

export const SpellColorPicker: React.FC<Props> = ({player, handler, open}) => {
  return (
    open && <div
          className={styles.container}
        >
          <div
            className={styles.colorRound}
            style={{
              background: 'green'
            }}
            onClick={() => handler(player, 'green')}
          ></div>
          <div
            className={styles.colorRound}
            style={{
              background: 'red'
            }}
            onClick={() => handler(player, 'red')}
          ></div>
          <div
            className={styles.colorRound}
            style={{
              background: 'yellow'
            }}
            onClick={() => handler(player, 'yellow')}
          ></div>
        </div>
  )
}
