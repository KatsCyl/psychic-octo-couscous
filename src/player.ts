module Game {
    export class Player extends Phaser.Plugin.Isometric.IsoSprite {

        private isoPhysics: Phaser.Plugin.Isometric.Arcade
        private cursors: Phaser.CursorKeys
        private isoBody: Phaser.Plugin.Isometric.Body



        constructor(game: Phaser.Game, isoPhysics: Phaser.Plugin.Isometric.Arcade, x: number, y: number, z: number, animationsKey: any) {
            super(game, x, y, z, animationsKey)

            this.isoPhysics = isoPhysics
            this.animations.add('idle', [1, 2, 3])
            this.animations.play('idle')
            this.isoBody = new Phaser.Plugin.Isometric.Body(this)
            this.isoPhysics.enable(this)
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }

        update() {
            this.handleControls()
        }

        private handleControls() {
            if (this.cursors.left.isDown) {
                this.isoBody.velocity.x = 10
                console.log(this.isoBody.position.x)
            }
        }
    }
}