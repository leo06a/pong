const socket = io();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let players = [];

function draw_players() {
    players.forEach(player => {
        ctx.fillStyle = "black";
        ctx.fillRect(player.pos_x, player.pos_y + 10, 20, 100);
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_players();
    requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    for (let i = 0; i < players.length; i++) {
        if (players[i].id == socket.id) {
            switch(e.key) {
                case 'w':
                    players[i].pos_y -= 3;
                    break;
                case 's':
                    players[i].pos_y += 3;
                    break;
                default:
                    break;
            }
        }
        socket.emit('player_move', players[i]);
    }
});

socket.on('players_update', (server_players) => {
    players = server_players
    console.log(players);
});

socket.on('player_move', (updated_player) => {
    const index = players.findIndex(p => p.id === updated_player.id);
        players[index] = updated_player;
});

animate();