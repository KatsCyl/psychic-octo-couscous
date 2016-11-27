module Game {
    export class BulletManager {

        private bulletList: Bullet[] = []

        constructor(private game: Phaser.Game) {
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
            this.bulletList.push(new Bullet(this.game, pos.x, pos.y, target))
        }

        kill (bullet: Bullet) {
            bullet.getSprite().kill()
        }

        getBulletList() {
            return this.bulletList;
        }

    }

    export class Bullet {

        public readonly BulletKey = "bullet"

        private sprite: Phaser.Sprite

        private speed: number = 100

        private isActive = false

        private damage: number

        constructor(game: Phaser.Game, x: number, y:number, target: Phaser.Sprite) {
            this.sprite = game.add.sprite(x, y, this.BulletKey)
            game.physics.arcade.enableBody(this.sprite);
            let movementDirection = game.physics.arcade.angleBetween(this.sprite, target) * (180 / Math.PI);

            this.sprite.anchor = new Phaser.Point(0.5, 0.5);

            this.sprite.scale = Phaser.Point.multiply(new Phaser.Point(0.01, 0.01), Game.pixelartScalingFactorsP)

            setTimeout( () => {this.isActive = true}, 2000);

            game.physics.arcade.velocityFromAngle(movementDirection, this.speed, this.sprite.body.velocity);

            (this.sprite as any).customParent = this
            this.sprite.checkWorldBounds = true
            this.sprite.outOfBoundsKill = true
        }


        getActive(): boolean { return this.isActive }
        getSprite(): Phaser.Sprite { return this.sprite }
    }
}
