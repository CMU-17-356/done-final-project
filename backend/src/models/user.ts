import mongoose from 'mongoose'
const { Schema } = mongoose

export interface IUser {
  name: string
  email_id: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email_id: {
    type: String, // Positive Int
    required: true
  }
})

export const User = mongoose.model('users', UserSchema)