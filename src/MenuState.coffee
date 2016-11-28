class MenuState extends Phaser.State
  @PLAY_BUTTON_RESOURCE: "play_button"
  @CREDITS_BUTTON_RESOURCE: "credits_button"
  @MENU_BG_RESOURCE: "menu_background"

  constructor: -> super

  create: ->
    @game.add.tileSprite 0, 0, @game.width, @game.height
                       , MenuState.MENU_BG_RESOURCE

    @addButton @game.width / 2 - 25
             , @game.height / 2 - 30
             , MenuState.PLAY_BUTTON_RESOURCE
             , @playPressed

    @addButton @game.width / 2 - 25
             , @game.height / 2 + 30
             , MenuState.CREDITS_BUTTON_RESOURCE
             , @creditsPressed

  addButton: (x, y, resourceString, callback) ->
    @game.add.button x
                   , y
                   , resourceString
                   , callback
                   , MenuButton.States.Over
                   , MenuButton.States.Out
                   , MenuButton.States.Down

  playPressed: ->
    @game.state.start 'play'

  creditsPressed: ->
    @game.state.start 'credits'

class MenuButton
  @States:
    Over: 0
    Out: 1
    Down: 2
    Up: 3
