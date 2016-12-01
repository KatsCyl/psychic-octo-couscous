class PlayState extends Phaser.State

  constructor: ->
    super

  preload: ->
    @game.physics.startSystem Phaser.Physics.ARCADE
    @game.world.setBounds 0, 0, (@game.camera.width * 5), @game.camera.height

    @backgroundGroup = new Phaser.Group @game
    @floorGroup = new Phaser.Group @game
    @collidablesGroup = new Phaser.Group @game
    @bulletCollidablesGroup = new Phaser.Group @game

    @game.camera.height = @game.height
    @game.camera.width = @game.width





  create: ->
    @parallaxBackground =
      new ParallaxBackground @game, 'bg1', 'bg2', 'bg3', @backgroundGroup

    @backgroundWall =
      @game.add.sprite 0, 0, 'invisible', 0, @collidablesGroup
    @backgroundWall.visible = false
    @backgroundWall.height = @parallaxBackground.bg1.height
    @backgroundWall.width = @game.world.width
    console.log @backgroundWall.height
    @game.physics.arcade.enable @backgroundWall
    @backgroundWall.body?.immovable = true

    @player = new Player @game
                       , @game.camera.width / 2
                       , @game.camera.height / 2
                       , 'playerAnimations'
                       , @collidablesGroup
                       , @bulletCollidablesGroup

    # Camera stuff
    @game.camera.follow @player.mainSprite
    @game.camera.deadzone =
      new Phaser.Rectangle @game.camera.width * 0.2
                         , 0
                         , @game.camera.width * 0.6
                         , @game.camera.height

    # Testing hitbox

    @hitboxTestSprite =
      @game.add.sprite 0, 0, 'invisible', 0, @bulletCollidablesGroup
    @hitboxTestSprite.visible = false
    @hitboxTestSprite.height = @parallaxBackground.bg1.height
    @hitboxTestSprite.width = @game.world.width
    @game.physics.arcade.enable @hitboxTestSprite
    @hitboxTestSprite.body?.immovable = true


  update: ()->
    @player.update(@collidablesGroup, @bulletCollidablesGroup)
    @parallaxBackground.update(@game.camera.position.x)