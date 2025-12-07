"use strict";

class Position {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }

    translate(colChange, rowChange) {
        return new Position(this.col + colChange, this.row + rowChange);
    }
}

class Grid {    
    constructor(columns, rows, getValueFunc) {
        getValueFunc = getValueFunc || (() => null);
        this.columns = columns;
        this.rows = rows;
        this.cells = [];

        for (var col = 0; col < columns; col++) {
            this.cells[col] = [];

            for (var row = 0; row < rows; row++) {                
                this.cells[col][row] = getValueFunc(col, row);
            }
        }
    }

    static createFromCells(cells) {
        var grid = new Grid(
            cells.length, 
            cells[0].length, 
            (col, row) => cells[col][row]);

        return grid;
    }

    hasCell(col, row) {
        return (col >= 0 && col < this.columns)
            && (row >= 0 && row < this.rows);
    }

    setCellValue(col, row, value) {
        this.cells[col][row] = value;
    }

    getCellValue(col, row) {
        return this.cells[col][row];
    }

    hasCellValue(col, row) {
        return this.getCellValue(col, row) !== null;
    }

    walkGrid(callbackFunc) {
        for (var col = 0; col < this.cells.length; col++) {
            for (var row = 0; row < this.cells[col].length; row++) {
                const continueWalking = callbackFunc(col, row, this.cells[col][row]);

                if (continueWalking === false) {
                    return false;
                }
            }
        }

        return true;
    }
}

const Shapes = {
    oShape: {
        startPosition: new Position(3, 0),        
        color: 'rgb(255,255,0)',
        rotations: [
            [
                [0,0,0],
                [1,1,0],
                [1,1,0],
                [0,0,0]
            ]            
        ]
    },
    iShape:  {
        startPosition: new Position(3, 0),
        color: 'rgb(51,204,255)',
        rotations: [
            [
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0]            
            ],
            [
                [0,0,0,0],
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0]           
            ],
            [
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0]            
            ],
            [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]            
            ]
        ]        
    },
    sShape: {
        startPosition: new Position(4, 0),
        color: 'rgb(0,255,0)',
        rotations: [
            [
                [0,1,0],
                [1,1,0],
                [1,0,0]
            ],
            [
                [0,0,0],
                [1,1,0],
                [0,1,1]
            ],
            [
                [0,0,1],
                [0,1,1],
                [0,1,0]
            ],
            [
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ]
        ]
    },
    jShape: {
        startPosition: new Position(3,0),
        color: 'rgb(0,0,255)',
        rotations: [
            [
                [1,1,0],
                [0,1,0],
                [0,1,0]
            ],
            [
                [0,0,0],
                [1,1,1],
                [1,0,0]
            ],
            [
                [0,1,0],
                [0,1,0],
                [0,1,1]
            ],
            [
                [0,0,1],
                [1,1,1],
                [0,0,0]
            ]
        ]
    },
    lShape: {
        startPosition: new Position(3,0),
        color: 'rgb(255,125,0)',
        rotations: [
            [
                [0,1,0],
                [0,1,0],
                [1,1,0]
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,0,1]
            ],
            [
                [0,1,1],
                [0,1,0],
                [0,1,0]
            ],
            [
                [1,0,0],
                [1,1,1],
                [0,0,0]
            ]
        ]
    },
    tShape: {
        startPosition: new Position(3,0),
        color: 'rgb(200,0,255)',
        rotations: [
            [
                [0,1,0],
                [1,1,0],
                [0,1,0]
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ]
        ]
    },
    zShape: {
        startPosition: new Position(3,0),
        color: 'rgb(255,0,0)',
        rotations: [
            [
                [1,0,0],
                [1,1,0],
                [0,1,0]
            ],
            [
                [0,0,0],
                [0,1,1],
                [1,1,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,0,1]
            ],
            [
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ]
        ]
    }
}

class ShapePicker {
    shapes = [
        Shapes.oShape,
        Shapes.iShape,
        Shapes.sShape,
        Shapes.jShape,
        Shapes.lShape,
        Shapes.tShape,
        Shapes.zShape
    ];

