const REDIS_PORT = 6379
const REDIS_HOST = '0.0.0.0'

const redis = require('redis')
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)
redisClient.on('connect', () => {
  console.log('truetype')
})
redisClient.on('error', err => {
  console.log(err)
})

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
      const playerName = roomValue.playerName
      console.log(roomName)
      console.log(playerName)
      socket.join(roomName)
      const roomSize = socket.adapter.rooms.get(roomName).size
      if (roomSize === 1) {
        console.log('wait')
        const roomObject = {}
        roomObject.playerName = playerName
        roomObject.turn = 0
        redisClient.set(roomName, JSON.stringify(roomObject))
        socket.to(roomName).emit('change-mode', {
          mode: 'wait',
          blackIsNext: false
        })
      } else if (roomSize === 2) {
        console.log('start')
        socket.to(roomName).emit('change-mode', {
          mode: 'start',
          blackIsNext: true
        })
      } else {
        console.log('leave')
        socket.to(roomName).emit('over-notice')
        socket.leaveAll()
        console.log(socket.adapter.rooms.get(roomName).size)
      }
    })
    socket.on('put-piece', value => {
      socket.to(roomName).emit('update-piece', {})
    })
  })
}
module.exports = othelloServer
