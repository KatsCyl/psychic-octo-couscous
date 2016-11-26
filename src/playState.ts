module Game {
    export class playState extends Phaser.State {

        // Sprite groups
        private floorGroup: Phaser.Group
        private obstacleGroup: Phaser.Group

        // collision group
        private collisionGroup: Phaser.Group
        
        // change backgroud to scrolling parallax
        private background: Phaser.Sprite
        private floor: Phaser.Sprite

        // Foregroud wall
        private foreGround: Phaser.Physics.Arcade.Body

        private player: Player

        preload () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE)
        }

        create () {
            this.floorGroup = new Phaser.Group(this.game)
            this.obstacleGroup = new Phaser.Group(this.game)
            this.collisionGroup = new Phaser.Group(this.game)

            this.background = this.game.add.sprite(0, 0, 'general', this.floorGroup)
            this.background.width = this.game.camera.width * 300
            this.background.height = this.game.camera.height * 1/3
            this.game.physics.arcade.enableBody(this.background)
            this.background.body.immovable = true

            this.collisionGroup.add(this.background)

            this.player = new Player(this.game, 100, 300, 'playerAnimations', this.obstacleGroup) 

            this.collisionGroup.add(this.player.sprite)

        }

        update () {
            this.player.update()
            this.physics.arcade.collide(this.collisionGroup)
        }

        render () {
            this.game.debug.body(this.player.sprite)
            this.game.debug.spriteBounds(this.player.sprite)
        }
    }
}
