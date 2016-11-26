module Game {
    export class Obstacle {
        private sprite: Phaser.Sprite

        constructor(game: Phaser.Game, x: number, y: number, image: any, group: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, image)
            group.add(this.sprite)
            this.sprite.smoothed = false;

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
