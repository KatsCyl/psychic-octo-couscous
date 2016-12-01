class Fox extends Enemy

  @HEALTH: 20
  @FPS: 5
  @GRAPHIC_KEY: 'fox'

  constructor:
    (@game, x, y, footCollisionGroup) ->
      super @game, x, y, Fox.GRAPHIC_KEY, footCollisionGroup, Fox.HEALTH

      @mainSprite.body.velocity.x = 20

  move: (player) ->
    rnd = @game.rnd.integerInRange 0, 100
    if rnd < 1
      @mainSprite.body.velocity.x *= -1

    @mainSprite.body.velocity.y = 0

  attack: (player) ->

