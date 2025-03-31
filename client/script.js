import { socket } from './constants.js';
import { animate } from './functions.js';
import { players } from './data.js';
import './events.js';

let isAnimating;
let winner_div = document.getElementById('winner');

socket.on('game_init', () => {
    isAnimating = true;
    if (isAnimating) {
        animate();
    }
});

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
        players[index] = updated_player;
});

socket.on('game_over', (winner) => {
    winner_div.innerHTML += winner;
    winner_div.style.display = 'block';
    isAnimating = false;
});