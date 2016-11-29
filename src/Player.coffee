class Player


  constructor:
    (@game, x, y, graphicKey, footCollisionGroup, hitBoxCollisionGroup) ->

      @FPS = 5

      @mainSprite = @game.add.sprite x, y, graphicKey, 0, footCollisionGroup
      @mainSprite.anchor.set 0.5

      @game.physics.arcade.enableBody @mainSprite
      @mainSprite.smoothed = false

      @mainSprite.animations.add 'idle', [0, 1, 2, 3], @FPS, true
      @mainSprite.animations.add 'move', [4, 5, 6, 7, 8], @FPS, true
      @mainSprite.animations.play 'idle', @FPS, true

      @mainSprite.body.collideWorldBounds = true
      @mainSprite.body.setSize @mainSprite.width * 0.25
                             , @mainSprite.height * 0.1
                             , @mainSprite.width * (0.5 - 0.25/2)
                             , @mainSprite.height * 0.9


      @hitBoxSprite = @game.add.sprite 0, 0, graphicKey, 0, hitBoxCollisionGroup
      @hitBoxSprite.anchor.set 0.5
      @hitBoxSprite.visible = false

      @mainSprite.addChild @hitBoxSprite
      @mainSprite.scale = Main.PIXEL_SCALING_FACTOR


      @cursors = @game.input.keyboard.createCursorKeys()

      @game.input.keyboard.addKeyCapture [ Phaser.Keyboard.LEFT
        , Phaser.Keyboard.RIGHT
        , Phaser.Keyboard.UP
        , Phaser.Keyboard.DOWN
        ]

  update: ->
    @handleControls()

  handleControls: ->
    speed = 100
    if not @cursors.left.isDown && not @cursors.right.isDown &&
      not @cursors.up.isDown && not @cursors.down.isDown
        @mainSprite.animations.play('idle')
        @mainSprite.body.velocity = new Phaser.Point(0,0)
    else
      if @cursors.up.isDown
        @mainSprite.body.velocity.y = -speed
      else if @cursors.down.isDown
        @mainSprite.body.velocity.y = speed

      if @cursors.left.isDown
        @mainSprite.body.velocity.x = -speed
      else if @cursors.right.isDown
        @mainSprite.body.velocity.x = speed

      @mainSprite.animations.play 'move'
