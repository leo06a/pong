const Ball = require("./ball");

class Game {
    constructor(io) {
        this.io = io,
        this.players = [],
        this.ball = null,
        this.loop = null,
        this.vote_count = 0,
        this.winner = null
    }
    start_game_loop() {
        if (!this.loop) { // Check if loop is already running
            this.loop = setInterval(() => {
                this.ball.update(this.players, this);
                if (this.players.length === 1) {
                    // If one player leaves while game is running, stop game loop
                    this.stop_game_loop();
                }
                if (this.winner) {
                    this.io.emit('game_over', this.winner);
                    this.stop_game_loop();
                }
                this.io.emit('ball_update', this.ball);
            }, 1000 / 60);
        }
    }
    stop_game_loop() {
        clearInterval(this.loop);
        this.loop = null; // Reset loop after stopping
    }
    reset_game() {
        this.ball = new Ball();
        this.vote_count = 0;
        this.winner = null;
        this.io.emit('reset', this.ball);
        this.start_game_loop();
    }
}

module.exports = Game;