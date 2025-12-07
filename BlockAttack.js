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

class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class BlockPainter {
    blockWidth = 30;
    blockHeight = 30;    

    constructor(ctx, origin) {
        this.ctx = ctx;
        this.origin = origin;
    }

    drawBlock(col, row, fillStyle) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = 'rgb(25 25 25)';

        const x = this.origin.x + (col * this.blockWidth);
        const y = this.origin.y + (row * this.blockHeight);

        this.ctx.fillRect(x, y, this.blockWidth, this.blockHeight);
        this.ctx.strokeRect(x, y, this.blockWidth, this.blockHeight);
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

class BlockGrid {
    constructor(columns, rows, initialValueFunc) {
        initialValueFunc = initialValueFunc || (() => null);
        this.columns = columns;
        this.rows = rows;
        
        this.grid = new Grid(columns, rows, initialValueFunc);        
    }

    hasCell(col, row) {
        return this.grid.hasCell(col, row);
    }

    setCellValue(col, row, value) {
        this.grid.setCellValue(col, row, value);
    }

    getCellValue(col, row) {
        return this.grid.getCellValue(col, row);
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

class Board {    
    grid = new BlockGrid(10, 20);

    hasCell(col, row) {
        return this.grid.hasCell(col, row);
    }

    setCellValue(col, row, color) {
        this.grid.setCellValue(col, row, color);
    }

    isOccupied(col, row) {
        return this.grid.getCellValue(col, row) !== null;
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
            this.setCellValue(clearCol, row, null);
        }

        // move rows above down
        for (var moveRow = row - 1; moveRow >= 0; moveRow--) {
            for (var moveCol = 0; moveCol < this.grid.columns; moveCol++) {
                const valueToMoveDown = this.grid.getCellValue(moveCol, moveRow);
                this.setCellValue(moveCol, moveRow + 1, valueToMoveDown);
                this.setCellValue(moveCol, moveRow, null);
            }
        }
    }
    
    draw(blockPainter) {
        this.grid.draw(blockPainter);
    }
}

class NextPiece {
    constructor(shape) {        
        this.shape = shape;
        this.rotationIndex = 0;
        this.grid = Grid.createFromCells(this.shape.rotations[this.rotationIndex]);
        this.position = new Position(0,0);
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

    makeCurrentPiece(board) {
        return new CurrentPiece(board, shape);
    }
}

class CurrentPiece {    
    constructor(board, shape) {        
        this.shape = shape;
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

                this.board.setCellValue(boardColIndex, boardRowIndex, this.shape.color);
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
    width = 480;
    height = 600;
    
    shapePicker = new ShapePicker();

    board = new Board();
    currentPiece = new CurrentPiece(this.board, this.shapePicker.pickRandomShape());

    nextPieceGrid = new BlockGrid(4, 4);
    nextPiece = new NextPiece(this.shapePicker.pickRandomShape());
    
    movePieceLastTimeStamp = 0;
    movePieceInterval = 1000;
    movePieceRowIncrement = 1;

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
        this.drawNextPiece();

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
        this.currentPiece = new CurrentPiece(this.board, this.shapePicker.pickRandomShape());
        this.nextPiece = new NextPiece(this.shapePicker.pickRandomShape());
        this.movePieceLastTimeStamp = performance.now();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBoard() {
        var boardPainter = new BlockPainter(this.ctx, new Coordinate(0, 0));
        this.board.draw(boardPainter);
        this.currentPiece.draw(boardPainter);
    }

    drawNextPiece() {
        this.ctx.font = "20px sans-serif";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText("NEXT", 350, 35);

        var nextPiecePainter = new BlockPainter(this.ctx, new Coordinate(320, 50));
        this.nextPieceGrid.draw(nextPiecePainter);
        this.nextPiece.draw(nextPiecePainter);
    }
}