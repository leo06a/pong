const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Player = require('./game/player.js');
const Ball = require('./game/ball.js');
const Events = require('./game/events.js');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

let players = [];
let ball = new Ball();
let update;

function start_game_loop() {
    let game_loop = setInterval(() => {
        update = ball.update(players);

        if (update.winner) {
            io.emit('game_over', update.winner);
            clearInterval(game_loop);
            return;
        }

        io.emit('game_init');
        io.emit('ball_update', update.ball);
    }, 1000 / 60);
}

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('a user disconnected:', socket.id);
        players = players.filter(player => player.id !== socket.id);
        io.emit('players_update', players);
    });
    
    let player = new Player(socket.id);
    players.push(player);

    if (players.length > 1) {
        players[1].pos_x = 870;
        start_game_loop();
    }

    io.emit('players_update', players);


    socket.on('player_move', (key, socket_id) => {
        Events.handle_event(key, players, socket_id, io);
    });
});


server.listen(3000, () => {
    console.log('server is running on port 3000');
});