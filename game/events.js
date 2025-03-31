function handle_event(key, players, socket_id, io) {
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == socket_id) {
            switch(key) {
                case 'w':
                    players[i].pos_y -= players[i].speed;
                    break;
                case 's':
                    players[i].pos_y += players[i].speed;
                    break;
                default:
                    break;
            }
            io.emit('player_move', players[i]);
        }
    }
}

module.exports = {
    handle_event
}