
class BlockAttack
{       
    width = 300;
    height = 600;
    blockWidth = 30;
    blockHeight = 30;

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
    }
    
    run() {
        this.rootElement.height = this.height;
        this.rootElement.width = this.width;

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.rootElement.appendChild(this.canvas);

        this.clearCanvas();
        
        for (var col = 0; col < 10; col++) {
            for (var row = 0; row < 20; row++) {
                this.drawBlock(col, row);                
            }
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBlock(col, row) {
        this.ctx.fillStyle = "rgb(255 0 0)";
        this.ctx.strokeStyle = "rgb(125 0 0)";

        var x = col * this.blockWidth;
        var y = row * this.blockHeight;

        this.ctx.fillRect(x, y, this.blockWidth, this.blockHeight);
        this.ctx.strokeRect(x, y, this.blockWidth, this.blockHeight);
    }
}