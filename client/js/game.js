var socket = io();

var loc = {
  x: 400,
  y: 300
}

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}


setInterval(function() {
  move();
}, 1000 / 60);

function move() {
  if(movement.left) {
    loc.x-=10;
  }
  if(movement.right) {
    loc.x+=10;
  }
  if(movement.down) {
    loc.y+=10;
  }
  if(movement.up) {
    loc.y-=10;
  }
}
var canvas = document.getElementById('ctx');
var ctx = canvas.getContext('2d');
socket.on('state', function(players) {
  ctx.fillStyle = 'black';
  ctx.font = "40px Arial";
  ctx.fillRect(0, 0, 1280, 760);
  ctx.strokeStyle = 'white';
  var i;
  for(i = -loc.x%50; i<800; i+=50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.lineWidth = 5;
    ctx.stroke();
  }
  var j;
  for(j = -loc.y%50; j<600; j+=50) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(800, j);
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  ctx.fillStyle = 'white';
  
  for (var i=0; i<players.length; i++) {
    var player = players[i];
    var xdif = 400-player.camx;
    var ydif = 300-player.camy;
    ctx.beginPath();
    ctx.arc(player.x+xdif, player.y+ydif, 10, 0, 2 * Math.PI);
    ctx.fill();
    //ctx.clearRect(player.x - (1280/2), player.y - (760/2), 1280, 760);
    //ctx.fillText(players[i].id,players[i].x,players[i].y);
    console.log(players[i].id+" "+players[i].x+ "  "+players[i].y);
  }
});
document.addEventListener('keydown',function(event){
  if(event.keyCode == 87){
    movement.up=true;
    
  }
  if(event.keyCode == 83){
    movement.down=true;
    
  }
  if(event.keyCode == 65){
    movement.left = true;
    
  }
  if(event.keyCode == 68){
    movement.right=true;
  }
  socket.emit('movement',movement);
});
document.addEventListener('keyup',function(event){
  if(event.keyCode == 87){
    movement.up=false;
    
  }
  if(event.keyCode == 83){
    movement.down=false;
  }
  if(event.keyCode == 65){
    movement.left = false;
    
  }
  if(event.keyCode == 68){
    movement.right=false;
  }
  socket.emit('movement',movement);
});
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
