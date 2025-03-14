const socket = io();
console.log("Connected to server");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function createPlayers() {
    let playerLeft = { x: 50, y: 150, width: 40, height: 40, speed: 5 };
    let playerRight = { x: canvas.width - 90, y: 150, width: 40, height: 40, speed: 5 };

}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    document.addEventListener('keydown', (e) => {
        if (e.key == 'w') {
            
        } else if (e.key == 's') {

        }
    })
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();
