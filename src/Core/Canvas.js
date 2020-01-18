export class Canvas {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    drawOffset = { x: 0, y: 0 };
    ctx = null;

    currentState = null;

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.createCanvas();
    }

    createCanvas() {
        const canvas = document.createElement('canvas');

        canvas.id = "skiCanvas";
        canvas.width = this.width * window.devicePixelRatio;
        canvas.height = this.height * window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        //  setup text
        this.ctx.fillStyle = "blue";
        this.ctx.font = "bold 16px Helvetica";

        document.body.appendChild(canvas);
    }

    clearCanvas() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    setDrawOffset(x, y) {
        this.drawOffset.x = x;
        this.drawOffset.y = y;
    }

    setScore(score, text) {
        this.ctx.fillText('Score: '+ score,  3, 18);
        this.ctx.fillText(text, 3, 36);
        if (text==='paused') {
            console.log(score, text)
        }
    }

    drawImage(image, x, y, width, height) {
        x -= this.drawOffset.x;
        y -= this.drawOffset.y;

        this.ctx.drawImage(image, x, y, width, height);
    }
}