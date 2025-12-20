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

class BoundedNumber {
    constructor(initialValue, min, max) {
        this.value = initialValue;
        this.min = min;
        this.max = max;
    }

    increment(size) {
        if (this.value + size > this.max) {
            this.value = 0;
        }

        this.value += size;
    }

    decrement(size) {
        if (this.value - size < this.min) {
            this.value = this.max;
        }

        this.value -= size;
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

    translate(xChange, yChange) {
        return new Coordinate(
            this.x + xChange, 
            this.y + yChange);
    }
}

class BlockPainter {
    blockWidth = 30;
    blockHeight = 30;    

    constructor(ctx, origin) {
        this.ctx = ctx;
        this.origin = origin;
    }

    drawBlockOnGrid(col, row, fillStyle) {
        this.ctx.fillStyle = fillStyle;        

        const coordinate = new Coordinate(
            this.origin.x + (col * this.blockWidth),
            this.origin.y + (row * this.blockHeight)
        );

        this.drawBlockAtCoordinate(coordinate, fillStyle);
    }

    drawBlockAtCoordinate(coordinate, fillStyle, rotatedDegrees) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = 'rgb(25 25 25)';
        
        if (rotatedDegrees === undefined) {            
            this.ctx.fillRect(coordinate.x, coordinate.y, this.blockWidth, this.blockHeight);
            this.ctx.strokeRect(coordinate.x, coordinate.y, this.blockWidth, this.blockHeight);
        } else {
            this.ctx.save();            
            this.ctx.translate(coordinate.x + this.blockWidth / 2, coordinate.y + this.blockHeight / 2);
            this.ctx.rotate(rotatedDegrees * Math.PI / 180);
            this.ctx.fillRect(-this.blockWidth / 2, -this.blockHeight / 2, this.blockWidth, this.blockHeight);
            this.ctx.strokeRect(-this.blockWidth / 2, -this.blockHeight / 2, this.blockWidth, this.blockHeight);
            this.ctx.restore();
        }
    }
}

class Grid {    
    constructor(columns, rows, getValueFunc) {
        getValueFunc = (getValueFunc === undefined) ? (() => null) : getValueFunc;
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
        initialValueFunc = (initialValueFunc === undefined) ? (() => null) : initialValueFunc;
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
                blockPainter.drawBlockOnGrid(col, row, this.grid.getCellValue(col, row));
            } else {
                blockPainter.drawBlockOnGrid(col, row, 'rgb(50 50 50)');
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

    getCellValue(col, row) {
        return this.grid.getCellValue(col, row);
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
        
        for (var i = 0; i < completedRows.length; i++) {
            this.clearRow(completedRows[i]);
        }

        this.dropRows(completedRows);
    }

    clearRow(row) {
        for (var clearCol = 0; clearCol < this.grid.columns; clearCol++) {
            this.setCellValue(clearCol, row, null);
        }        
    }

    dropRows(completedRows) {
        for (var i = 0; i < completedRows.length; i++) {
            const completedRow = completedRows[i];

            // move rows above down
            for (var moveRow = completedRow - 1; moveRow >= 0; moveRow--) {
                for (var moveCol = 0; moveCol < this.grid.columns; moveCol++) {
                    const valueToMoveDown = this.grid.getCellValue(moveCol, moveRow);
                    this.setCellValue(moveCol, moveRow + 1, valueToMoveDown);
                    this.setCellValue(moveCol, moveRow, null);
                }
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

                blockPainter.drawBlockOnGrid(boardColIndex, boardRowIndex, this.shape.color);
            }
        });
    }

    makeCurrentPiece(board) {
        return new CurrentPiece(board, this.shape);
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
        const newRotationIndex = (rotationIndex === undefined) ? this.rotationIndex : rotationIndex;
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

                blockPainter.drawBlockOnGrid(boardColIndex, boardRowIndex, this.shape.color);
            }
        });
    }
}

class ClearingBlocksAnimation {
    clearingBlocksRotationDegrees = new BoundedNumber(0, 0, 360);
    isCompleted = false;

    constructor(board) {        
        const completedRows = board.getCompletedRows();
        this.clearedBlocks = [];

        for (var i = 0; i < completedRows.length; i++) {                
            var row = completedRows[i];

            for (var col = 0; col < 10; col++) {
                this.clearedBlocks.push({
                    column: col,
                    row: row,                        
                    color: board.getCellValue(col, row),
                    coordinate: new Coordinate(col * 30, row * 30)
                });
            }
        }
    }

    updateState() {        
        if (this.isCompleted) {
            return;
        }

        let minY = 0;

        for (var i = 0; i < this.clearedBlocks.length; i++) {                
            const clearingBlock = this.clearedBlocks[i];

            if (i === 0) {
                minY = clearingBlock.coordinate.y;
            } else {
                minY = Math.min(clearingBlock.coordinate.y, minY);
            }

            const xTranslation = clearingBlock.column < 5 ? -1 : 1;
            clearingBlock.coordinate = clearingBlock.coordinate.translate(xTranslation, 10);
            this.clearingBlocksRotationDegrees.increment(0.5);
        }

        // if all blocks are off the screen
        if (minY > 600) {
            this.isCompleted = true;            
        }
    }

    draw(blockPainter) {
        if (this.isCompleted) {
            return;
        }

        for (var i = 0; i < this.clearedBlocks.length; i++) {                
            const clearingBlock = this.clearedBlocks[i];

            blockPainter.drawBlockAtCoordinate(
                clearingBlock.coordinate,
                clearingBlock.color,
                this.clearingBlocksRotationDegrees.value);            
        }
    }
}

class MovePieceDownProcess {
    isCompleted = false;
    movePieceInterval = 1000;
    movePieceLastTimeStamp = 0;

