module Game {
    export class playState extends Phaser.State {

        // Isometric plugin
        private iso: Phaser.Plugin.Isometric

        // Sprite groups
        private floorGroup: Phaser.Group
        private obstacleGroup: Phaser.Group

        private background: Phaser.Sprite

        preload () {
            this.iso = new Phaser.Plugin.Isometric(this.game)
            this.game.plugins.add(Phaser.Plugin.Isometric)
            this.game.world.setBounds(0, 0, 2048, 1024)
            this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE)
            this.iso.projector.anchor = new Phaser.Point(0, 0)

        }

        create () {
            this.floorGroup = new Phaser.Group(this.game);
            this.obstacleGroup = new Phaser.Group(this.game);

            this.background = this.iso.addIsoSprite(0, 0, 0, 'general', this.floorGroup)
            this.background.width = this.game.camera.width
            this.background.height = this.game.camera.height

        }
    }
}