var express = require('express')
var router = express.Router()
const util = require('util')

const redis = require('redis')
const REDIS_PORT = 6379
const REDIS_HOST = '0.0.0.0'

const redisClient = redis.createClient(REDIS_PORT, REDIS_HOST)
redisClient.on('connect', () => {})
redisClient.on('error', err => {
  console.log(err)
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  get().then(data => {
    if (data) {
      res.send(JSON.stringify(Object.fromEntries(data)))
    } else {
      res.send(null)
    }
  })
})

const get = async () => {
  redisClient.keys = util.promisify(redisClient.keys)
  redisClient.get = util.promisify(redisClient.get)

  const keyList = await redisClient.keys('*')
  if (keyList.length !== 0) {
    const map = new Map()
    for (const key of keyList) {
      const value = await redisClient.get(key)
      map.set(key, value)
    }

    return map
  } else {
    return null
  }
}

module.exports = router
