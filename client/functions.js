import { players, ball } from './data.js';
import { ctx, canvas } from './constants.js';

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
}

export function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_players();
    draw_ball();
    requestAnimationFrame(animate);
}