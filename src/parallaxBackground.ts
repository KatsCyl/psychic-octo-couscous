module Game {
    export class ParallaxBackground{
        private bg1: Phaser.TileSprite
        private bg2: Phaser.TileSprite
        private bg3: Phaser.TileSprite
        
        private wantedBgWidth: number = 1920 * 3
        private wantedBgHeight: number = (1080 / 3)

        private camera: Phaser.Camera

        public height: number

        constructor (game: Phaser.Game, bgKey1: any, bgKey2:any, bgKey3:any, group: Phaser.Group) {
            let actualWidth = this.wantedBgWidth * Game.scalingFactors[0]
            let actualHeight = this.wantedBgHeight * Game.scalingFactors[1]

            this.camera = game.camera

            this.bg1 = game.add.tileSprite(0, 0, actualWidth, actualHeight, bgKey1)
            this.height = actualHeight

            this.bg2 = game.add.tileSprite(0, 0, actualWidth, actualHeight, bgKey2)

            this.bg3 = game.add.tileSprite(0, 0, actualWidth, actualHeight, bgKey3)
        }

     update(dx: number) {
        this.bg1.tilePosition.x = dx - dx * 0.05;
        this.bg2.tilePosition.x = dx - dx * 0.3;
        this.bg3.tilePosition.x = dx - dx * 0.75;      
    }

    }
}