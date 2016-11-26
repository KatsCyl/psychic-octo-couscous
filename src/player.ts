module Game {
    export class Player {

        private cursors: Phaser.CursorKeys
        public sprite: Phaser.Sprite
        private flipped: boolean = false

        constructor(game: Phaser.Game, x: number, y: number, animations: any, group: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, animations, group)
            this.sprite.anchor = new Phaser.Point(0.5, 0.5)
            this.sprite.smoothed = false;

            this.sprite.animations.add('idle', [0, 1, 2, 3], 5, true)
            this.sprite.animations.add('move', [4, 5, 6, 7, 8], 5, true)
            this.sprite.animations.play('idle')

            game.physics.arcade.enableBody(this.sprite)

            this.sprite.body.checkCollision = true
            this.sprite.body.setSize(this.sprite.width * 0.25, this.sprite.height * 0.1, this.sprite.width * (0.5 - 0.25/2), this.sprite.height * 0.9)

            this.sprite.scale = new Phaser.Point(1.5, 1.5)

            this.cursors = game.input.keyboard.createCursorKeys();
        }

        update() {
            this.handleControls()
        }

        private flip () {
            this.sprite.scale.x *= -1
        }

        private handleControls() {
            if (this.cursors.left.isDown) {
                if (!this.flipped) {
                    this.flip()
                    this.flipped = true
                }
                this.sprite.animations.play('move')
                this.sprite.body.velocity.x = -15
            } else if ( this.cursors.right.isDown) {
                if (this.flipped) {
                    this.flip()
                    this.flipped = false
                }
                this.sprite.animations.play('move')
                this.sprite.body.velocity.x = 15
            } else if ( this.cursors.up.isDown) {
                this.sprite.animations.play('move')
                this.sprite.body.velocity.y = -15
            } else if ( this.cursors.down.isDown) {
                this.sprite.animations.play('move')
                this.sprite.body.velocity.y = 15
            } else {
                this.sprite.animations.play('idle')
                this.sprite.body.velocity.x = 0

            }
        }
    }
}
