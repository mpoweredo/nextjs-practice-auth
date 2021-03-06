import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
    const client = await MongoClient.connect(process.env.MONGODBURL)
    return client
}
