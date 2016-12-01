class Enemy extends MovingGameEntity

  constructor:
    (@game, x, y, graphicsKey, footCollisionGroup, @health) ->
      super @game, x, y, graphicsKey, footCollisionGroup
      @dead = false

  update: (player, footCollisionGroup, hitBoxCollisionGroup) ->
    super footCollisionGroup, hitBoxCollisionGroup
    if (@health <= 0)
      @kill()
    else
      ((p) => @move p) player
      ((p) => @attack p) player

  move: (player) ->
    console.log 'enemy move undefined'

  attack: (player) ->
    console.log 'enemy attack undefined'

  hitBoxCallback: (sprite1, sprite2) ->
    #if sprite2.damage?
    @health -= sprite2.damage
    console.log 'Enemy hit'

  kill: ->
    @dead = true
    @mainSprite.kill()
    @hitBoxSprite.kill()
