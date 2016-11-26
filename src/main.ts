module Game {

    class Game extends Phaser.Game {

        public scalingFactors: [number, number]

        private wantedGameWidth = 1920
        private wantedGameHeight = 1080


        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'GameDiv');
            var gameWidth = window.innerWidth
            var gameHeight = window.innerHeight
            
            this.scalingFactors = [gameWidth / this.wantedGameWidth, gameHeight / this.wantedGameHeight]

            this.state.add('loading', loadState, false)
            this.state.add('menu', menuState, false)
            this.state.add('play', playState, false)

            this.state.start('loading')

        }



<<<<<<< 51d7962a3b08f10e8984589e1f54ea942bb3ba69
=======
        this.game.state.start('play');
            
>>>>>>> Asd
    }

    window.onload = () => {

        var main = new Game()

    };

}