module Game {
    export class Player {

        private isoPhysics: Phaser.Plugin.Isometric.Arcade
        private cursors: Phaser.CursorKeys
        private isoBody: Phaser.Plugin.Isometric.Body
        private sprite: Phaser.Sprite



        constructor(game: Phaser.Game, sprite: Phaser.Sprite, isoPhysics: Phaser.Plugin.Isometric.Arcade) {

            this.isoPhysics = isoPhysics
            this.sprite = sprite
            this.sprite.animations.add('idle', [1, 2, 3], 10, true)
            this.sprite.animations.play('idle')
            this.isoPhysics.enable(this)
            this.cursors = this.sprite.game.input.keyboard.createCursorKeys();
        }

        update() {
            this.handleControls()
        }

        private handleControls() {
            if (this.cursors.left.isDown) {
                this.sprite.body.velocity.x = 10
                console.log(this.isoBody.position.x)
            }
        }
    }
}
