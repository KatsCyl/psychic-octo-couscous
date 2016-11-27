module Game {
    export class Corpse {
        private sprite: Phaser.Sprite

        constructor(game: Phaser.Game, x: number, y: number, image: string, group: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, image)
            this.sprite.y -= this.sprite.height / 2
            group.add(this.sprite)
            this.sprite.smoothed = false;
            this.sprite.scale = Game.pixelartScalingFactorsP

            game.physics.arcade.enableBody(this.sprite)

            this.sprite.body.checkCollision = true
            this.sprite.body.immovable = true;
            this.sprite.body.setSize(this.sprite.width, this.sprite.height * 0.1, 0, this.sprite.height * 0.9)
        }

        public getSprite(): Phaser.Sprite {
            return this.sprite;
        }
    }
}
