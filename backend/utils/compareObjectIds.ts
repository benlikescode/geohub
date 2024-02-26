import { ObjectId } from 'mongodb'

const compareObjectIds = (objectId1: string | ObjectId | undefined, objectId2: string | ObjectId | undefined) => {
  if (!objectId1 || !objectId2) {
    return false
  }

  return objectId1.toString() === objectId2.toString()
}

export default compareObjectIds
