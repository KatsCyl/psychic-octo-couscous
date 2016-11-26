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
            for (let i = 0; i < this.enemyList.length; i++) {
                if (this.enemyList[i].getSprite().alive == false) {
                    this.enemyList.splice(i, 1);
                } else {
                    this.enemyList[i].update(this.player)
                }
            }

        }

        public kill (enemy: Enemy) {
           enemy.getSprite().kill()
        }

        private trySpawn(){
            let rand = this.game.rnd.realInRange(0, 1)
            if(rand < this.spawnRate) {
                let randEnemyType = this.game.rnd.integerInRange(0, 1)
                let enemy: Enemy
                let randPos = this.getRandPos()
                switch (randEnemyType) {
                   case 0:
                     this.enemyList.push(new Civilian(this.game, randPos.x, randPos.y, this.enemyGroup))
                     break;
                   case 1:
                     this.enemyList.push(new Soldier(this.game, randPos.x, randPos.y, this.enemyGroup))
                     break;
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
