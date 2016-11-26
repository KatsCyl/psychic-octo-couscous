module Game {
    export class Game extends Phaser.Game {
        public static scalingFactors: [number, number]
        public static scalingFactorsP: Phaser.Point
        public static pixelartScalingFactorsP: Phaser.Point

        private wantedGameWidth = 1920
        private wantedGameHeight = 1080

        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'GameDiv');
            
            Game.scalingFactors = [this.width / this.wantedGameWidth, this.height / this.wantedGameHeight]
            Game.scalingFactorsP = new Phaser.Point(Game.scalingFactors[0], Game.scalingFactors[1])
            Game.pixelartScalingFactorsP = Game.scalingFactorsP.multiply(6, 6)

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
