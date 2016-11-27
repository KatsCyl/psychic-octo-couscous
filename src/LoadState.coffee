class LoadState extends Phaser.State

  @loaded
  @loadBar

  constructor: -> super

  preload: ->
    @loaded = false
    @loadBar = new LoadBar @game
    @game.load.onLoadComplete.add => @loaded = true

  create: ->
    @loadAssets()

  update: ->
    if @loadBar? and not @loaded
      @loadBar.update @game.load.progress

    if @loaded
      @loadBar.update 100 #@game.state.start('menu')


  loadAssets: ->
    @game.load.image 'invisible'
                   , 'assets/invisible.png'

    @game.load.image 'floor', 'assets/backgrounds/bg-grass-tile.png'
    @game.load.image 'bg1', 'assets/backgrounds/backgroung1.png'
    @game.load.image 'bg2', 'assets/backgrounds/backgroung2.png'
    @game.load.image 'bg3', 'assets/backgrounds/backgroung3_3.png'
    @game.load.image 'bullet', 'assets/bullet.png'

    @game.load.image 'general'
                   , 'assets/general.png'
    @game.load.image 'obstacle1'
                   , 'assets/obstacle1.png'

    @game.load.image 'fox-dead'
                   , 'assets/fox-dead.png'
    @game.load.image 'soldier-dead'
                   , 'assets/soldier-dead.png'

    @game.load.atlasJSONArray 'playerAnimations'
                            , 'assets/player/playerAnimation.png'
                            , 'assets/player/playerAnimation.json'
                            , Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY

    @game.load.atlasJSONArray 'soldier'
                             , 'assets/soldier.png'
                             ,'assets/soldier.json'
                             , Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
    @game.load.atlasJSONArray 'fox'
                            , 'assets/fox.png'
                            , 'assets/fox.json'
                            , Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY

    @game.load.start()






class LoadBar

  @game

  @screenMiddle
  @barBg
  @bar
  @maxWidth
  @percentage

  constructor: (game) ->
    @game = game

    @barBg = @game.add.graphics 0, 0
    @bar = @game.add.graphics 0, 0

    @screenMiddle = new Phaser.Point @game.camera.x + @game.camera.width * 0.5
                                   , @game.camera.y + @game.camera.height * 0.5
    @maxWidth = @game.camera.width - 10

    @barBg.lineStyle 2, 0xFFFFFF, 1
    @barBg.drawRect @screenMiddle.x - @maxWidth / 2
                  , @screenMiddle.y
                  , @maxWidth
                  , 15

    @bar.beginFill 0xff3300
    @bar.drawRect @screenMiddle.x - @maxWidth / 2
                , @screenMiddle.y
                , ( @percentage / 100 ) * @maxWidth
                , 13
    @bar.endFill()

  update: (percentage) ->
    @bar.clear()
    @bar.beginFill 0xff3300
    @bar.drawRect @screenMiddle.x - @maxWidth / 2
                , @screenMiddle.y
                , ( percentage / 100 ) * @maxWidth
                , 13
    @bar.endFill()

