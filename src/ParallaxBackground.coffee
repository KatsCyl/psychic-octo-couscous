class ParallaxBackground

  constructor: (game, bgKey1, bgKey2, bgKey3, group) ->
    actualWidth = game.camera.width
    actualHeight = game.camera.height / 3

    @bg1 = game.add.tileSprite 0, 0, actualWidth, actualHeight, bgKey1

    @bg2 = game.add.tileSprite 0, 0, actualWidth, actualHeight, bgKey2

    @bg3 = game.add.tileSprite 0, 0, actualWidth, actualHeight, bgKey3

    group.add @bg1
    group.add @bg2
    group.add @bg3

    group.setAll 'smoothed', false
    group.setAll 'tileScale.y', (actualHeight / (1080/3))

  update: (camPos) ->
    @bg1.position.x = camPos
    @bg1.tilePosition.x = - camPos * 0.05

    @bg2.position.x = camPos
    @bg2.tilePosition.x = - camPos * 0.3

    @bg3.position.x = camPos
    @bg3.tilePosition.x = - camPos * 0.75
