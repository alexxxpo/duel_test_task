import { Spell } from "../"

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
            spellColor = 'grey',
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
    speed: number = 1
    private color: string
    private context: CanvasRenderingContext2D | null = null

    spellDir: 1 | -1
    spellColor: string
    castDelay: number = 1000
    private spells: Spell[] = []
    opponent: Player | null = null

    private checkPos() {
        if (!this.context) return

        if (this.posY >= this.context.canvas.height - this.size ||
            (this.dir === 1 &&
                this.posY + this.size == this.clY &&
                this.clX >= this.posX - this.size &&
                this.clX <= this.posX + this.size
            )) { this.dir = -1 }

        if (this.posY <= 0 + this.size ||
            (
                this.dir === -1 &&
                this.posY - this.size == this.clY &&
                this.clX >= this.posX - this.size &&
                this.clX <= this.posX + this.size
            )) { this.dir = 1 }
    }

    castSpell() {
        if (!this.context || !this.opponent) return
        setInterval(() => {
            this.spells.push(
                new Spell({
                    posX: this.posX,
                    posY: this.posY,
                    color: this.spellColor,
                    dir: this.spellDir,
                })
            )
        }, this.castDelay)
    }

    drawSpell() {
        this.spells.forEach((spell, i) => {
            if (!this.context || !this.opponent) return

            const isCollision = spell.draw(this.context, this.opponent)
            if (isCollision) this.spells.splice(i, 1)
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