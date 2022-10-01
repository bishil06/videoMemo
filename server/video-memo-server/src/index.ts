import express from 'express'
import { MongoClient } from 'mongodb'

const MONGO_ID = process.env.MONGO_ID
const MONGO_PASSWD = process.env.MONGO_PASSWD
const MONGO_URL = process.env.MONGO_URL
const MONGO_PORT = process.env.MONGO_PORT
const DB_NAME = process.env.DB_NAME
const COLLECTION_NAME = process.env.COLLECTION_NAME

const PORT = process.env.PORT || 8080

const dbURL = `mongodb://${MONGO_ID}:${MONGO_PASSWD}@${MONGO_URL}:${MONGO_PORT}`

async function main() {
  // check env
  if (!MONGO_ID) {
    return console.error(`env check MONGO_ID ${MONGO_ID}`)
  }
  if (!MONGO_PASSWD) {
    return console.error(`env check MONGO_PASSWD ${MONGO_PASSWD}`)
  }
  if (!MONGO_URL) {
    return console.error(`env check MONGO_URL ${MONGO_URL}`)
  }
  if (!MONGO_PORT) {
    return console.error(`env check MONGO_PORT ${MONGO_PORT}`)
  }
  if (!DB_NAME) {
    return console.error(`env check DB_NAME ${DB_NAME}`)
  }
  if (!COLLECTION_NAME) {
    return console.error(`env check COLLECTION_NAME ${COLLECTION_NAME}`)
  }

  // connect db
  const mongoClient = new MongoClient(dbURL)
  await mongoClient.connect()
    .then(() => console.log('db connect success'))
    .catch(err => {
      console.error(err)
      mongoClient.close()
    })
  const db = mongoClient.db(DB_NAME)
  const collection = db.collection(COLLECTION_NAME)

  // listenning PORT
  const app = express()
  app.use(express.json())
  app.post('/card', (req, res) => {
    console.log(req.body)

    const doc = {}
    Object.assign(doc, req.body)

    collection.insertOne(doc)
      .then((r) => {
        res.json({ objectId: r.insertedId.toJSON() })
      })
      .catch((err) => {
        console.error(err)
        res.status(400).end('bad')
      })
  })

  app.get('/cards', (req, res) => {
    const url = req.query.url
    console.log('url', url)

    if (url === undefined) {
      return res.json([])
    }

    collection.find({ url }).toArray()
      .then(arr => {
        res.json(arr)
      })
      .catch(err => {
        console.error(err)
        res.status(400).end('bad')
      }) 
  })

  app.listen(PORT, () => {
    console.log(`server listenning ${PORT}`)
  })
}

main()
