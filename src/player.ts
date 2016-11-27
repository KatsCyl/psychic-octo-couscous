module Game {
    export class Player {
        private readonly SPEED = 100;

        public sprite: Phaser.Sprite

        public flipped: boolean = false

        public dead: boolean = false
        public invulnerable: boolean = false;
        public targetCorpse: Corpse = null;

        private cursors: Phaser.CursorKeys

        constructor(private game: Phaser.Game, x: number, y: number, animations: any, mainCollisionGroup: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, animations)
            mainCollisionGroup.add(this.sprite);
            game.physics.arcade.enableBody(this.sprite)
            this.sprite.anchor = new Phaser.Point(0.5, 0.5)
            this.sprite.smoothed = false;

            this.sprite.animations.add('idle', [0, 1, 2, 3], 5, true)
            this.sprite.animations.add('move', [4, 5, 6, 7, 8], 5, true)
            this.sprite.animations.play('idle')

            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.setSize(this.sprite.width * 0.25, this.sprite.height * 0.1, this.sprite.width * (0.5 - 0.25/2), this.sprite.height * 0.9)

            this.sprite.scale = Game.pixelartScalingFactorsP.clone();
            this.cursors = game.input.keyboard.createCursorKeys();

            (this.sprite as any).customParent = this
        }

        public update(game: Phaser.Game) {
            if (this.dead) {
               if (Phaser.Point.distance(this.sprite.position, this.targetCorpse.getSprite().position) < 50) {
                  console.log("reached corpse");
                  this.dead = false;
                  this.invulnerable = true;
                  setTimeout(() => { this.invulnerable = false; }, 1000);

                  this.targetCorpse.getSprite().kill();
                  this.targetCorpse = null;
               }
            } else {
               this.handleControls()
            }
        }

        public getSprite() {
            return this.sprite;
        }

        public collidesWithBullet(bullet: Bullet): boolean {
           if (this.dead || this.invulnerable) { return false; }

           let bSprite = bullet.getSprite();
           let [bulletX, bulletY] = [bSprite.centerX, bSprite.centerY];

           let left = this.sprite.left
           let right = this.sprite.right
           if (this.flipped) {
               left = this.sprite.right
               right = this.sprite.left
           }
           
           return bulletX > (left - this.game.camera.position.x) && bulletX < (right - this.game.camera.position.x) &&
                  bulletY > this.sprite.top && bulletY < this.sprite.bottom;
        }

        public kill(corpseList: Corpse[]) {
            this.dead = true;

            let myCoords = this.sprite.position;
            let closest: Corpse = null;
            let closestDistance;

            for (let corpse of corpseList) {
               if (!closest) {
                  closest = corpse;
                  closestDistance = Phaser.Point.distance(closest.getSprite().position, myCoords);
               } else {
                  let corpseCoords = corpse.getSprite().position;
                  let distance = Phaser.Point.distance(myCoords, corpseCoords) 
                  if (distance < closestDistance) {
                     closestDistance = distance;
                     closest = corpse;
                  }
               }
            }

            if (!closest) {
               this.dead = false;
               this.sprite.kill(); 
            } else {
               this.targetCorpse = closest;
               this.sprite.animations.stop();
               this.game.physics.arcade.moveToObject(this.sprite, closest.getSprite().position, 300)
               /*
               let movementDirection = this.game.physics.arcade.angleBetween(this.sprite, closest.getSprite()) * (180 / Math.PI);
               this.game.physics.arcade.velocityFromAngle(movementDirection, 300, this.sprite.body.velocity);
               */
            } 
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
