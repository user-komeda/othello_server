const socketio = require('socket.io')
function othelloServer (server) {
  const sio = socketio(server, {
    cors: {
      origin: '*'
    }
  })
  sio.on('connection', function (socket) {
    console.log('connection')
  })
}
module.exports = othelloServer
