import mongodb from 'mongodb'

let dbConnection = null

/**
 * mongoDBInsert
 *
 * @param {*} db db
 * @param {*} obj obj
 */
export const insertMongoDb = (db, obj) => {
  const dbo = db.db('othello')
  // ----------------------------------------------------------------------
  // INSERT
  // ----------------------------------------------------------------------
  dbo.collection('othello').insertOne(obj, function (err, res) {
    if (err) throw err
  })
}

/**
 *select文
 *
 * @param {*} db db
 */
export const selectMongoDb = async (db) => {
  const dbo = db.db('othello')
  const result = await dbo.collection('othello').find()
  return result.toArray()
}

/**
 *db接続関数
 */
export const dbConnect = async () => {
  console.log('aaa')
  const mongoClient = mongodb.MongoClient
  const connection = await mongoClient
    .connect('mongodb://127.0.0.1:27017/myDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      return data
    })
    .catch((err) => {
      throw err
    })
  dbConnection = connection
  return connection
}

/**
 *dbのコネクションを取得
 */
export const getDb = () => {
  return dbConnection
}
