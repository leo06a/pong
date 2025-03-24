import { socket } from './constants.js';
import { animate } from './functions.js';
import { players } from './data.js';
import './events.js';

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
        players[index] = updated_player;
});

animate();