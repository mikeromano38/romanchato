
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.configure(function () {
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {

  var timeOut;
  var user;

  //check for client every 2 seconds
  var interval = setInterval(function(){

    //set timeout for stopping the interval
    timeOut = setTimeout(function(){
      clearInterval(interval);
      console.log('A USER HAS LEFT THE CHATROOM');
      socket.broadcast.emit('user left', {
        user: user
      });
    }, 2000);

    //check for client every 2 seconds
    socket.emit('you there', {});

  }, 3000);

  //listen for response from client
  socket.on('here I am', function(data){
    console.log('CLIENT IS PRESENT', data.user);
    clearTimeout(timeOut);
  });

  socket.on('new message', function(data) {
    socket.broadcast.emit('publish message', { 
      user: data.user,
      message: data.message 
    });
  });

  socket.on('user joined', function(data){
    socket.broadcast.emit('welcome user', { user: data.user });
    user = data.user;
  });
});