    constructor(currentPiece, onPieceLanded) {
        this.currentPiece = currentPiece;
        this.onPieceLanded = onPieceLanded;
    }

    updateState(timestamp) {
        if (this.isCompleted) {
            return;
        }

        if (this.movePieceLastTimeStamp == 0) {
            this.movePieceLastTimeStamp = performance.now();
        }
                
        const elapsedTime = timestamp - this.movePieceLastTimeStamp;

        if (elapsedTime >= this.movePieceInterval) {
            this.movePieceLastTimeStamp = timestamp;

            if (this.currentPiece.canMove(0,1)) {                
                this.currentPiece.move(0,1);
            } else {                
                this.onPieceLanded();
                this.isCompleted = true;
            }
        }
    }
}

const GameState = {
    None: 0,
    Running: 1,    
    GameOver: 2
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

    inputQueue = [];

    movePieceDownProcess = null;
    clearingBlocksAnimation = null;

    gameState = GameState.None;    
    
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.canvas = document.createElement('canvas');        
        this.ctx = this.canvas.getContext('2d');        
    }
    
    run() {
        this.gameState = GameState.Running;

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
        // This is relying on the built in key repeat behavior of the browser for now.
        if (!this.gameState == GameState.Running) {
            return;
        }

        switch (ev.code) {
            case 'ArrowLeft':
                this.inputQueue.push(new MoveLeftCommand());
                break;
            case 'ArrowRight':
                this.inputQueue.push(new MoveRightCommand());
                break;
            case 'ArrowDown':
                this.inputQueue.push(new MoveDownCommand());
                break;
            case 'Space':
                this.inputQueue.push(new DropCommand());
                break;
            case 'ControlLeft':
                this.inputQueue.push(new RotateCommand());                           
        }        
    }

    tick(timestamp) {
        switch (this.gameState)
        {
            case GameState.Running:
                this.updateState(timestamp);
                this.drawBaseScreen();                
                break;
            case GameState.GameOver:                
                this.drawBaseScreen();
                this.drawGameOver();
                break;
        }

        window.requestAnimationFrame(timestamp => this.tick(timestamp));
    }
    
    drawBaseScreen() {
        this.clearCanvas();
        this.drawBoard();
        this.drawNextPiece();
    }

    updateState(timestamp) {
        this.processInputQueue();

        if (this.movePieceDownProcess == null) {
            this.movePieceDownProcess = new MovePieceDownProcess(this.currentPiece, () => this.onPieceLanded());
        }

        this.movePieceDownProcess.updateState(timestamp);

        if (this.clearingBlocksAnimation !== null) {
            this.clearingBlocksAnimation.updateState();

            if (this.clearingBlocksAnimation.isCompleted) {
                this.clearingBlocksAnimation = null;
            }
        }
    }

    processInputQueue() {
        while (this.inputQueue.length > 0) {
            const command = this.inputQueue.shift();
            command.execute(this);
        }
    }

    onPieceLanded() {
        this.mergeCurrentPiece();
    }

    mergeCurrentPiece() {
        this.currentPiece.mergeToBoard();

        if (this.board.getCompletedRows().length > 0) {            
            this.clearingBlocksAnimation = new ClearingBlocksAnimation(this.board);
            this.board.clearCompletedRows();
        }

        this.currentPiece = this.nextPiece.makeCurrentPiece(this.board);
        this.nextPiece = new NextPiece(this.shapePicker.pickRandomShape());
        this.movePieceDownProcess = new MovePieceDownProcess(this.currentPiece, () => this.onPieceLanded());

        if (!this.currentPiece.canMove(0,0)) {
            this.gameState = GameState.GameOver;            
        }       
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGameOver() {
        this.ctx.fillStyle = "rgb(0,0,0, 0.75)";
        this.ctx.roundRect(40, 50, 400, 120, [20]);
        this.ctx.fill();

        this.ctx.font = "bold 40px sans-serif";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText("GAME OVER", 120, 90);
    }

    drawBoard() {
        var blockPainter = new BlockPainter(this.ctx, new Coordinate(0, 0));
        this.board.draw(blockPainter);
        this.currentPiece.draw(blockPainter);        

        if (this.clearingBlocksAnimation !== null) {
            this.clearingBlocksAnimation.draw(blockPainter);
        }
    }

    drawNextPiece() {
        this.ctx.font = "bold 20px sans-serif";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText("NEXT", 363, 35);

        var nextPiecePainter = new BlockPainter(this.ctx, new Coordinate(330, 50));
        this.nextPieceGrid.draw(nextPiecePainter);
        this.nextPiece.draw(nextPiecePainter);
    }
}

 class MoveLeftCommand {    
    execute(blockattack) {        
        if (blockattack.currentPiece.canMove(-1,0)) {
            blockattack.currentPiece.move(-1,0);
        }
    }
}

class MoveRightCommand {    
    execute(blockattack) {
        if (blockattack.currentPiece.canMove(1,0)) {
            blockattack.currentPiece.move(1,0);
        }
    }
}

class MoveDownCommand{
    execute(blockattack) {  
        if (blockattack.currentPiece.canMove(0,1)) {                    
            blockattack.currentPiece.move(0,1);
            blockattack.movePieceLastTimeStamp = performance.now();
        } else {
            blockattack.mergeCurrentPiece();
        }
    }        
}

class RotateCommand {    
    execute(blockattack) {
        if (blockattack.currentPiece.canRotate()) {
            blockattack.currentPiece.rotate();
        }
    }
}

class DropCommand {
    execute(blockattack) { 
        while (blockattack.currentPiece.canMove(0,1)) {
            blockattack.currentPiece.move(0,1);
        }

        blockattack.mergeCurrentPiece();
    }
}