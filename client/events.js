import { players } from './data.js';
import { socket, player_speed, canvas } from './constants.js';

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == socket.id) {
            switch(e.key) {
                case 'w':
                    players[i].pos_y -= player_speed;
                    break;
                case 's':
                    players[i].pos_y += player_speed;
                    break;
                default:
                    break;
            }
        }
        socket.emit('player_move', players[i]);
    }
});