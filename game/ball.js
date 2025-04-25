const canvas_width = 900;
const canvas_height = 450;

class Ball {
    constructor() {
        this.pos_x = canvas_width / 2,
        this.pos_y = canvas_height / 2,
        this.dx = Math.random() * (7 - 4) + 3;  // Random horizontal speed between 4 and 7
        this.dy = Math.random() * (7 - 4) + 3;  // Random vertical speed between 4 and 7
        this.size = 10,
        this.winner = null
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
    
        if (this.pos_y - this.size <= 0 || this.pos_y + this.size >= canvas_height) {
            this.dy *= -1; 
        } else if (this.pos_x - this.size <= 0) {
            this.winner = 'right player wins';
            this.dy = 0;
            this.dx = 0;
        } else if (this.pos_x + this.size >= canvas_width) {
            this.winner = 'left player wins';
            this.dy = 0;
            this.dx = 0;
        }
    
        players.forEach(player => {
            if (this.check_collision(player)) {
                this.dx *= -1;
            }
        });
        return this;
    }
}

module.exports = Ball;