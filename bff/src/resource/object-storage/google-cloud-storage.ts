import { Storage } from '@google-cloud/storage'

const bucketName = '0ee0acc2-0c1e-4342-ba70-3be43e7ad051'
const storage = new Storage()
async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName)
  console.log(`Bucket ${bucketName} created.`)
}

createBucket()
