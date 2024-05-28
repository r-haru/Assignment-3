let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


startBtn.addEventListener('click', ()=>{
    startAnimation();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});
stopBtn.addEventListener('click', ()=>{
    stopAnimation();
    startBtn.disabled = false;
    stopBtn.disabled = true;
})



class Circle{
    constructor(x, y, r, dx, dy, color){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
}

let myCircle;
let xPos = (Math.random() * canvas.width);
let yPos = (Math.random() * canvas.height);
let r = Math.random() * 40 + 10;
let dx = (Math.random() - 0.5) * 10;
let dy = (Math.random() - 0.5) * 10;
let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
myCircle = new Circle(xPos, yPos, r, dx, dy, color);

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //circle

    drawCircle(myCircle);

    function drawCircle(circle){
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r/2, 0, Math.PI*2);
        ctx.fill();
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x + circle.r > canvas.width || circle.x < 0) {
            if(circle.x + circle.r > canvas.width){
                circle.x = canvas.width - circle.r;
            }else{
                circle.x = circle.r;
            }
            circle.dx *= -1;
        }
    
        if (circle.y + circle.r > canvas.height || circle.y < 0) {
            if(circle.y + circle.r > canvas.height){
                circle.y = canvas.height - circle.r;
            }else{
                circle.y = circle.r;
            }
            circle.dy *= -1;
        }
    }
}

let lastTime = 0;
let fps = 1000 / 60;

function startAnimation(deltaTime = 0) {
    if(deltaTime - lastTime > fps) {
        lastTime = deltaTime;
        update();
    }
    animation = requestAnimationFrame(startAnimation);
}

function stopAnimation() {
    cancelAnimationFrame(animation);
}