class Main {

    public scalingFactors: [number, number]
    public game: Phaser.Game

    private wantedGameWidth = 1920
    private wantedGameHeight = 1080


    constructor() {
        var gameWidth = window.innerWidth
        var gameHeight = window.innerHeight
        
        this.scalingFactors = [gameWidth / this.wantedGameWidth, gameHeight / this.wantedGameHeight]

        this.game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, 'gameDiv');


    }

    preload() {
        this.game.load.image('logo', 'phaser2.png');
    }

    create() {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }

}

window.onload = () => {

    var main = new Main();

};