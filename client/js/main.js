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

var game = new Phaser.Game(config);

function preload ()
{
}

function create ()
{
}

function update ()
{
}
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
} 