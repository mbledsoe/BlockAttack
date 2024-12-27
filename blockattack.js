
class BlockAttack {
    height = 800;
    width = 600;

    constructor(canvas) {
        this.canvas = canvas;        
    }

    run() {
        this.canvas.setAttribute('width', this.height);
        this.canvas.setAttribute('height', this.width);

        const ctx = this.canvas.getContext("2d");

        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, this.height, this.width);

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 200, 200);
    }
}