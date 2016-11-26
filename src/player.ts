module Game {
    export class Player extends Phaser.Sprite {

        private isoPhysics: Phaser.Plugin.Isometric.Arcade
        private cursors: Phaser.CursorKeys



        constructor(game: Phaser.Game, isoPhysics: Phaser.Plugin.Isometric.Arcade, x: number, y: number, animationsKey: any) {
            super(game, x, y, animationsKey)

            this.isoPhysics = isoPhysics
            this.animations.add('idle', [1, 2, 3])
            this.animations.play('idle')
            this.isoPhysics.enable(this)
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        update() {
            this.handleControls()
        }

        private handleControls() {
            if (this.cursors.left) {
                this.body.velocity = 10
            }
        }
    }
}