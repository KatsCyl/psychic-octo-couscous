module Game {
    export class Player {
        private readonly SPEED = 100;

        public sprite: Phaser.Sprite

        private flipped: boolean = false
        private cursors: Phaser.CursorKeys

        constructor(game: Phaser.Game, x: number, y: number, animations: any, group: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, animations)
            group.add(this.sprite);
            this.sprite.anchor = new Phaser.Point(0.5, 0.5)
            this.sprite.smoothed = false;

            this.sprite.animations.add('idle', [0, 1, 2, 3], 5, true)
            this.sprite.animations.add('move', [4, 5, 6, 7, 8], 5, true)
            this.sprite.animations.play('idle')

            game.physics.arcade.enableBody(this.sprite)

            this.sprite.body.checkCollision = true
            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.setSize(this.sprite.width * 0.25, this.sprite.height * 0.1, this.sprite.width * (0.5 - 0.25/2), this.sprite.height * 0.9)

            this.sprite.scale = Game.pixelartScalingFactorsP.clone();

            this.cursors = game.input.keyboard.createCursorKeys();
        }

        public update(game: Phaser.Game) {
            this.handleControls()
        }

        public getSprite() {
            return this.sprite;
        }

        private flip () {
            this.sprite.scale.x *= -1
        }

        private handleControls() {
            if (!this.cursors.left.isDown && !this.cursors.right.isDown &&
                !this.cursors.up.isDown && !this.cursors.down.isDown) {
                this.sprite.animations.play('idle')
                this.sprite.body.velocity = new Phaser.Point(0,0)
            } else {
               if (this.cursors.left.isDown) {
                   if (!this.flipped) {
                       this.flip()
                       this.flipped = true
                   }
                   this.sprite.animations.play('move')
                   this.sprite.body.velocity.x = -this.SPEED
               } else if ( this.cursors.right.isDown) {
                   if (this.flipped) {
                       this.flip()
                       this.flipped = false
                   }
                   this.sprite.animations.play('move')
                   this.sprite.body.velocity.x = this.SPEED
               } else {
                   this.sprite.body.velocity.x = 0;
               }
               
               if (this.cursors.down.isDown) {
                   this.sprite.animations.play('move')
                   this.sprite.body.velocity.y = this.SPEED
               } else if (this.cursors.up.isDown) {
                   this.sprite.animations.play('move')
                   this.sprite.body.velocity.y = -this.SPEED
               } else {
                   this.sprite.body.velocity.y = 0;
               }
            }
        }
    }
}
