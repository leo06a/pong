import { ctx, canvas } from './constants.js';

function draw_players(players) {
    players.forEach(player => {
        ctx.fillStyle = "black";
        ctx.fillRect(player.pos_x, player.pos_y, 20, 100);
    });
}

function draw_ball(ball) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(ball.pos_x, ball.pos_y, ball.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

export function animate(players) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_players(players);
    draw_ball(ball);
    requestAnimationFrame(animate);
}