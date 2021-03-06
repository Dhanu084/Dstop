class chatEngine{
    constructor(chatBoxId , userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect',function ()
        {
            console.log("Connection established using sockets");
            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'dstop'
            });
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data)
            });
        });

        $('#send-message').click(function(event){
            let msg = $('#chat-message-input').val();
            if(msg!=' '){
                self.socket.emit('send_message',{
                    message : msg,
                    userEmail : self.userEmail,
                    chatroom :'dstop'
                })
            }
        });

        self.socket.on('receive_message',function(data){
            console.log(data);
            let newMessage = $('<li>');
            let messageType = 'other-message'
            if(data.userEmail == self.userEmail){
                messageType = 'self-message';
            }
            newMessage.append($('<span>',{
                'html': data.message
            }));
            newMessage.append($('<sub>',{
                'html': data.userEmail
            }));

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        })
    }
}