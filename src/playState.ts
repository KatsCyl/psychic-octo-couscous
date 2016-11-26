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

        private obstacles: Obstacle[] = []

        private player: Player

        public cameraDx: number = 0

        preload () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE)
            this.game.world.setBounds(0, 0, this.game.camera.width * 5, this.game.camera.height)
        }

        create () {
            this.floorGroup = new Phaser.Group(this.game)
            this.backgroundGroup = new Phaser.Group(this.game)
            this.obstacleGroup = new Phaser.Group(this.game)
            this.collisionGroup = new Phaser.Group(this.game)

            this.background = new ParallaxBackground(this.game, 'bg1', 'bg2', 'bg3', this.backgroundGroup)
            this.backgroundWall = this.game.add.sprite(0, 0, 'invisible')
            this.backgroundWall.visible=false
            this.backgroundWall.width = this.game.camera.width
            this.backgroundWall.height = this.background.height

            this.game.physics.arcade.enableBody(this.backgroundWall)
            this.backgroundWall.body.immovable = true

            this.collisionGroup.add(this.backgroundWall)

            this.player = new Player(this.game, 100, 300, 'playerAnimations', this.obstacleGroup) 

            // temporary obstacle
            let tempObstacle = new Obstacle(this.game, 400, 100, 'obstacle1', this.obstacleGroup);
            let tempObstacle2 = new Obstacle(this.game, 120, 200, 'obstacle1', this.obstacleGroup);
            this.obstacles.push(tempObstacle);
            this.obstacles.push(tempObstacle2);

            // Camera stuff
            this.game.camera.follow(this.player.sprite)
            this.game.camera.deadzone = new Phaser.Rectangle(this.game.camera.width * 0.2, 0, this.game.camera.width * 0.6, this.game.camera.height)
        }

        update () {
            this.cameraDx = this.game.camera.x;
            this.backgroundWall.x = this.game.camera.x
            this.player.update(this.game, this.obstacles);
            this.physics.arcade.collide(this.collisionGroup, this.player.sprite)
            this.background.update(this.cameraDx)
            this.obstacleGroup.sort('bottom', Phaser.Group.SORT_ASCENDING);
        }

        render () {
           /*
            for (let obstacle of this.obstacles) {
               this.game.debug.body(obstacle.getSprite());
               this.game.debug.spriteBounds(obstacle.getSprite());
            }
           
            this.game.debug.body(this.backgroundWall);
            */
        }
    }
}
