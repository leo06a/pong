import { socket } from './constants.js';

export let players = [];
export let ball = {
    pos_x: 800,
    pos_y: 400,
    dx: 5,
    dy: 5,
    size: 10
};

socket.on('players_update', (server_players) => {
    players = server_players
    console.log(players);
});

socket.on('ball_update', (updated_ball) => {
    ball = updated_ball;
});