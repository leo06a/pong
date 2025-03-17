import { socket } from './constants.js';
import { animate } from './functions.js';
import './events.js';
 
export let players = [];

socket.on('players_update', (server_players) => {
    players = server_players
    console.log(players);
});

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
        players[index] = updated_player;
});

animate();