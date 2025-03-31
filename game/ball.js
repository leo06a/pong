let winner;

class Ball {
    constructor() {
        this.pos_x = 450,
        this.pos_y = 225,
        this.dx = 5,
        this.dy = 5,
        this.size = 10
    }
    check_collision(player) {
        return (
            this.pos_x + this.size > player.pos_x && this.pos_x - this.size < player.pos_x + player.width &&
            this.pos_y + this.size > player.pos_y && this.pos_y - this.size < player.pos_y + player.height
        );
    }
    update(players) {
        if (!this) return;
    
        this.pos_x += this.dx;
        this.pos_y += this.dy;
    
        if (this.pos_y - this.size <= 0 || this.pos_y + this.size >= 450) {
            this.dy *= -1; 
        } else if (this.pos_x - this.size <= 0) {
            winner = 'right player wins';
        } else if (this.pos_x + this.size >= 900) {
            winner = 'left player wins';
        }
    
        players.forEach(player => {
            if (this.check_collision(player)) {
                this.dx *= -1;
            }
        });
        return { ball: this, winner };
    }
}

module.exports = Ball;