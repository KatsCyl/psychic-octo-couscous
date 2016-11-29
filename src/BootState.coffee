class BootState extends Phaser.State

  constructor: -> super

  preload: ->
    @game.time.advancedTiming = true

  create: ->
    @game.state.start 'load'