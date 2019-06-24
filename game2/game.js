let game;

//global game options
let gameOptions = {
  platformStartSpeed: 350,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 2
}

window.onload = function(){

    //this is all JS stuff for loading when the window is loaded
    let gameConfig = {
      type: Phaser.AUTO,
      width: 1334,
      height: 750,
      scene: playGame,
      backgroundColor: 0x444444,

      physics: {
        default: "arcade"
      }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

//playGame scene
class playGame extends Phaser.Scene{
  constructor(){
    super("playGame");
  }
  preload(){
    this.load.image("platform", "platform.png");
    this.load.image("player", "player.png");
  }
  create(){
    this.platformGroup = this.add.group({
      removeCallback: function(platform){
        platform.scene.platformPool.add(platform);
      }
    });

    this.platformPool = this.add.group({
      removeCallback: function(platform){
        platform.scene.platformGroup.add(platform);
      }
    });

    //number of consecutive jumps made by player
    this.playerJumps = 0;

    this.addPlatform(game.config.width, game.config.width /2);

    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height /2, "player");
    this.player.setGravityY(gameOptions.playerGravity);

    this.physics.add.collider(this.player, this.platformGroup);

    this.input.on("pointerdown", this.jump, this);
  }
  update(){
    if(this.player.y > game.config.height){
      this.scene.start("playGame");
    }
    this.player.x = gameOptions.playerStartPosition;

    let minDistance = game.config.width;
    this.platformGroup.getChildren().forEach(function(platform){
      let platformDistance = game.config.width - platform.x - platform.displayWidth /2;
      minDistance = Math.min(minDistance, platformDistance);
      if(platform.x < -platform.displayWidth /2){
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    if(minDistance > this.nextPlatformDistance){
      var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
      this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth/2);
    }
  }

  addPlatform(platformWidth, posX){
    let platform;
    if(this.platformPool.getLength()){
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    }
    else{
      platform = this.physics.add.sprite(posX, game.config.height*0.8, "platform");
      platform.setImmovable(true);
      platform.setVelocityX(gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
  }

  jump(){
    if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
      if(this.player.body.touching.down){
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

};


function resize(){
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if(windowRatio < gameRatio){
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth/gameRatio) + "px";
  }
  else {
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
