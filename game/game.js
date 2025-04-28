const Ball = require("./ball");

class Game {
    constructor(io) {
        this.io = io,
        this.players = [],
        this.ball = null,
        this.loop = false,
        this.vote_count = 0,
        this.winner = null
    }
    start_game_loop() {
        if (!this.loop) {
            this.loop = true;
            setInterval(() => {
                this.ball.update(this.players, this);
                if (this.winner) {
                    this.io.emit('game_over', this.winner);
                }
                this.io.emit('ball_update', this.ball);
            }, 1000 / 60);
        }
    }
    reset_game() {
        this.ball = new Ball();
        this.vote_count = 0;
        this.winner = null;
        this.io.emit('reset', this.ball);
    }
}

module.exports = Game;