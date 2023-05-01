import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ITask {
  name: string
  description: string
  label: string,
  priority: string,
  user: string
  photo: String
  due_date: Date
  repeating: string
  open: boolean
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