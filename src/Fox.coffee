class Fox extends Enemy

  @HEALTH: 20

  constructor:
    (@game, x, y, graphicKey, footCollisionGroup) ->
      super @game, x, y, graphicKey, footCollisionGroup, Fox.HEALTH

      @mainSprite.velocity.x = 10

  @move: (player) ->
    if @game.rnd.integerInRange 0, 100 < 20
      @mainSprite.velocity.x *= -1

  @attack: (player) ->

