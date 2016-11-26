module Game {
    export class Game extends Phaser.Game {
        public static scalingFactors: [number, number]

        private wantedGameWidth = 1920
        private wantedGameHeight = 1080

        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'GameDiv');
            
            Game.scalingFactors = [this.width / this.wantedGameWidth, this.height / this.wantedGameHeight]

            this.state.add('loading', loadState, false)
            this.state.add('credits', creditsState, false)
            this.state.add('menu', menuState, false)
            this.state.add('play', playState, false)

            this.state.start('loading')
        }
    }

    window.onload = () => {
        var main = new Game()
    };
}
