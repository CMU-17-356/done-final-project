import mongoose from 'mongoose'
const { Schema } = mongoose

export interface IUser {
  first_name: string
  last_name: string
  username: string
  password: string
  history_clicks: number
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
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true
  },
  history_clicks: {
    type: Number,
    required: true
  }
})

export const User = mongoose.model('users', UserSchema)