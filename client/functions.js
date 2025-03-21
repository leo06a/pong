import { players } from './script.js';
import { ctx, canvas } from './constants.js';

const ball = {
    pos_x: canvas.width / 2,
    pos_y: canvas.height / 2,
    dx: 5,
    dy: 5,
    size: 10        
}

function draw_players() {
    players.forEach(player => {
        ctx.fillStyle = "black";
        ctx.fillRect(player.pos_x, player.pos_y, 20, 100);
    });
}

function draw_ball() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(ball.pos_x, ball.pos_y, ball.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    if (ball.pos_x - ball.size <= 0 || ball.pos_x + ball.size >= canvas.width) {
        ball.dx *= -1; 
    } else if (ball.pos_y - ball.size <= 0 || ball.pos_y + ball.size >= canvas.height) {
        ball.dy *= -1; 
    }

    players.forEach(player => {
        if (ball.pos_x == player.pos_x) {

        }
    });

    ball.pos_x += ball.dx;
    ball.pos_y += ball.dy;
}

export function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_players();
    draw_ball();
    requestAnimationFrame(animate);
}