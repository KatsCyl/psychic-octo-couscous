module Game {
    export class Civilian extends Enemy {
        public static readonly SPRITE_KEY = "civilian";

        private ticker: number = 0

        constructor(game: Phaser.Game, x: number, y: number, group: Phaser.Group) {
           super(game, x, y, Civilian.SPRITE_KEY, group)

           this.health = 10
           this.speed = 1
           this.sprite.body.velocity.x = 1
        }

        move(player: Player): void {
           if (ticker % 60 === 0) {
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
