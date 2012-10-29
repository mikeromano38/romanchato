$(function(){
    //enter awesome scripting here
    var chatInput = $('#chat-input');
    var chatWindow = $('#chat-window');
    var message;

    //add events listeners
    $('#chat-send').click(sendMessage);   
    chatInput.bind('keydown', function(e){
        if(e.keyCode == 13){
            sendMessage();
        }
    });

    //get chat name
    function login(){
        while (User.name == '') {
            User.name = window.prompt('Please enter your chat name.');
        }

        createMessage($("<div class='chat-welcome-message message'><p>" + User.name + " just joined the room!</p></div>"));
        scrollContent();
        socket.emit('user joined', {
            user: User.name
        });
    }

    function sendMessage(){
        if (chatInput.val() != '') {
            message = chatInput.val();
            console.log(User.name);
            createMessage($("<div class='chat-message message'><p>" + User.name + ': ' + message + "</p></div>"));
            scrollContent();
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

    function scrollContent() {
        console.log('scroll', );
        chatWindow.animate({scrollTop: chatWindow.attr('scrollHeight')});
    }

    socket.on('publish message', function(data){
        createMessage($("<div class='chat-message message'><p>" + data.user + ': ' + data.message + "</p></div>"));
        scrollContent();
    });

    socket.on('welcome user', function(data){
        console.log(data);
        createMessage($("<div class='chat-welcome-message message'><p>" + data.user + " just joined the room!</p></div>"));
        scrollContent();
    });

    login();
});