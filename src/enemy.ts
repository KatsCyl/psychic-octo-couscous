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
}
