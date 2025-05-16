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
const Game = require('./game/game.js');

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

let game = new Game(io);
game.ball = new Ball();

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('a user disconnected:', socket.id);
        game.players = game.players.filter(player => player.id !== socket.id); // Remove disconnected player from game.players array

        io.emit('players_update', game.players);
    });
    
    socket.on('join_game', () => {
        console.log('a user connected:', socket.id);

        let player = new Player(socket.id);

        if (game.players.length === 1) {
            // One player already in game, assign new player to the opposite side
            // Ensures existing player does not switch sides
            const existing = game.players[0];
            if (existing.pos_x === 10) {
                player.pos_x = 870;
            } else {
                player.pos_x = 10;
            }
            game.players.push(player);

            // Start game
            io.emit('game_init', game.ball);
            game.reset_game();
            game.start_game_loop();
        } else if (game.players.length === 0) {
            // First player to join, always left
            player.pos_x = 10;
            game.players.push(player);
        }

        io.emit('players_update', game.players);
    });

    socket.on('player_move', (key, socket_id) => {
        Events.handle_event(key, game.players, socket_id, io);
    });

    socket.on('player_vote', () => {
        game.vote_count++;
        if (game.vote_count === game.players.length && game.players.length > 1) {
            game.reset_game();
        }
    });
});

server.listen(3000, () => {
    console.log('server is running on port 3000');
});