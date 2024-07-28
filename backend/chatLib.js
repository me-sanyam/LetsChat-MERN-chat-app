const MESSAGE = require('./models/messagemodel');

module.exports = function(socket){

    socket.on('user-message', async({message,chatId}) => {
        console.log('#################### user-message ###################');
        console.log(chatId);
        try{
            const messages = await MESSAGE.find({
                chat : chatId,
                sender: {$eq: message.sender._id},
                readBy: {$eq: []}
            });

            socket.broadcast.emit(`get-message`,{chatId:chatId,message:message});
            socket.broadcast.emit(`update-chat-count`,{chatId: chatId, count:messages.length});
        }catch(e){
            console.log('-->>> ERROR',e);
        }
    })

    socket.on('read-message', async({chatId,userId}) => {
        console.log('#################### read-message ###################');
        console.log(chatId);
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

    // socket.on('send-socket-update-chat',({chatId,userId}) => {

    //     console.log('##### send-socket-update-chat',{chatId,userId});
    //     // socket.emit(`update-chat-count`,{chatId: chatId, count: 0});
    // })
}