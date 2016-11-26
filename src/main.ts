import { loadState } from './loadState'
import { menuState } from './menuState'
import { playState } from './playState'

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
        this.game.state.add('loading', loadState, false)
        this.game.state.add('menu', menuState, false)
        this.game.state.add('play', playState, false)

        this.game.state.start('loading');
            
    }

}

window.onload = () => {

    var main = new Main();

};