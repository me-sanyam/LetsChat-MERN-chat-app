module.exports = function(socket){

    socket.on('message',(data) => {
        console.log('--> data',data);
    })

}