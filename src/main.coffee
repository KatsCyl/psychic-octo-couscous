class Main

  constructor: ->
    @width = window.innerWidth
    @height = window.innerHeight

    @game = new Phaser.Game @width, @height, Phaser.AUTO, 'gameDiv'
    @game.state.add 'load', new LoadState, false
    @game.state.add('menu', new MenuState, false)
    #@game.state.add('play', new PlayState, false)

  start: ->
    @game.state.start 'load', true


window.onload = () ->
  main = new Main
  main.start()
