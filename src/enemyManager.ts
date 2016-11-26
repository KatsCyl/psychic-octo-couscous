module Game{
    export class EnemyManager{
        private readonly spawnRate: number = 0.01
        private readonly max_spawn: number = 10

        private game: Phaser.Game
        private player: Player

        private enemyList: Enemy[] = []
        public enemyGroup: Phaser.Group

        constructor(game: Phaser.Game, player: Player, group: Phaser.Group) {
            this.game = game
            this.player = player
            this.enemyGroup = group
        }

        update () {
            if (this.enemyList.length < this.max_spawn) {
                this.trySpawn();
            }

            for (let enemy of this.enemyList) {
                enemy.update(this.player)
            }

        }

        kill (enemy: Enemy) {
            delete this.enemyList[this.enemyList.indexOf(enemy)]
        }

        private trySpawn(){
            let rand = this.game.rnd.realInRange(0, 1)
            if(rand < this.spawnRate) {
                let randEnemyType = this.game.rnd.integerInRange(0, 0)
                let enemy: Enemy
                let randPos = this.getRandPos()
                if (randEnemyType == 0) {
                    this.enemyList.push(new Civilian(this.game, randPos.x, randPos.y, this.enemyGroup ))
                } 
            }
        }

        private getRandPos (): Phaser.Point {
            let randx = this.game.rnd.integerInRange(this.game.camera.x, this.game.camera.x + this.game.camera.width)
            let randy = this.game.rnd.integerInRange(this.game.camera.y, this.game.camera.y + this.game.camera.height)
            return new Phaser.Point(randx, randy)
        }



    }
}