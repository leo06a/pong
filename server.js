const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Player = require('./game/player.js');
const Ball = require('./game/ball.js');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

let players = [];
let ball = {
    pos_x: 800,
    pos_y: 400,
    dx: 5,
    dy: 5,
    size: 10
}
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    console.log(ball)
    
    socket.on('disconnect', () => {
        console.log('a user disconnected:', socket.id);
        players = players.filter(player => player.id !== socket.id);
    });
    
    let player = Player.create_player();
    player.id = socket.id
    players.push(player);

    if (players.length > 1) {
        players[1].pos_x = 1570;
    }

    io.emit('players_update', players);

    socket.on('player_move', (updated_player) => {
        const index = players.findIndex(p => p.id === updated_player.id);
        players[index].pos_y = updated_player.pos_y; 
    
        io.emit('player_move', updated_player);
    });
});

setInterval(() => {
    ball = Ball.update_ball(ball, players); 
    console.log(ball)
    io.emit('ball_update', ball); 
}, 1000 / 60); 


server.listen(3000, () => {
    console.log('server is running on port 3000');
});