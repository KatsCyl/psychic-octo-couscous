module Game {

export class loadState extends Phaser.State {

    private loaded: boolean = false
    private loadingBar: LoadBar

    

    create () {
        this.game.load.onLoadComplete.add(() => { this.loaded = true })
        this.loadingBar = new LoadBar(this.game)
        this.loadAssets()
    }

    update () {
        if (this.loadingBar != undefined && ! this.loaded) {
            console.log(this.game.load.progress)
            this.loadingBar.update(this.game.load.progress)
        }
        if (this.loaded) { this.game.state.start('menu') }
	}

    private loadAssets() {

        this.game.load.image('invisible', 'assets/invisible.png')

        this.game.load.image('bg1', 'assets/backgrounds/parallax-forest-back-trees.png')
        this.game.load.image('bg2', 'assets/backgrounds/parallax-forest-middle-trees.png')
        this.game.load.image('bg3', 'assets/backgrounds/parallax-forest-front-trees.png')

        this.game.load.image('general', 'assets/general.png')
        this.game.load.image('obstacle1', 'assets/obstacle1.png')
        this.game.load.atlasJSONArray('playerAnimations', 'assets/player/playerAnimation.png', 'assets/player/playerAnimation.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY)

        this.game.load.start()

    }


}

class LoadBar {

    private game: Phaser.Game

    private screenMiddle: Phaser.Point
    private barBg: Phaser.Graphics
    private bar: Phaser.Graphics
    private maxWidth: number
    private percentage: number = 0

    constructor(game: Phaser.Game) {
        this.game = game

        this.barBg = this.game.add.graphics(0, 0)
        this.bar = this.game.add.graphics(0,0)

        this.screenMiddle = new Phaser.Point( this.game.camera.x + this.game.camera.width * 0.5
                                            , this.game.camera.y + this.game.camera.height * 0.5)
        this.maxWidth = this.game.camera.width - 10

        this.barBg.lineStyle(2,0xFFFFFF, 1)
        this.barBg.drawRect(this.screenMiddle.x - this.maxWidth/2, this.screenMiddle.y, this.maxWidth, 15)

        this.bar.beginFill(0xff3300)
        this.bar.drawRect(this.screenMiddle.x - this.maxWidth/2, this.screenMiddle.y, (this.percentage / 100) * this.maxWidth, 13)
        this.bar.endFill()
    }

    update (percentage) {
        this.bar.clear()
        this.bar.beginFill(0xff3300)
        this.bar.drawRect(this.screenMiddle.x - this.maxWidth/2, this.screenMiddle.y, (percentage/100) * this.maxWidth, 13)
        this.bar.endFill()
	}

}

}
