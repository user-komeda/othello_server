const REDIS_PORT = 6379
const REDIS_HOST = '0.0.0.0'

const redis = require('redis')
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

const socketio = require('socket.io')

const startGameF = false

function othelloServer (server) {
  const sio = socketio(server, {
    cors: {
      origin: '*'
    }
  })
  sio.on('connection', socket => {
    socket.once('join-room', roomValue => {
      const roomName = roomValue.roomName
      const playerName = roomValue.playerName

      socket.join(roomName)
      const roomSize = socket.adapter.rooms.get(roomName).size

      if (roomSize === 1) {
        console.log('room1')

        const roomObject = {}
        roomObject.playerName = playerName
        roomObject.turn = 0
        redisClient.set(roomName, JSON.stringify(roomObject))
        socket.to(roomName).emit('change-mode', {
          mode: 'wait',
          blackIsNext: false
        })
      } else if (roomSize === 2) {
        console.log('room2')
        socket.to(roomName).emit('change-mode', {
          mode: 'start',
          blackIsNext: true
        })
      } else {
        console.log(socket.id)
        socket.emit('over-notice')
      }
    })
    socket.on('put-piece', value => {
      console.log('over')
      socket.to(roomName).emit('update-piece', {})
    })
  })
}
module.exports = othelloServer
