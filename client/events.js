import { socket } from './constants.js';

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    socket.emit('player_move', e.key.toLowerCase(), socket.id);
});