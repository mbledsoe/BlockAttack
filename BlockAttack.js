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

    drawBlockAtCoordinate(coordinate, fillStyle) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.strokeStyle = 'rgb(25 25 25)';        
        
        this.ctx.fillRect(coordinate.x, coordinate.y, this.blockWidth, this.blockHeight);
        this.ctx.strokeRect(coordinate.x, coordinate.y, this.blockWidth, this.blockHeight);
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
4
    hasCell(col, row) {4
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
    }

    clearRow(row) {
        for (var clearCol = 0; clearCol < this.grid.columns; clearCol++) {
            this.setCellValue(clearCol, row, null);
        }        
    }

    getEmptyRows() {
        const emptyRows = [];

        for (var row = 0; row < this.grid.rows; row++) {
            for (var col = 0; col < this.grid.columns; col++){
                if (this.isOccupied(col, row)) {
                    break;
                }

                if (col == this.grid.columns - 1) {                    
                    emptyRows.push(row);
                }
            }
        }

        return emptyRows;
    }

    dropRows() {
        const emptyRows = this.getEmptyRows();

        for (var i = 0; i < emptyRows.length; i++) {
            const emptyRow = emptyRows[i];

            // move rows above down
            for (var moveRow = emptyRow - 1; moveRow >= 0; moveRow--) {
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

class ClearingLinesAnimation {    
    isCompleted = false;
    nextLeftBlockIndex = 4;
    nextRightBlockIndex = 5;
    lastBlockRemovalTime = 0;

    constructor(board) {
        const completedRows = board.getCompletedRows();
        this.clearedBlocks = [];

        for (var i = 0; i < completedRows.length; i++) {                
            var row = completedRows[i];
            this.clearedBlocks[i] = [];

            for (var col = 0; col < 10; col++) {
                this.clearedBlocks[i][col] = {
                    color: board.getCellValue(col, row),
                    coordinate: new Coordinate(col * 30, row * 30)
                };
            }
        }
    }

    updateState(timestamp) {
        if (this.isCompleted) {
            return;
        }

        if ((timestamp - this.lastBlockRemovalTime) < 75) {
            return;
        }

        if (this.nextLeftBlockIndex < 0) {
            this.isCompleted = true;
            return;
        }    

        for (var i = 0; i < this.clearedBlocks.length; i++) {
            this.clearedBlocks[i][this.nextLeftBlockIndex] = null;
            this.clearedBlocks[i][this.nextRightBlockIndex] = null;            
        }

        this.nextLeftBlockIndex--;
        this.nextRightBlockIndex++;

        this.lastBlockRemovalTime = timestamp;
    }

    draw(blockPainter) {
        for (var i = 0; i < this.clearedBlocks.length; i++) {
            for (var col = 0; col < 10; col++) {                
                const clearingBlock = this.clearedBlocks[i][col];

                if (clearingBlock !== null) {
                    blockPainter.drawBlockAtCoordinate(
                    clearingBlock.coordinate,
                    clearingBlock.color);                
                }            
            }
        }
    }
}

class MovePieceDownProcess {
    isCompleted = false;
    movePieceInterval = 1000;
    movePieceLastTimeStamp = 0;

    constructor(currentPiece) {
        this.currentPiece = currentPiece;        
    }

    reset() {
        this.movePieceLastTimeStamp = 0;
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
                this.isCompleted = true;
            }
        }
    }
}

const GameState = {
    None: 0,
    Running: 1,
    ClearingLines: 2,    
    GameOver: 3
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

    soundEffects = new SoundEffectLibrary();

    keyboardMonitorProcess = null;
    movePieceDownProcess = null;
    clearingLinesAnimation = null;

    gameState = GameState.None;    
    lines = 0;
    
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
        
        this.keyboardMonitorProcess = new KeyboardMonitorProcess(this.inputQueue);
        this.movePieceDownProcess = new MovePieceDownProcess(this.currentPiece, () => this.onPieceLanded());

        this.clearCanvas();
        this.drawBoard();

        this.tick(performance.now());
    }

    tick(timestamp) {
        switch (this.gameState)
        {
            case GameState.Running:                
                this.updateRunningState(timestamp);
                this.drawBaseScreen();                
                break;
            case GameState.ClearingLines:                
                this.updateClearingLinesState(timestamp);
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
        this.drawLines();
    }

    updateRunningState(timestamp) {
        this.keyboardMonitorProcess.updateState(timestamp);
        this.processInputQueue();
        
        this.movePieceDownProcess.updateState(timestamp);

        if (this.movePieceDownProcess.isCompleted) {
            this.mergeCurrentPiece();
        }
    }

    updateClearingLinesState(timestamp) {
        this.clearingLinesAnimation.updateState(timestamp);

        if (this.clearingLinesAnimation.isCompleted) { 
            this.board.dropRows();
            this.startNewPiece();
        }
    }

    startNewPiece() {
        this.currentPiece = this.nextPiece.makeCurrentPiece(this.board);
        this.nextPiece = new NextPiece(this.shapePicker.pickRandomShape());
        this.movePieceDownProcess = new MovePieceDownProcess(this.currentPiece);

        if (this.currentPiece.canMove(0, 0)) {
            this.gameState = GameState.Running;
        } else {
            this.gameState = GameState.GameOver;
        }
    }

    processInputQueue() {
        while (this.inputQueue.length > 0) {
            const command = this.inputQueue.shift();
            command.execute(this);
        }
    }

    resetMovePieceDownProcess() {
        this.movePieceDownProcess.reset();
    }

    mergeCurrentPiece() {
        this.currentPiece.mergeToBoard();
        const completedRows = this.board.getCompletedRows();
        
        if (completedRows.length === 0) {            
            this.soundEffects.pieceLanded.play();
            this.startNewPiece();
        } else {
            this.clearingLinesAnimation = new ClearingLinesAnimation(this.board);
            this.board.clearCompletedRows();
            this.soundEffects.linesCleared.play();
            this.lines += completedRows.length;

            this.gameState = GameState.ClearingLines;
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGameOver() {
        this.ctx.fillStyle = "rgb(0,0,0)";
        this.ctx.fillRect(40, 50, 400, 120);

        this.ctx.font = "bold 40px sans-serif";
        this.ctx.textBaseline = "top";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText("GAME OVER", 120, 90);
    }

    drawBoard() {
        var blockPainter = new BlockPainter(this.ctx, new Coordinate(0, 0));
        this.board.draw(blockPainter);

        if (this.gameState === GameState.ClearingLines) {
            this.clearingLinesAnimation.draw(blockPainter);
        } else {
            this.currentPiece.draw(blockPainter);
        }
    }

    drawNextPiece() {
        this.ctx.font = "bold 20px sans-serif";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText("NEXT", 363, 140);

        var nextPiecePainter = new BlockPainter(this.ctx, new Coordinate(330, 150));
        this.nextPieceGrid.draw(nextPiecePainter);
        this.nextPiece.draw(nextPiecePainter);
    }

    drawLines() {        
        this.ctx.font = "bold 20px sans-serif";
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText("LINES", 363, 35);
        
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(330, 45, 120, 30);

        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillText(this.lines, 363, 67);
    }
}

class KeyboardState {    
    keyDownStates = {};

    constructor() {
        window.addEventListener('keyup', (ev) => this.onKeyup(ev));
        window.addEventListener('keydown', (ev) => this.onKeydown(ev));
    }

    onKeydown(ev) {        
        this.keyDownStates[ev.code] = true;
    }

    onKeyup(ev) {
        this.keyDownStates[ev.code] = false;
    }

    isDown(keycode) {
        return this.keyDownStates[keycode] === true;
    }
    
    reset(keycode) {
        this.keyDownStates[keycode] = false;
    }
}

class KeyMonitor {
    lastEventTimestamp = 0;

    constructor(keycode, repeatIntervalMs, autoReset, eventCallback) {
        this.keycode = keycode;
        this.repeatInterval = repeatIntervalMs;
        this.autoReset = autoReset;
        this.eventCallback = eventCallback;
    }

    updateState(timestamp, keyboardState) {
        const elapsedTime = timestamp - this.lastEventTimestamp;

        if (!keyboardState.isDown(this.keycode)) {
            this.lastEventTimestamp = 0;                       
            return;
        }

        if (this.lastEventTimestamp === 0 || elapsedTime >= this.repeatInterval) {
            if (this.autoReset) {
                keyboardState.reset(this.keycode);
            }

            this.lastEventTimestamp = performance.now();
            this.eventCallback();
        }
    }
}

class KeyboardMonitorProcess {
    keyboardState = new KeyboardState();
    keymonitors = [];

    constructor(inputQueue) {        
        this.inputQueue = inputQueue;

        this.addKeyMonitor('ArrowLeft', 50, false, () => new MoveLeftCommand());
        this.addKeyMonitor('ArrowRight', 50, false, () => new MoveRightCommand());
        this.addKeyMonitor('ArrowDown', 50, false, () => new MoveDownCommand());
        this.addKeyMonitor('Space', 200, true, () => new DropCommand());
        this.addKeyMonitor('ControlLeft', 100, false, () => new RotateCommand());
    }

    updateState(timestamp) {
        for (var i = 0; i < this.keymonitors.length; i++) {
            this.keymonitors[i].updateState(timestamp, this.keyboardState);
        }
    }

    addKeyMonitor(keycode, repeatIntervalMs, autoReset, commandFactory) {
        this.keymonitors.push(new KeyMonitor(
            keycode,
            repeatIntervalMs,
            autoReset,
            () => this.inputQueue.push(commandFactory())
        ));
    }
}

class MoveLeftCommand {    
    execute(blockattack) {        
        if (blockattack.currentPiece.canMove(-1,0)) {
            blockattack.currentPiece.move(-1,0);
            blockattack.soundEffects.pieceMoved.play();
        }
    }
}

class MoveRightCommand {    
    execute(blockattack) {
        if (blockattack.currentPiece.canMove(1,0)) {
            blockattack.currentPiece.move(1,0);
            blockattack.soundEffects.pieceMoved.play();
        }
    }
}

class MoveDownCommand {
    execute(blockattack) {        
        if (blockattack.currentPiece.canMove(0,1)) {                    
            blockattack.currentPiece.move(0,1);
            blockattack.soundEffects.pieceMoved.play();
            blockattack.resetMovePieceDownProcess();
        } else {
            blockattack.mergeCurrentPiece();
        }
    }        
}

class RotateCommand {    
    execute(blockattack) {
        if (blockattack.currentPiece.canRotate()) {
            blockattack.currentPiece.rotate();
            blockattack.soundEffects.pieceRotated.play();
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

class SoundEffect {
    isPlaying = false;

    constructor(path) {
        this.sound = new Audio(path);
    }

    play() {
        if (this.isPlaying) {
            this.sound.pause();
            this.sound.currentTime = 0;
        }

        this.isPlaying = true;
        this.sound.play();
    }
}

class SoundEffectLibrary {
    pieceLanded = new SoundEffect('wooden-thud-mono-6244.mp3');
    linesCleared = new SoundEffect('flash-laser-gun-84914.mp3');
    pieceMoved = new SoundEffect('confirm-tap-394001.mp3');
    pieceRotated = new SoundEffect('ding-sound-246413.mp3')
}