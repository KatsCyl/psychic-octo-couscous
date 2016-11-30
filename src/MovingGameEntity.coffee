class MovingGameEntity


  constructor:
    (@game
    , x
    , y
    , graphicKey
    , footCollisionGroup) ->

      @mainSprite = @game.add.sprite x, y, graphicKey, 0, footCollisionGroup
      @mainSprite.anchor.set 0.5

      @game.physics.arcade.enableBody @mainSprite
      @mainSprite.smoothed = false

      @mainSprite.body.collideWorldBounds = true
      @mainSprite.body.setSize @mainSprite.width * 0.25
                             , @mainSprite.height * 0.1
                             , @mainSprite.width * (0.5 - 0.25/2)
                             , @mainSprite.height * 0.9


      @hitBoxSprite =
        @mainSprite.addChild(@game.make.sprite 0, 0
          , graphicKey, 0) # TODO have graphics that have invisible sprite also
      @game.physics.arcade.enableBody @hitBoxSprite
      @hitBoxSprite.body.moves = false

      @mainSprite.scale = Main.PIXEL_SCALING_FACTOR

      @hitBoxSprite.anchor.set 0.5
      @hitBoxSprite.body.setSize @mainSprite.width, @mainSprite.height
                         , (- @mainSprite.width / 2 + @hitBoxSprite.width / 2)
                         , (- @mainSprite.height/ 2 + @hitBoxSprite.height / 2)

      console.log @mainSprite.body.center
      console.log @mainSprite.width, @hitBoxSprite.width
      console.log @hitBoxSprite.body.center


  update: (footCollisionGroup, hitBoxCollisionGroup) ->

    @game.physics.arcade.collide @mainSprite
                               , footCollisionGroup

    @game.physics.arcade.overlap @hitBoxSprite
                               , hitBoxCollisionGroup
                               , (sprite1, sprite2) =>
                                 @hitBoxCallback sprite1, sprite2



  hitBoxCallback: (sprite1, sprite2) ->
    alert 'undefined'


