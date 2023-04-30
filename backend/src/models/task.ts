import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ITask {
  name: string
  description: string
  label: string,
  priority: string,
  user: string
  photo: number
  date: Date
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
  date: {
    type: Date,
    required: true,
  },
  photo: {
    type: Buffer,
    required: false
  }
})

export const Task = mongoose.model('tasks', TaskSchema)