"use strict";

class BlockAttack {
    width = 800;
    height = 800;
    blockSize = 80;

    lastBlockMoveTimestamp = 0;
    blockPositionX = 0;

    constructor(canvas) {
        this.canvas = canvas;        
    }    

    run() {
        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        window.requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    tick(timestamp) {        
        this.updateState(timestamp);
        this.drawFrame();        
    }

    updateState(timestamp) {      
        if (this.lastBlockMoveTimestamp == 0) {
            this.lastBlockMoveTimestamp = timestamp;
        }

        // milliseconds since the lastBlockMoveTimestamp
        const timeDiff = timestamp - this.lastBlockMoveTimestamp
        
        if (timeDiff >= 100) {
            this.blockPositionX = (this.blockPositionX < 9) ? this.blockPositionX + 1 : 0;
            this.lastBlockMoveTimestamp = timestamp;
        }       
    }

    drawFrame() {
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
        ctx.fillRect(this.blockPositionX * 80, 0, this.blockSize, this.blockSize);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(this.blockPositionX * 80, 0, this.blockSize, this.blockSize);

        window.requestAnimationFrame((timestamp) => this.tick(timestamp));
    }
}