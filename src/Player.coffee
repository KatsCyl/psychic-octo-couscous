class Player extends MovingGameEntity

  constructor:
    (game, x, y, graphicKey, footCollisionGroup) ->
      super game, x, y, graphicKey, footCollisionGroup

      @FPS = 5

      @mainSprite.animations.add 'idle', [0, 1, 2, 3], @FPS, true
      @mainSprite.animations.add 'move', [4, 5, 6, 7, 8], @FPS, true
      @mainSprite.animations.play 'idle', @FPS, true

      @cursors = @game.input.keyboard.createCursorKeys()

      @game.input.keyboard.addKeyCapture [ Phaser.Keyboard.LEFT
        , Phaser.Keyboard.RIGHT
        , Phaser.Keyboard.UP
        , Phaser.Keyboard.DOWN
        ]

  update: (footCollisionGroup, hitBoxCollisionGroup) ->
    super footCollisionGroup, hitBoxCollisionGroup
    @handleControls()

  hitBoxCallback: (sprite1, sprite2) ->
    console.log 'player hit'

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
      else
        @mainSprite.body.velocity.y = 0

      if @cursors.left.isDown
        @mainSprite.body.velocity.x = -speed
      else if @cursors.right.isDown
        @mainSprite.body.velocity.x = speed
      else
        @mainSprite.body.velocity.x = 0

      @mainSprite.animations.play 'move'