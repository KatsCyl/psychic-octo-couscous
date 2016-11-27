module Game {
    export class Player {
        private readonly SPEED = 100;

        public sprite: Phaser.Sprite
        public feetCollisionSprite: Phaser.Sprite

        private flipped: boolean = false
        private cursors: Phaser.CursorKeys

        constructor(game: Phaser.Game, x: number, y: number, animations: any, mainCollisionGroup: Phaser.Group, feetCollisionGroup: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, animations)
            mainCollisionGroup.add(this.sprite);
            game.physics.arcade.enableBody(this.sprite)
            this.sprite.anchor = new Phaser.Point(0.5, 0.5)
            this.sprite.smoothed = false;

            this.sprite.animations.add('idle', [0, 1, 2, 3], 5, true)
            this.sprite.animations.add('move', [4, 5, 6, 7, 8], 5, true)
            this.sprite.animations.play('idle')

            this.feetCollisionSprite = game.add.sprite(x, y, animations)
            this.feetCollisionSprite.visible = false
            feetCollisionGroup.add(this.feetCollisionSprite)
            game.physics.arcade.enableBody(this.feetCollisionSprite)
            this.feetCollisionSprite.anchor = new Phaser.Point(0.5, 0.5)
            this.feetCollisionSprite.body.collideWorldBounds = true;
            this.feetCollisionSprite.body.setSize(this.sprite.width * 0.25, this.sprite.height * 0.1, this.sprite.width * (0.5 - 0.25/2), this.sprite.height * 0.9)
            this.sprite.addChild(this.feetCollisionSprite);

            

            this.feetCollisionSprite.scale = Game.pixelartScalingFactorsP.clone();
            this.sprite.scale = Game.pixelartScalingFactorsP.clone();

            this.cursors = game.input.keyboard.createCursorKeys();

            (this.sprite as any).customParent = this
        }

        public update(game: Phaser.Game) {
            this.feetCollisionSprite.body.position = Phaser.Point.add(this.sprite.body.position, new Phaser.Point(this.sprite.width * (0.5 - 0.25/2), this.sprite.height * 0.9))

            this.handleControls()
        }

        public getSprite() {
            return this.sprite;
        }

        public getFeetSprite() {
            return this.feetCollisionSprite
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
