
module Game {
    export class Body {
        protected sprite: Phaser.Sprite
        constructor(game: Phaser.Game, pos: Phaser.Point, spriteKey: string, group: Phaser.Group) {
            this.sprite = game.add.sprite(pos.x, pos.y, spriteKey, undefined, group)
            game.physics.arcade.enableBody(this.sprite)
            this.sprite.smoothed = false;
            this.sprite.scale = Game.pixelartScalingFactorsP
        }
    }
}
