function create_player() {
    let player = {
        id: 0,
        pos_x: 10,
        pos_y: 0,
        speed: 10
    }
    return player;
}

module.exports = {
    create_player
}