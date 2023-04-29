import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ITask {
  name: string
  description: string
  id: number
  photo_id: number
}

const TaskSchema = new Schema({
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
  photo_id: {
    type: Number, // Positive Int
    required: false
  }
})

export const Task = mongoose.model('tasks', TaskSchema)