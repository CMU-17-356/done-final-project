import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ITask {
  name: string
  description: string
  id: number
  photo: string 
  priority: string // High, Medium, Low
  label: string
  due_date: Date
  repeating: string // Daily, weekly
  user_id: string
}

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'No Description'
  },
  label: {
    type: String,
    default: 'no label'
  },
  priority: {
    type: String,
    default: 'low'
  },
  user: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    required: true,
  },
  photo: {
    type: String,
    required: false
  },
  repeating: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  }
})


export const Task = mongoose.model('tasks', TaskSchema)