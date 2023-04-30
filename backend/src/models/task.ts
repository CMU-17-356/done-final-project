import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ITask {
  name: string
  description: string
  id: number
  photo: string 
  priority: string
  label: string
  due_date: Date
  repeating: string
  user_id: string
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
  photo: {
    type: String,
    required: true
  }, 
  priority: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  repeating: {
    type: String,
    required: false
  },
  due_date: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
})


export const Task = mongoose.model('tasks', TaskSchema)