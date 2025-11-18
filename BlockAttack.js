"use strict";

const Shapes = {
    oShape: {
        color: 'rgb(255,255,0)',
        cells: [
            [true, true],
            [true, true]
        ]
    },
    iShape:  {
        color: 'rgb(51,204,255)',
        cells: [
            [false, false, false, false],
            [true, true, true, true],
            [false, false, false, false],
            [false, false, false, false]
        ]
    },
    sShape: {
        color: 'rgb(255,0,0)',
        cells: [
            [false, false, true],
            [false, true, true],
            [false, true, false]
        ]
    }    
}

class ShapePicker {
    shapes = [
        Shapes.oShape,
        Shapes.iShape,
        Shapes.sShape
    ];

    pickRandomShape() {
        const min = 0;
        const max = 2;

        const shapeIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        
        console.log('shapeIndex', shapeIndex);

        return this.shapes[shapeIndex];
    }
}

class Position {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    translate(colChange, rowChange) {
        return new Position(this.col + colChange, this.row + rowChange);
    }
}

class BlockPainter {
    blockWidth = 30;
    blockHeight = 30;    

    constructor(ctx) {
        this.ctx = ctx;
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

class Board {
    columns = 10;
    rows = 20;
    cells = [];

    constructor() {
        for (var col = 0; col < this.columns; col++) {
            this.cells[col] = [];

            for (var row = 0; row < this.rows; row++) {
                this.cells[col][row] = null;
            }
        }
    }

    hasCell(col, row) {
        return (col >= 0 && col < this.columns)
            && (row >= 0 && row < this.rows);
    }

    setCell(col, row, color) {
        this.cells[col][row] = color;
    }

    isOccupied(col, row) {
        return this.cells[col][row] !== null;
    }

    draw(blockPainter) {
        for (var col = 0; col < 10; col++) {
            for (var row = 0; row < 20; row++) {
                if (this.isOccupied(col, row)) {
                    blockPainter.drawBlock(col, row, this.cells[col][row])
                } else {
                    blockPainter.drawBlock(col, row, 'rgb(50 50 50)');
                }
            }
        }
    }
}

class Piece {    
    constructor(board, position) {        
        const shape = new ShapePicker().pickRandomShape();
        this.color = shape.color;
        this.cells = shape.cells;

        this.board = board;        
        this.position = position;
    }

    hasBlock(colIndex, rowIndex) {
        return this.cells[colIndex][rowIndex];
    }

    canMove(colChange, rowChange) {
       const newPosition = this.position.translate(colChange, rowChange);
        
        for (var colIndex = 0; colIndex < this.cells.length; colIndex++) {
            for (var rowIndex = 0; rowIndex < this.cells[colIndex].length; rowIndex++) {
                if (this.hasBlock(colIndex, rowIndex)) {
                    var boardColIndex = newPosition.col + colIndex;
                    var boardRowIndex = newPosition.row + rowIndex;

                    if (!this.board.hasCell(boardColIndex, boardRowIndex)) {
                        return false;
                    }

                    if (this.board.isOccupied(boardColIndex, boardRowIndex)) {
                        return false;
                    }
                }
            }    
        }

        return true; 
    }

    move(colChange, rowChange) {
        this.position = this.position.translate(colChange, rowChange);
    }

    mergeToBoard() {
        for (var colIndex = 0; colIndex < this.cells.length; colIndex++) {
            for (var rowIndex = 0; rowIndex < this.cells[colIndex].length; rowIndex++) {
                if (this.hasBlock(colIndex, rowIndex)) {
                    var boardColIndex = this.position.col + colIndex;
                    var boardRowIndex = this.position.row + rowIndex;

                    this.board.setCell(boardColIndex, boardRowIndex, this.color);
                }
            }    
        }
    }

    draw(blockPainter) {
        for (var colIndex = 0; colIndex < this.cells.length; colIndex++) {
            for (var rowIndex = 0; rowIndex < this.cells[colIndex].length; rowIndex++) {
                if (this.hasBlock(colIndex, rowIndex)) {
                    var boardColIndex = this.position.col + colIndex;
                    var boardRowIndex = this.position.row + rowIndex;

                    blockPainter.drawBlock(boardColIndex, boardRowIndex, this.color);
                }
            }
        }
    }
}

class BlockAttack
{     
    columns = 10;
    rows = 20;
    width = 300;
    height = 600;
    
    board = new Board();
    currentPiece = new Piece(this.board, new Position(4, 0));
    
    movePieceLastTimeStamp = 0;
    movePieceInterval = 1000;
    movePieceRowIncrement = 1;

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.canvas = document.createElement('canvas');        
        this.ctx = this.canvas.getContext('2d');
        this.blockPainter = new BlockPainter(this.ctx);
    }
    
    run() {
        this.rootElement.height = this.height;
        this.rootElement.width = this.width;

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.rootElement.appendChild(this.canvas);

        window.addEventListener('keydown', (ev) => this.onKeydown(ev));

        this.clearCanvas();
        this.drawBoard();

        window.requestAnimationFrame(timestamp => this.tick(timestamp));
    }

    onKeydown(ev) {
        switch (ev.code) {
            case 'ArrowLeft':
                if (this.currentPiece.canMove(-1,0)) {
                    this.currentPiece.move(-1,0);
                }
                break;
            case 'ArrowRight':
                if (this.currentPiece.canMove(1,0)) {
                    this.currentPiece.move(1,0);
                }
                break;
            case 'ArrowDown':
                if (this.currentPiece.canMove(0,1)) {                    
                    this.currentPiece.move(0,1);
                    this.movePieceLastTimeStamp = performance.now();
                } else {
                    this.mergeCurrentPiece();
                }
                break;
        }        
    }

    tick(timestamp) {        
        this.updateState(timestamp);

        this.clearCanvas();
        this.drawBoard();

        window.requestAnimationFrame(timestamp => this.tick(timestamp));
    }
    
    updateState(timestamp) {
        if (this.movePieceLastTimeStamp == 0) {
            this.movePieceLastTimeStamp = performance.now();
        }
                
        const elapsedTime = timestamp - this.movePieceLastTimeStamp;

        if (elapsedTime >= this.movePieceInterval) {
            this.movePieceLastTimeStamp = timestamp;

            if (this.currentPiece.canMove(0,1)) {                
                this.currentPiece.move(0,1);
            } else {
                this.mergeCurrentPiece();
            }
        }
    }

    mergeCurrentPiece() {
        this.currentPiece.mergeToBoard();
        this.currentPiece = new Piece(this.board, new Position(4, 0));
        this.movePieceLastTimeStamp = performance.now();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard() {
        this.board.draw(this.blockPainter);
        this.currentPiece.draw(this.blockPainter);
    }
}