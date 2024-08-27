import { Player } from "../player";

interface Params {
    posX?: number;
    posY?: number;
    size?: number;
    dir?: 1 | -1;
    speed?: number;
    color?: string;
    spellDir?: 1 | -1;
    spellColor?: string;
}

export class Spell {

    constructor(params: Params) {
        const {
            posX = 0,
            posY = 0,
            color = 'grey',
            size = 10,
            dir = 1,
        } = params

        this.posX = posX
        this.posY = posY
        this.size = size
        this.dir = dir
        this.color = color
    }

    posX: number
    posY: number
    size: number
    dir: 1 | -1
    opponent: Player | null = null
    speed: number = 1
    color: string
    context: CanvasRenderingContext2D | null = null

    private isCollision() {
        if (!this.opponent || !this.context) return false
        if (
            this.posX + this.size > this.context.canvas.width ||
            this.posX - this.size < 0
        ) return true
        return false
    }

    private hit() {
        if (!this.opponent || !this.context) return false
        if (this.posX + this.size > this.opponent.posX - this.opponent.size &&
            this.posX - this.size < this.opponent.posX + this.opponent.size &&
            this.posY + this.size > this.opponent.posY - this.opponent.size &&
            this.posY - this.size < this.opponent.posY + this.opponent.size) return true
        return false
    }


    updatePos() {
        this.posX += this.dir
        const out = this.isCollision()
        const hit = this.hit()
        return {
            out,
            hit
        }
    }

    draw(context: CanvasRenderingContext2D, opponent: Player): { out: boolean, hit: boolean } {
        this.context = context
        this.opponent = opponent
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2)
        context.fill()
        return this.updatePos()
    }
}