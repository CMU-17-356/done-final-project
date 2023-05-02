import mongoose from 'mongoose'
const { Schema } = mongoose

export interface IUser {
  name: string
  email_id: string
}

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String, // Positive Int
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

export const User = mongoose.model('users', UserSchema)