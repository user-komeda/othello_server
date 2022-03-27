import redis from 'redis'
import { Server } from 'socket.io'

const REDIS_PORT = 6379
const REDIS_HOST = '0.0.0.0'
const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)

/**
 *
 * @param server server
 */
const othelloServer = (server) => {
  const sio = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  })

  sio.on('connection', (socket) => {
    socket.once('join-room', (roomValue) => {
      const roomName = roomValue.roomName
      const playerName = roomValue.playerName

      socket.join(roomName)
      const roomSize = socket.adapter.rooms.get(roomName).size
      console.log(socket.id)
      if (roomSize === 1) {
        console.log('room1')

        const roomObject = {}
        roomObject.playerName = playerName
        roomObject.turn = 0
        redisClient.set(roomName, JSON.stringify(roomObject))
        socket.emit('change-mode', {
          mode: 'wait',
          blackIsNext: false,
          to: roomName,
        })
      } else if (roomSize === 2) {
        console.log('room2')
        socket.emit('change-mode', {
          mode: 'start',
          blackIsNext: true,
          to: roomName,
        })
      } else {
        console.log(socket.id)
        socket.emit('over-notice')
      }
    })
    // socket.on('put-piece', value => {
    //   console.log('over')
    //   socket.to(roomName).emit('update-piece', {})
    // })
  })
}
export default othelloServer
