import { Spell } from "../"
import { DEFAULT_CAST_SPEED, DEFAULT_SPEED_PLAYER } from "../../consts";

interface Params {
    posX?: number;
    posY?: number;
    size?: number;
    dir?: 1 | -1;
    clY?: number;
    clX?: number;
    speed?: number;
    color?: string;
    spellDir?: 1 | -1;
    spellColor?: string;
}

export class Player {

    constructor(params: Params) {
        const {
            posX = 0,
            posY = 0,
            color = 'grey',
            spellColor = 'green',
            size = 30,
            dir = 1,
            spellDir = 1,
            clX = 0,
            clY = 0,
        } = params

        this.clX = clX
        this.clY = clY
        this.posX = posX
        this.posY = posY
        this.size = size
        this.dir = dir
        this.color = color
        this.spellColor = spellColor
        this.spellDir = spellDir
    }

    posX: number
    posY: number
    size: number
    dir: 1 | -1
    clY: number
    clX: number
    speed: number = DEFAULT_SPEED_PLAYER
    private color: string
    private context: CanvasRenderingContext2D | null = null
    scores: number = 0
    getScores() {
        return this.scores
    }

    spellDir: 1 | -1
    spellColor: string
    castSpeed: number = DEFAULT_CAST_SPEED
    private spells: Spell[] = []
    opponent: Player | null = null
    private castCycle: number = 0

    private checkPos() {
        if (!this.context) return

        if (this.posY + this.size >= this.context.canvas.height ||
            (this.dir === 1 &&
                this.posY + this.size >= this.clY &&
                this.posY + this.size - 5 <= this.clY &&
                this.clX >= this.posX - this.size &&
                this.clX <= this.posX + this.size
            )) { this.dir = -1 }

        if (this.posY <= 0 + this.size ||
            (
                this.dir === -1 &&
                this.posY - this.size <= this.clY &&
                this.posY - this.size + 5 >= this.clY &&
                this.clX >= this.posX - this.size &&
                this.clX <= this.posX + this.size
            )) { this.dir = 1 }
    }

    castSpell() {
        if (!this.context || !this.opponent) return
        this.castCycle += 1
        if (this.castCycle % this.castSpeed == 0) this.spells.push(
            new Spell({
                posX: this.posX,
                posY: this.posY,
                color: this.spellColor,
                dir: this.spellDir,
            })
        )
    }

    drawSpell() {
        this.castSpell()
        this.spells.forEach((spell, i) => {
            if (!this.context || !this.opponent) return

            const { out, hit } = spell.draw(this.context, this.opponent)
            if (hit) this.scores += 1
            if (out || hit) this.spells.splice(i, 1)
        })
    }

    private updatePos() {
        this.checkPos()
        this.posY += this.dir * this.speed
    }

    draw(context: CanvasRenderingContext2D) {
        this.context = context
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.posX, this.posY, 30, 0, Math.PI * 2)
        context.fill()
        this.updatePos()
        this.drawSpell()
    }
}