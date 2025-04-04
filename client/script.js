import { socket, winner_div, canvas, join_button, title_screen } from './constants.js';
import { animate } from './functions.js';
import './events.js';

let isAnimating;
let players = [];
let ball;

join_button.addEventListener('click', () => {
    canvas.style.display = 'block';
    title_screen.style.display = 'none';
    socket.emit('join_game');
});

socket.on('game_init', () => {
    isAnimating = true;
    console.log('hllo')
    if (isAnimating) {
        animate(players, ball);
    } 
});

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
        players[index] = updated_player;
});

socket.on('players_update', (server_players) => {
    players = server_players;
});

socket.on('ball_update', (updated_ball) => {
    ball = updated_ball;
});

socket.on('game_over', (winner) => {
    winner_div.textContent = winner;
    winner_div.style.display = 'block';
    isAnimating = false;
});