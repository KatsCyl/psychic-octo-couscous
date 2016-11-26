module Game {
    export class playState extends Phaser.State {

<<<<<<< 51d7962a3b08f10e8984589e1f54ea942bb3ba69
        // Isometric plugin
        private iso: Phaser.Plugin.Isometric
        private isoPhysics: Phaser.Plugin.Isometric.Arcade

        // Sprite groups
        private floorGroup: Phaser.Group
        private obstacleGroup: Phaser.Group

        private background: Phaser.Sprite

        private player: Player

        preload () {
            this.iso = new Phaser.Plugin.Isometric(this.game)
            this.isoPhysics = new Phaser.Plugin.Isometric.Arcade(this.game)
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

            this.player = new Player(this.game, this.isoPhysics, 50, 50, 50, 'playerAnimations')

        }

        update () {
            this.player.update();
        }
=======
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
>>>>>>> Asd
    }
}