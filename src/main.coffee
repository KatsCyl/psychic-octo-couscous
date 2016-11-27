class Main
  @width = window.innerWidth
  @height = window.innerHeight

  game = new Phaser.Game @width, @height, Phaser.AUTO, 'gameDiv'

  window.onload = () ->
    game.state.add 'load', new LoadState, false
    #game.state.add('menu', new MenuState, false)
    #game.state.add('play', new PlayState, false)

    game.state.start 'load', true
