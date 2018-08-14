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
		x:200,
		y:200,
		vel: 10,
		id:id,
		number:"" + Math.floor(100*Math.random())
	}
	self.updatePosition = function(key){
		if(key == 'd')
			self.x += self.vel
		if(key == 'a')
			self.x -= self.vel
		if(key == 'w')
			self.y -= self.vel
		if(key == 's')
			self.y += self.vel
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
	socket.on('w',function(){
		player.updatePosition('w')
	});
	socket.on('a',function(){
		player.updatePosition('a')
	});
	socket.on('s',function(){
		player.updatePosition('s')
	});
	socket.on('d',function(){
		player.updatePosition('d')
	});

});

setInterval(function(){
	var pack = [];
	for(var i in player_list){
		var player = player_list[i];
		pack.push({
			x:player.x,
			y:player.y,
			id:player.number
		});
	}
	for(var i in socket_list){
		var socket = socket_list[i];
		socket.emit('new_position',pack)
	}
},1000/25);





