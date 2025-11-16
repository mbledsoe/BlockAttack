"use strict";

class BlockAttack
{     
    columns = 10;
    rows = 20;
    width = 300;
    height = 600;
    blockWidth = 30;
    blockHeight = 30;
    
    currentPiece = {
        position: {
            col: 0,
            row: 0
        }
    };

    movePieceLastTimeStamp = 0;
    movePieceInterval = 1000;
    movePieceColIncrement = 1;

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    
    run() {
        this.rootElement.height = this.height;
        this.rootElement.width = this.width;

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.rootElement.appendChild(this.canvas);

        this.clearCanvas();
        this.drawBoard();
        
        window.requestAnimationFrame(timestamp => this.tick(timestamp));
    }

    tick(timestamp) {
        if (this.movePieceLastTimeStamp == 0) {
            this.movePieceLastTimeStamp = performance.now();
        }

        const elapsedTime = timestamp - this.movePieceLastTimeStamp;

        if (elapsedTime >= this.movePieceInterval) {
            this.movePieceLastTimeStamp = timestamp;
            
            if (this.movePieceColIncrement == 1 && this.currentPiece.position.col == 9) {
                this.movePieceColIncrement = -1;
            } else if (this.movePieceColIncrement == -1 && this.currentPiece.position.col == 0) {
                this.movePieceColIncrement = 1;
            }

            this.currentPiece.position.col += this.movePieceColIncrement;
            console.log('move piece ' + this.currentPiece.position.col);

            this.clearCanvas();
            this.drawBoard();
        }

        window.requestAnimationFrame(timestamp => this.tick(timestamp));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard() {
        for (var col = 0; col < 10; col++) {
            for (var row = 0; row < 20; row++) {
                this.drawBlock(col, row, 'rgb(50 50 50)');
            }
        }

        this.drawBlock(this.currentPiece.position.col, this.currentPiece.position.row, 'rgb(255, 0, 0)')
    }

    drawBlock(col, row, fillStyle) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = 'rgb(25 25 25)';

        const x = col * this.blockWidth;
        const y = row * this.blockHeight;

        this.ctx.fillRect(x, y, this.blockWidth, this.blockHeight);
        this.ctx.strokeRect(x, y, this.blockWidth, this.blockHeight);
    }
}