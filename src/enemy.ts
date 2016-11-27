module Game {
    export namespace Enemy {
        export enum Type {
            CIVILIAN = 0,
            SOLDIER
        }

        export const enum Direction {
            UP = 0,
            DOWN,
            LEFT,
            RIGHT
        }
    }

    export abstract class Enemy {
        protected sprite: Phaser.Sprite
        protected health: number
        protected speed: number

        protected orientation: boolean

        constructor(protected game: Phaser.Game, x: number, y: number, spriteKey: string, group: Phaser.Group, orientation: boolean) {
            this.orientation = orientation
            this.sprite = game.add.sprite(x, y, spriteKey)
            group.add(this.sprite)
            this.sprite.smoothed = false;

            game.physics.arcade.enableBody(this.sprite)

            this.sprite.body.checkCollision = true
            this.sprite.body.collideWorldBounds = true;
            this.sprite.body.setSize(this.sprite.width, this.sprite.height * 0.1, 0, this.sprite.height * 0.9)

            this.sprite.anchor = new Phaser.Point(0.5, 0.5)
            this.sprite.scale = Game.pixelartScalingFactorsP.clone().multiply(-1, 1);
            (this.sprite as any).customParent = this

        }

        protected getRandomDirection(): Enemy.Direction {
           let directions = [Enemy.Direction.UP, Enemy.Direction.DOWN, 
                             Enemy.Direction.LEFT, Enemy.Direction.RIGHT];
           return directions[Math.floor(Math.random() * directions.length)];
        }

        protected directionToVelocityVector(direction: Enemy.Direction): [number, number] {
            switch (direction) {
                 case Enemy.Direction.UP:
                     return [0, -1];    
                 case Enemy.Direction.DOWN:
                     return [0, 1];
                 case Enemy.Direction.LEFT:
                     return [-1, 0];
                 case Enemy.Direction.RIGHT:
                     return [1, 0];
                 default:
                     return [0, 0];
            }
        }

        flip () {
            let a = 1
            if (this.orientation) { 
                a = -1
            } 
            if(this.sprite.body.velocity.x > 0) {
                this.sprite.scale = Game.pixelartScalingFactorsP.clone().multiply(a * -1, 1)
            } else {
                this.sprite.scale = Game.pixelartScalingFactorsP.clone().multiply(a, 1)
            }
        }


        getSprite(): Phaser.Sprite {
            return this.sprite;
        }

        update(player: Player): void {
            this.attack(player);
            this.move(player);
            this.flip();
        }

        getCorpse(group: Phaser.Group): Corpse {
           return new Corpse(this.game, this.sprite.x, this.sprite.y,
                             this.getCorpseSpriteKey(), group);
        }

        abstract move(player: Player): void
        abstract attack(player: Player): void
        abstract getType(): Enemy.Type
        abstract getCorpseSpriteKey(): string
    }

   export class Civilian extends Enemy {
        public static readonly SPRITE_KEY = "fox";
        public static readonly CORPSE_SPRITE_KEY = "fox_corpse"

        private ticker: number = 0
        private direction = Enemy.Direction.LEFT

        constructor(game: Phaser.Game, x: number, y: number, group: Phaser.Group) {
           super(game, x, y, Civilian.SPRITE_KEY, group, false)

           this.sprite.animations.add('walk', [0,1], 5, true)
           this.sprite.animations.play('walk')

           this.health = 10
           this.speed = 100
           this.sprite.body.velocity.x = this.speed
        }

        move(player: Player): void {
           if (this.ticker % 170 === 0) {
              // change direction
              this.direction = this.getRandomDirection();

              let [vx, vy] = this.directionToVelocityVector(this.direction);
              this.sprite.body.velocity.x = vx * this.speed;
              this.sprite.body.velocity.y = vy * this.speed;
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

        getCorpseSpriteKey(): string {
           return Civilian.CORPSE_SPRITE_KEY;
        }
    }

    export class Soldier extends Enemy {
        public static readonly SPRITE_KEY = "soldier";
        public static readonly CORPSE_SPRITE_KEY = "soldier_corpse";

        private ticker: number = 0

        constructor(private game: Phaser.Game, x: number, y: number, group: Phaser.Group) {
           super(game, x, y, Soldier.SPRITE_KEY, group, true)

           this.sprite.animations.add('walk', undefined , 5, true)
           this.sprite.animations.play('walk')


           this.health = 50
           this.speed = 30
           this.sprite.body.velocity.x = this.speed
        }

        move(player: Player): void {
           if (this.ticker % 100 === 0) {
              // change direction
              let movementDirection = this.game.physics.arcade.angleBetween(this.sprite, player.getSprite()) * (180 / Math.PI);

              this.game.physics.arcade.velocityFromAngle(movementDirection, this.speed, this.sprite.body.velocity);
              this.ticker = 0;
           }

           this.ticker++;
        }

        attack(player: Player): void {
           //console.log("ATTAAACCCKKK!");
           return;
        }

        getType(): Enemy.Type {
           return Enemy.Type.SOLDIER;
        }

        getCorpseSpriteKey(): string {
           return Soldier.CORPSE_SPRITE_KEY;
        }
    }
}
