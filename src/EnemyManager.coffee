class EnemyManager

  @SPAWN_RATE: 0.01
  @MAX_SPAWN: 10

  constructor: (@game, @enemyGroup) ->
    @enemyList = []
    @corpseList = []

  update: (player, spawnArea) ->
    rnd = @game.rnd.realInRange 0, 1
    if rnd < EnemyManager.SPAWN_RATE and
      @enemyList.length < EnemyManager.MAX_SPAWN
        newEnemy = @genNewEnemy spawnArea
        @enemyList.push newEnemy

    for enemy, i in @enemyList
      if enemy.dead
        @enemyList.splice i, 1
        @genCorpse enemy
      else
        enemy.update player

  getRandPos: (area) ->
    point = new Phaser.Point()
    area.random(point)
    return point

  genNewEnemy: (spawnArea) ->
    randPos = @getRandPos(spawnArea)
    newEnemy =
      new Fox @game, randPos.x, randPos.y, @enemyGroup
    return newEnemy

