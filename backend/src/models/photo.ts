import mongoose from 'mongoose'
const { Schema } = mongoose

export interface IPhoto {
  name: string
  description: string
  id: number
  link: string
}

const PhotoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  id: {
    type: Number, // Positive Int
    required: true
  },
  link: {
    type: String, // Positive Int
    required: true
  }
})

export const Photo = mongoose.model('photos', PhotoSchema)