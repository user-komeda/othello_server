/* eslint-disable new-cap */
import express from 'express'
import { selectMongoDb, getDb } from '../util/mongoDbUtil.js'

const router = express.Router()

// topPage
router.get('/', function (req, res, next) {
  const dbConnection = getDb()
  get(dbConnection)
    .then((data) => {
      if (data) {
        console.dir(JSON.stringify(Object.fromEntries(data)))
        res.send(data)
      } else {
        res.send(null)
      }
    })
    .catch((err) => {
      throw err
    })
})

// 部屋情報取得
const get = async (dbConnection) => {
  const result = selectMongoDb(dbConnection).then((data) => {
    console.log(data)
    return data
  })
  return result
}

export default router
