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

        const ctx = this.canvas.getContext("2d");

        ctx.strokeStyle = "#000000";
        ctx.strokeRect(0, 0, this.width, this.height);

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, this.blockSize, this.blockSize);
    }
}