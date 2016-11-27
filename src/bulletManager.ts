module Game {
    export class BulletManager {

        private game: Phaser.Game

        private bulletGroup: Phaser.Group

        private bulletList: Bullet[] = []

        constructor(game: Phaser.Game, group: Phaser.Group) {
            this.game = game
            this.bulletGroup = group
        }

        update () {
            console.log(this.bulletList.length)
            for( let i = 0; i < this.bulletList.length; i++) {
                if(!this.bulletList[i].getSprite().alive) {
                    this.bulletList.splice(i, 1)
                }
            }
        }

        createBullet (pos: Phaser.Point, target: Phaser.Sprite) {
            this.bulletList.push(new Bullet(this.game, pos.x, pos.y, target, this.bulletGroup))
        }

        kill (bullet: Bullet) {
            bullet.getSprite().kill()
        }


    }

    export class Bullet {

        public readonly BulletKey = "bullet"

        private sprite: Phaser.Sprite

        private speed: number = 1000

        private isActive = false

        private damage: number

        constructor(game: Phaser.Game, x: number, y:number, target: Phaser.Sprite, group: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, this.BulletKey)
            game.physics.arcade.enableBody(this.sprite);
            let movementDirection = game.physics.arcade.angleBetween(this.sprite, target) * (180 / Math.PI);

            setTimeout(() => {this.isActive = true}, 200);

            game.physics.arcade.velocityFromAngle(movementDirection, this.speed, this.sprite.body.velocity);

            (this.sprite as any).customParent = this
            this.sprite.checkWorldBounds = true
            this.sprite.outOfBoundsKill = true

            group.add(this.sprite)
        }


        getActive(): boolean { return this.isActive }
        getSprite(): Phaser.Sprite { return this.sprite }
    }
}