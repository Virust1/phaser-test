var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload () {
  game.load.image('background', 'assets/grid.png');
  game.load.image('player', 'assets/player.png');
}

var player;
var cursors;

function create () {
  game.add.tileSprite(0, 0, 6000, 6000, 'background');
  game.world.setBounds(0, 0, 6000, 6000);

  player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
  player.anchor.setTo(0.5, 0.5);

  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.enable(player);

  cursors = game.input.keyboard.createCursorKeys();

  game.camera.follow(player);
}

function update() {
  player.body.setZeroVelocity();

  if (cursors.up.isDown) {
    player.body.moveUp(300)
  }
  else if (cursors.down.isDown) {
    player.body.moveDown(300);
  }

  if (cursors.left.isDown) {
    player.body.velocity.x = -300;
  }
  else if (cursors.right.isDown) {
    player.body.moveRight(300);
  }
}

function render() {
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(player, 32, 500);
}
/*
var canvas = document.getElementById("ctx"),
ctx = canvas.getContext("2d");
ctx.font = "40px Arial";
var socket = io();
socket.on('new_position',function(data){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "black";
	for(var i = 0; i <data.length;i++){
		//ctx.save();
		//ctx.translate(data[i].x+window.innerWidth/2,data[i].y+window.innerHeight/2);
		ctx.fillStyle = "white";
		ctx.fillText(data[i].id,data[i].x,data[i].y);
		ctx.fillText("attack ",data[i].x_aim,data[i].y_aim);
	}
});
document.onkeydown = function(event){
	if(event.keyCode == 87){
		socket.emit('w');
	}
	else if(event.keyCode == 83){
		socket.emit('s');
	}
	if(event.keyCode == 65){
		socket.emit('a')
	}
	else if(event.keyCode == 68){
		socket.emit('d')
	}
}
document.onmousedown = function (event) {
    socket.emit('aim_skill',{
    	x:event.clientX,
    	y:event.clientY,
    	slack:"attack"
    });
}*/
