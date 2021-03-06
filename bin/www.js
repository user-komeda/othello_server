/**
 * Module dependencies.
 */
import express from 'express'

const app = express()
import http from 'http'
import othelloServer from '../module/othelloServer.js'
import roomInfo from '../module/roomInfo.js'
import cors from 'cors'
import Debug from 'debug'
const debug = Debug('othello-server:server')
import { dbConnect, getDb } from '../util/mongoDbUtil.js'

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '80')
app.set('port', port)

/**
 * Create HTTP server.
 */

app.use(cors())

app.use('/', roomInfo)

const server = http.createServer(app)

// const REDIS_PORT = 6379
// const REDIS_HOST = '0.0.0.0'

await dbConnect()
  .then((data) => {
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
    othelloServer(server)
  })
  .catch((err) => {
    throw err
  })

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log('listening on ' + bind)
}
