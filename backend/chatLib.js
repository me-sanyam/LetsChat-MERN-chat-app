const MESSAGE = require('./models/messagemodel');

module.exports = function(socket){

    socket.on('user-message', ({message, chatId}) => { 
        socket.broadcast.emit(`get-message-${chatId}`,{message:message});
    })

    socket.on('read-message', async({chatId,userId}) => {
        try{
            const messages = await MESSAGE.find({chat : chatId, sender: {$ne: userId}});            
            if(messages.length){
                messages.forEach(async(item) => {

                    if(!item.readBy.includes(userId)){
                        const readBy = [...item.readBy, userId];
    
                        await MESSAGE.updateOne(
                            {_id: item._id},
                            {$set: { readBy: readBy }}
                        )
                    }
                });
            }
            socket.broadcast.emit(`update-chat-count`,{chatId: chatId, count: 0});
        }catch(e){
            console.log('--> Error',e);
        }
    })

    socket.on('send-socket-update-chat',({chatId,userId}) => {

        console.log('##### send-socket-update-chat',{chatId,userId});
        // socket.emit(`update-chat-count`,{chatId: chatId, count: 0});
    })
}