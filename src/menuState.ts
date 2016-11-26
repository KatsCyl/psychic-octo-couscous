module Game {
   export class menuState extends Phaser.State {
      public static readonly PLAY_BUTTON_RESOURCE = "play_button";
      public static readonly CREDITS_BUTTON_RESOURCE = "credits_button";
      public static readonly MENU_BG_RESOURCE = "menu_background";

      public preload() {
         this.game.load.spritesheet(menuState.PLAY_BUTTON_RESOURCE, 
                                    "assets/buttons/play_sprite_sheet.png", 50, 50);
         this.game.load.spritesheet(menuState.CREDITS_BUTTON_RESOURCE, 
                                    "assets/buttons/play_sprite_sheet.png", 50, 50);
         this.game.load.image(menuState.MENU_BG_RESOURCE,
                              "assets/backgrounds/menubg.jpg");
      }

      public create() {
         this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 
                                  menuState.MENU_BG_RESOURCE);

         this.addButton(this.game.width / 2 - 25, 
                        this.game.height / 2 - 30, 
                        menuState.PLAY_BUTTON_RESOURCE,
                        this.playPressed);

         this.addButton(this.game.width / 2 - 25,
                        this.game.height / 2 + 30,
                        menuState.CREDITS_BUTTON_RESOURCE,
                        this.creditsPressed);

      }

      private addButton(x: number, y: number, resourceString: string, callback: any) {
         this.game.add.button(x, y, resourceString, callback,
                              this, MenuButton.States.Over, 
                              MenuButton.States.Out,
                              MenuButton.States.Down);
      }

      private playPressed() {
         this.game.state.start('play');
      }

      private creditsPressed() {
         this.game.state.start('credits');
      }
   }

   export namespace MenuButton {
      export enum States {
         Over = 0,
         Out,
         Down,
         Up
      }
   }
}
