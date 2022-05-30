import { Server } from 'socket.io'
import { insertMongoDb, getDb } from '../util/mongoDbUtil.js'

/**
 *
 * @param server server
 * @param db db
 */
const othelloServer = (server, db) => {
  const dbConnection = getDb()

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
        roomObject.roomName = roomName
        const obj = { roomObject: roomObject }
        insertMongoDb(dbConnection, obj)
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

// const insertMongoDb = (db, obj) => {
//   const dbo = db.db('othello')
//   // ----------------------------------------------------------------------
//   // INSERT
//   // ----------------------------------------------------------------------
//   dbo.collection('othello').insertOne(obj, function (err, res) {
//     if (err) throw err
//     db.close()
//   })
// }

export default othelloServer
