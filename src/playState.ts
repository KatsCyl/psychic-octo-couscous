module Game {
    export class playState extends Phaser.State {

        // Sprite groups
        private backgroundGroup: Phaser.Group
        private floorGroup: Phaser.Group
        private obstacleGroup: Phaser.Group

        // collision group
        private collisionGroup: Phaser.Group
        
        private background: ParallaxBackground
        private floor: Phaser.Sprite

        // Foregroud wall
        private backgroundWall: Phaser.Sprite
        private foregroundWall: Phaser.Physics.Arcade.Body

        private player: Player

        preload () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE)
        }

        create () {
            this.floorGroup = new Phaser.Group(this.game)
            this.obstacleGroup = new Phaser.Group(this.game)
            this.collisionGroup = new Phaser.Group(this.game)

            this.background = new ParallaxBackground(this.game, 'bg1', 'bg2', 'bg3', this.backgroundGroup)
            this.backgroundWall = this.game.add.sprite(0, 0, 'invisible', this.collisionGroup)
            this.backgroundWall.width = this.game.camera.width
            this.backgroundWall.height = this.background.height

            this.game.physics.arcade.enableBody(this.background)

            this.collisionGroup.add(this.background)

            this.player = new Player(this.game, 100, 300, 'playerAnimations', this.obstacleGroup) 

            this.collisionGroup.add(this.player.sprite)

        }

        update () {
            this.backgroundWall.x = this.game.camera.x
            this.player.update()
            this.physics.arcade.collide(this.collisionGroup)
        }

        render () {
            this.game.debug.body(this.player.sprite)
            this.game.debug.spriteBounds(this.player.sprite)
        }
    }
}
