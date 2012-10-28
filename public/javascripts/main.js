$(function(){
    //enter awesome scripting here
    var chatInput = $('#chat-input');
    var chatWindow = $('#chat-window');
    var message;

    $('#chat-send').click(sendMessage);
    chatInput.bind('keydown', function(e)) {
        if(e.key == 'enter'){
            sendMessage();
        }
    }

    function sendMessage(){
        if (chatInput.val() != '') {
            message = chatInput.val();
            console.log(User.name);
            createMessage($("<div class='chat-message message'><p>" + User.name + ': ' + message + "</p></div>"));
            chatInput.val('');
            chatInput.focus();
            socket.emit('new message', {
                user: User.name,
                message: message
            });
        }
    }

    function createMessage(message) {
        chatWindow.append(message);
    }

    socket.on('publish message', function(data){
        createMessage($("<div class='chat-message message'><p>" + data.user + ': ' + data.message + "</p></div>"));
    });

    socket.on('welcome user', function(data){
        console.log(data);
        createMessage($("<div class='chat-welcome-message message'><p>" + data.user + " just joined the room!</p></div>"));
    });

});