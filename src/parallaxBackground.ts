module Game {
    export class ParallaxBackground{
        private bg1: Phaser.TileSprite
        private bg2: Phaser.TileSprite
        private bg3: Phaser.TileSprite

        public height: number

        constructor (game: Phaser.Game, bgKey1: any, bgKey2:any, bgKey3:any, group: Phaser.Group) {
            let bg1width = game.cache.getImage(bgKey1).width * Game.scalingFactors[0]
            let bg1height = game.cache.getImage(bgKey1).height * Game.scalingFactors[1]
            this.bg1 = game.add.tileSprite(0, 0, bg1width, bg1height, bgKey1, group)
            
            this.height = bg1height

            let bg2width = game.cache.getImage(bgKey2).width * Game.scalingFactors[0]
            let bg2height = game.cache.getImage(bgKey2).height * Game.scalingFactors[1]
            this.bg2 = game.add.tileSprite(0, 0, bg2width, bg2height, bgKey2, group)

            let bg3width = game.cache.getImage(bgKey3).width * Game.scalingFactors[0]
            let bg3height = game.cache.getImage(bgKey3).height * Game.scalingFactors[1]
            this.bg3 = game.add.tileSprite(0, 0, bg3width, bg3height, bgKey3, group)
        }

     update(deltaX: number) {
        this.bg1.tilePosition.x += deltaX * 0.05;
        this.bg2.tilePosition.x += deltaX * 0.3;
        this.bg3.tilePosition.x += deltaX * 0.75;      
    }

    }
}