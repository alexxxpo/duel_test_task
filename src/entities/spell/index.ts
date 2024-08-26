export class Spell {

    constructor(posX = 0, posY = 0, color: string = 'grey', dir: 1 | -1 = 1, size = 15, clX = 0, clY = 0) {
        this.clX = clX
        this.clY = clY
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
    clY: number
    clX: number
    speed: number = 1
    color: string
    context: CanvasRenderingContext2D | null = null

    private checkPos() {
        if (!this.context) return
        if (this.posX >= this.context.canvas.width - this.size ||
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


    updatePos() {
        this.checkPos()
        this.posX += this.dir * this.speed
    }

    draw(context: CanvasRenderingContext2D) {
        this.context = context
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.posX, this.posY, 30, 0, Math.PI * 2)
        context.fill()
        this.updatePos()
    }
}