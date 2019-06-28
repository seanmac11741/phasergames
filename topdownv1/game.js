window.onload = function() {

    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 448,
        height: 320,
        pixelArt: true,
        scene: {
          preload: preload,
          create: create,
          update: update
        },
        backgroundColor: 0x87CEEB,

        // physics settings
        physics: {
            default: "arcade"
        }
    }

    game = new Phaser.Game(gameConfig);
    let controls;
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

function preload(){
  this.load.image("tiles", "assets/Bush.png");
}

function create(){
  const level = [
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  2,  3,  1,  1,  1,  1,  2,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  5,  6,  6,  1,  1,  1,  5,  6,  6,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  5,  6,  3,  1,  1,  1,  1,  1,  5,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1 ],
    [  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  1,  1,  1,  1,  1,  1,  1,  1,  1 ]
  ];

  const map = this.make.tilemap({data: level, tileWidth:32, tileHeight:32});
  const tiles = map.addTilesetImage("tiles");
  const layer = map.createStaticLayer(0, tiles, 0,0);

  //camera
  const camera = this.cameras.main;

  const cursors = this.input.keyboard.createCursorKeys();
  controls = new Phaser.Cameras.Controls.FixedKeyControl({
    camera: camera,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    speed: 0.5
  });

  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.add
    .text(16, 16, "Arrow keys to scroll", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  //end of create
}

function update(time, delta){

  controls.update(delta);

  //end of update
}

function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
