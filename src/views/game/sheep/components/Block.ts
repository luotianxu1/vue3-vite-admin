export default class Block {
    width: number
    height: number
    img
    index: number
    n
    bockState: boolean
    x: boolean
    y: boolean
    constructor(width, height, img, i) {
        this.width = width
        this.height = height
        this.img = img
        this.index = i
        this.n = img
        this.bockState = false
    }
}
