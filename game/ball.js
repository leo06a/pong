function check_collision(ball, player) {
    return (
        ball.pos_x + ball.size > player.pos_x && ball.pos_x - ball.size < player.pos_x + 20 &&
        ball.pos_y + ball.size > player.pos_y && ball.pos_y - ball.size < player.pos_y + 100
    );
}

let winner = null;

function update_ball(ball, players) {
    if (!ball) return;

    ball.pos_x += ball.dx;
    ball.pos_y += ball.dy;

    if (ball.pos_y - ball.size <= 0 || ball.pos_y + ball.size >= 800) {
        ball.dy *= -1; 
    } else if (ball.pos_x - ball.size <= 0) {
        // right player win
        winner = 'right player wins';
        ball.dx *= -1;
    } else if (ball.pos_x + ball.size >= 1600) {
        // left player win
        winner = 'left player wins';
        ball.dx *= -1;
    }

    players.forEach(player => {
        if (check_collision(ball, player)) {
            ball.dx *= -1;
        }
    });
    return { ball, winner };
}

module.exports = {
    update_ball
}