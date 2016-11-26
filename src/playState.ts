module Game {
    export class playState extends Phaser.State {

        public iso: Phaser.Plugin.Isometric

        private floorGroup: Phaser.Group
        private obstacleGroup: Phaser.Group

        private sprite: Phaser.Sprite

        preload () {
            this.game.plugins.add(Phaser.Plugin.Isometric)
            this.iso = new Phaser.Plugin.Isometric(this.game)
            this.game.world.setBounds(0, 0, 2048, 1024)
            this.game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE)
            this.iso.projector.anchor = new Phaser.Point(0.5, 0.5)

            console.log("ASD")

            // Sprite loading, to be in loadState
            this.game.load.image('general', 'assets/general.png');

        }

        create () {
            this.floorGroup = new Phaser.Group(this.game);
            this.obstacleGroup = new Phaser.Group(this.game);

            this.sprite = this.iso.addIsoSprite(500, 500, 0, 'general', 0, this.floorGroup);
        }
    }
}