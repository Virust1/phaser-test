var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 3000;


app.get('/',function(req,res){
	res.sendFile(__dirname+'/client/index.html') 
});

app.use('/client',express.static(__dirname+'/client'));

server.listen(port);

var socket_list = [];
var player_list = [];

var Player = function(id){
	var self = {
		x:400,
		y:300,
		camx:400,
		camy:300,
		vel: 10,
		id:id,
		x_aim:0,
		y_aim:0,
		skill:"none",
		number:"" + Math.floor(100*Math.random())
	}
	self.updatePosition = function(key){
		if(key.left){
			self.x -= self.vel;
			self.camx -=self.vel;
		}
		if(key.right){
			self.x += self.vel;
			self.camx +=self.vel;;
		}
		if(key.up){
			self.y -= self.vel;
			self.camy-=self.vel;
		}
		if(key.down){
			self.y += self.vel;
			self.camy+=self.vel;
		}
	}
	return self;
}

var io = require('socket.io')(server,[]);
io.sockets.on('connection',function(socket){
	console.log('socket connection')
	socket.id = Math.random();
	socket_list[socket.id] = socket;
	var player = Player(socket.id);
	player_list[socket.id] = player;

	socket.on('disconnect',function(){
		delete socket_list[socket.id];
		delete player_list[socket.id];
	});
	socket.on('movement',function(data){
		player.updatePosition(data)
	});
	socket.on('aim_skill',function(data){
		player.x_aim=data.x,
		player.y_aim=data.y,
		player.skill=data.skill
	});

});


setInterval(function(){
	var pack = [];
	for(var i in player_list){
		var player = player_list[i];
		pack.push({
			x:player.x,
			y:player.y,
			camx:player.camx,
			camy:player.camy,
			x_aim:player.x_aim,
			y_aim:player.y_aim,
			skill:player.skill,
			id:player.number
		});
	}
	for(var i in socket_list){
		var socket = socket_list[i];
		socket.emit('state',pack)
	}
},1000/25);





