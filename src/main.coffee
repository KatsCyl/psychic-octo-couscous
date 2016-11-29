class Main

  @PIXEL_SCALING_FACTOR: new Phaser.Point 6, 6

  constructor: ->
    @width = 1920
    @height = 1080

    @game = new Phaser.Game @width, @height, Phaser.AUTO, 'gameDiv'

    @game.state.add 'boot', new BootState, false
    @game.state.add 'load', new LoadState, false
    @game.state.add 'menu', new MenuState, false
    @game.state.add 'play', new PlayState, false

  start: ->
    @game.state.start 'boot'


window.onload = () ->
  main = new Main
  main.start()
