import { players } from './script.js';
import { ctx, canvas } from './constants.js';

export function draw_players() {
    players.forEach(player => {
        ctx.fillStyle = "black";
        ctx.fillRect(player.pos_x, player.pos_y + 10, 20, 100);
    });
}

export function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_players();
    requestAnimationFrame(animate);
}