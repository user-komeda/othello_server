const socketio = require('socket.io')
function othelloServer (server) {
  const sio = socketio(server, {
    cors: {
      origin: '*'
    }
  })
  sio.on('connection', socket => {
    socket.on('join-room', roomValue => {
      const roomName = roomValue.roomName
      socket.join(roomName)
    })
  })
}
module.exports = othelloServer
