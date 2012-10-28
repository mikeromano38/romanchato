$(function(){
    //enter awesome scripting here
    var chatInput = $('#chat-input');
    var chatWindow = $('#chat-window');
    var message;

    $('#chat-send').click(sendMessage);

    function sendMessage(){
        if (chatInput.val() != '') {
            message = chatInput.val();
            console.log(User.name);
            chatWindow.append($("<div class='chat-message'><p>" + User.name + ': ' + message + "</p></div>"));
            socket.emit('new message', {
                user: User.name,
                message: message
            });
        }
    }

    socket.on('publish message', function(data){
        chatWindow.append($("<div class='chat-message'><p>" + data.user + ': ' + data.message + "</p></div>"));
    });

    socket.on('welcome user', function(data){
        console.log(data);
        chatWindow.append($("<div class='chat-welcome-message'><p>" + data.user + " just joined the room!</p></div>"));
    });

});