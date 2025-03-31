import { socket, winner_div } from './constants.js';
import { animate } from './functions.js';
import './events.js';

let isAnimating;
let players = [];
let ball;

socket.on('game_init', () => {
    isAnimating = true;
    if (isAnimating) {
        animate(players, ball);
    } 
});

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
        players[index] = updated_player;
});

socket.on('players_update', (server_players) => {
    players = server_players
});

socket.on('ball_update', (updated_ball) => {
    ball = updated_ball;
});

socket.on('game_over', (winner) => {
    winner_div.innerHTML += winner;
    winner_div.style.display = 'block';
    isAnimating = false;
});