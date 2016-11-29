class BootState extends Phaser.State

  constructor: -> super

  preload: ->
    @game.time.advancedTiming = true
    @game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

  create: ->
    @game.state.start 'load'