class Player {
    constructor(socket_id) {
        this.id = socket_id,
        this.pos_x = 10,
        this.pos_y = 0,
        this.width = 20,
        this.height = 100,
        this.speed = 10
    }
}

module.exports = Player;