const canvas_height = 450;

function handle_event(key, players, socket_id, io) {
    // Handle player movement based on key input
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

            if (players[i].pos_y <= 0) {
                players[i].pos_y = 0;
            } else if (players[i].pos_y >= canvas_height - players[i].height) {
                players[i].pos_y = canvas_height - players[i].height;
            }
            io.emit('player_move', players[i]);
        }
    }
}

module.exports = {
    handle_event
}