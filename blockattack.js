"use strict";

class BlockAttack {
    width = 800;
    height = 800;
    blockSize = 80;

    constructor(canvas) {
        this.canvas = canvas;        
    }    

    run() {
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        setTimeout(() => this.drawFrame(0), 0);
    }

    drawFrame(gridX) {        
        const ctx = this.canvas.getContext("2d");

        // Clear the canvas
        ctx.clearRect(0, 0, this.width, this.height);

        // Draw the black grid strokes
        for (let i = 0; i < 10; i++) {
            ctx.strokeStyle = "#000000";
            ctx.strokeRect(i * 80, 0, this.blockSize, this.blockSize);
        }

        // Draw the current position of the red block
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(gridX * 80, 0, this.blockSize, this.blockSize);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(gridX * 80, 0, this.blockSize, this.blockSize);        

        const nextGridX = (gridX < 9) ? gridX + 1 : 0;
        setTimeout(() => this.drawFrame(nextGridX), 100);
    }
}