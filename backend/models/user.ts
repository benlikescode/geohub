import { ObjectId } from "mongodb"

type User = {
  id: ObjectId;
  name: string;
  email: string;
  password: string;
  avatar: string;
  createdAt?: Date;
  location?: string;
}

export default User