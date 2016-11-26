module Game {
    export class playState extends Phaser.State {

        // Sprite groups
        private floorGroup: Phaser.Group
        private obstacleGroup: Phaser.Group

        private background: Phaser.Sprite

        private player: Player

        preload () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE)
        }

        create () {
            this.floorGroup = new Phaser.Group(this.game);
            this.obstacleGroup = new Phaser.Group(this.game);

            this.background = this.game.add.sprite(0, 0, 'general', this.floorGroup)
            this.background.width = this.game.camera.width
            this.background.height = this.game.camera.height

            this.player = new Player(this.game, 100, 100, 'playerAnimations', this.obstacleGroup) 

        }

        update () {
            this.player.update();
        }
    }
}
