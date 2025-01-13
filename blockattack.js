"use strict";

const oShape = {
    color: "#ffff00",
    shape: [
        [1,1],
        [1,1]
    ],
    startPosition: 4
};

class BlockAttack {
    width = 400;
    height = 800;
    blockSize = 40;

    lastBlockMoveTimestamp = 0;
        
    activePiecePosition = { x: oShape.startPosition, y: 0 };
    activePiece = oShape;

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
        
        if (timeDiff >= 500) {
            if (this.canActivePieceMoveDown()) {
                this.activePiecePosition.y++;
            }
            
            this.lastBlockMoveTimestamp = timestamp;
        }       
    }

    canActivePieceMoveDown() {
        // generalize this later
        let maxShapeY = 0;

        for (let x = 0; x < this.activePiece.shape.length; x++) {
            const xRow = this.activePiece.shape[x];

            for (let y = 0; y < xRow.length; y++) {
                if (xRow[y] === 1) {
                    maxShapeY = y;
                }
            }
        }

        return (maxShapeY + this.activePiecePosition.y) < 19;
    }

    drawFrame() {
        const ctx = this.canvas.getContext("2d");

        // Clear the canvas
        ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw the background
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 20; y++) {
                this.drawBlock(ctx, x, y, '#666666');
            }
        }

        // Draw the active piece        
        for (let x = 0; x < this.activePiece.shape.length; x++) {
            var xRow = this.activePiece.shape[x];

            for (let y = 0; y < xRow.length; y++) {
                this.drawBlock(ctx, 
                    (this.activePiecePosition.x + x),
                    (this.activePiecePosition.y + y),
                    this.activePiece.color
                );                
            }
        }

        window.requestAnimationFrame((timestamp) => this.tick(timestamp));
    }

    drawBlock(ctx, gridX, gridY, colorCode) {
        ctx.fillStyle = colorCode;
        ctx.strokeStyle = '#333333';

        const blockX = gridX * this.blockSize;
        const blockY = gridY * this.blockSize;
        
        ctx.fillRect(blockX, blockY, this.blockSize, this.blockSize);
        ctx.strokeRect(blockX, blockY, this.blockSize, this.blockSize);
    }
}