module Game {
    export abstract class Enemy {
        protected sprite: Phaser.Sprite
        protected health: number
        protected speed: number

        constructor(game: Phaser.Game, x: number, y: number, spriteKey: string, group: Phaser.Group) {
            this.sprite = game.add.sprite(x, y, spriteKey)
            group.add(this.sprite)
            this.sprite.smoothed = false;

            game.physics.arcade.enableBody(this.sprite)

            this.sprite.body.checkCollision = true
            this.sprite.body.setSize(this.sprite.width, this.sprite.height * 0.1, 0, this.sprite.height * 0.9)
            this.sprite.scale = Game.pixelartScalingFactorsP.clone();
        }

        getSprite(): Phaser.Sprite {
            return this.sprite;
        }

        update(player: Player): void {
            this.attack(player);
            this.move(player);
        }

        abstract move(player: Player): void
        abstract attack(player: Player): void
        abstract getType(): Enemy.Type
    }

    export namespace Enemy {
        export enum Type {
            CIVILIAN = 0,
            SOLDIER
        }
    }

export class Civilian extends Enemy {
        public static readonly SPRITE_KEY = "civilian";

        private ticker: number = 0

        constructor(game: Phaser.Game, x: number, y: number, group: Phaser.Group) {
           super(game, x, y, Civilian.SPRITE_KEY, group)

           this.health = 10
           this.speed = 100
           this.sprite.body.velocity.x = this.speed
        }

        move(player: Player): void {
           if (this.ticker % 60 === 0) {
              // change direction
              this.sprite.body.velocity.x *= -1;
              this.ticker = 0;
           }

           this.ticker++;
        }

        attack(player: Player): void {
           return;
        }

        getType(): Enemy.Type {
           return Enemy.Type.CIVILIAN
        }
    }

}
