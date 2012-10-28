$(function(){

    var chatWindow = $('#chat-window');
    
    while (User.name == '') {
        User.name = window.prompt('Please enter your chat name.');
    }

    chatWindow.append($("<div class='chat-welcome-message'><p>" + User.name + " just joined the room!</p></div>"));
    socket.emit('user joined', {
        user: User.name
    });

});