    pickRandomShape() {
        const min = 0;
        const max = this.shapes.length;
        
        const shapeIndex = Math.floor(Math.random() * (max - min)) + min;

        return this.shapes[shapeIndex];
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
    grid = new Grid(10, 20, () => null);

    constructor() {
    }

    hasCell(col, row) {
        return this.grid.hasCell(col, row);
    }

    setCell(col, row, color) {
        this.grid.setCellValue(col, row, color);
    }

    isOccupied(col, row) {
        return this.grid.hasCellValue(col, row);
    }

    getCompletedRows() {
        const completedRows = [];

        for (var row = 0; row < this.grid.rows; row++) {
            for (var col = 0; col < this.grid.columns; col++){
                if (!this.isOccupied(col, row)) {
                    break;
                }

                if (col == this.grid.columns - 1) {                    
                    completedRows.push(row);
                }
            }
        }

        return completedRows;
    }

    clearCompletedRows() {
        const completedRows = this.getCompletedRows();

        // TODO animate row clearing here
        
        for (var i = 0; i < completedRows.length; i++) {
            this.clearRow(completedRows[i]);
        }
    }

    clearRow(row) {
        for (var clearCol = 0; clearCol < this.grid.columns; clearCol++) {
            this.setCell(clearCol, row, null);
        }

        // move rows above down
        for (var moveRow = row - 1; moveRow >= 0; moveRow--) {
            for (var moveCol = 0; moveCol < this.grid.columns; moveCol++) {
                const valueToMoveDown = this.grid.getCellValue(moveCol, moveRow);
                this.setCell(moveCol, moveRow + 1, valueToMoveDown);
                this.setCell(moveCol, moveRow, null);
            }
        }
    }

    draw(blockPainter) {
        this.grid.walkGrid((col, row, value) => {
            if (value !== null) {
                blockPainter.drawBlock(col, row, this.grid.getCellValue(col, row));
            } else {
                blockPainter.drawBlock(col, row, 'rgb(50 50 50)');
            }
        });
    }
}

class Piece {    
    constructor(board) {
        this.shape = new ShapePicker().pickRandomShape();
        this.rotationIndex = 0;
        this.grid = Grid.createFromCells(this.shape.rotations[this.rotationIndex]);        
        this.position = this.shape.startPosition;

        this.board = board;
    }

    canMove(colChange, rowChange, rotationIndex) {
        const newRotationIndex = rotationIndex || this.rotationIndex;
        const newGrid = Grid.createFromCells(this.shape.rotations[newRotationIndex]);        
        const newPosition = this.position.translate(colChange, rowChange);

        const noCollisionDetected = newGrid.walkGrid((colIndex, rowIndex, value) => {
            if (value === 1) {
                var boardColIndex = newPosition.col + colIndex;
                var boardRowIndex = newPosition.row + rowIndex;

                if (!this.board.hasCell(boardColIndex, boardRowIndex)) {
                    return false;
                }

                if (this.board.isOccupied(boardColIndex, boardRowIndex)) {
                    return false;
                }
            }            
        });

        return noCollisionDetected;
    }

    move(colChange, rowChange) {
        this.position = this.position.translate(colChange, rowChange);
    }

    canRotate() {
        return this.canMove(0, 0, this.getNextRotationIndex());
    }

    rotate() {
        this.rotationIndex = this.getNextRotationIndex();
        this.grid = Grid.createFromCells(this.shape.rotations[this.rotationIndex]);
    }

    getNextRotationIndex() {
        if (this.rotationIndex == this.shape.rotations.length - 1) {
            return 0;
        } else {
            return this.rotationIndex + 1;
        }
    }

    mergeToBoard() {
        this.grid.walkGrid((col, row, value) => {
            if (value === 1) {
                var boardColIndex = this.position.col + col;
                var boardRowIndex = this.position.row + row;

                this.board.setCell(boardColIndex, boardRowIndex, this.shape.color);
            }
        });
    }

    draw(blockPainter) {
        this.grid.walkGrid((col, row, value) => {
            if (value === 1) {
                var boardColIndex = this.position.col + col;
                var boardRowIndex = this.position.row + row;

                blockPainter.drawBlock(boardColIndex, boardRowIndex, this.shape.color);
            }
        });
    }
}

class BlockAttack
{     
    columns = 10;
    rows = 20;
    width = 300;
    height = 600;
    
    board = new Board();
    currentPiece = new Piece(this.board);
    
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
            case 'Space':
                if (this.currentPiece.canRotate()) {
                    this.currentPiece.rotate();
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
        this.board.clearCompletedRows();
        this.currentPiece = new Piece(this.board);
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