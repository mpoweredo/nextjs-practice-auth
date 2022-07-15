import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
    const client = await MongoClient.connect(process.mongodbURL)
    return client
}
