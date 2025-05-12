import { socket, status, canvas, join_button, title_screen, ctx, vote_button } from './constants.js';
import './events.js';

let isAnimating;
let players = [];
let ball;

join_button.addEventListener('click', () => {
    canvas.style.display = 'block';
    title_screen.style.display = 'none';
    socket.emit('join_game');
});

vote_button.addEventListener('click', () => {
	socket.emit('player_vote');
	vote_button.disabled = true;
});

socket.on('game_init', (init_ball) => {
    ball = init_ball;
    isAnimating = true;
    if (isAnimating) {
        requestAnimationFrame(animate);
    }
});

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
    players[index] = updated_player; // Update local player data with latest position
});

socket.on('players_update', (server_players) => {
    players = server_players;

    if (players.length === 1) {
        console.log('helo');
        vote_button.style.display = 'none';
        status.style.display = 'block';
        status.textContent = 'waiting for another player to join...';
    } else {
        status.style.display = 'none';
    }
});

socket.on('ball_update', (updated_ball) => {
    ball = updated_ball;
});

socket.on('game_over', (winner) => {
    status.textContent = winner + ' wins!';
    status.style.display = 'block';
    vote_button.style.display = 'block';
    isAnimating = false;

    if (players.length === 1) {
        status.textContent = 'waiting for another player to join...';
    }
});

socket.on('reset', (new_ball) => {
    ball = new_ball;
    vote_button.style.display = 'none';
    vote_button.disabled = false;
    status.textContent = '';
    status.style.display = 'none';
    isAnimating = true;
    requestAnimationFrame(animate);
});

function draw_players() {
    players.forEach(player => {
        ctx.fillStyle = 'black';
        ctx.fillRect(player.pos_x, player.pos_y, player.width, player.height);
    });
}

function draw_ball() {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(ball.pos_x, ball.pos_y, ball.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_players();
    draw_ball();
    requestAnimationFrame(animate);
}