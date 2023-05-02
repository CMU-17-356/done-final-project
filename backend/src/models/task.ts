import mongoose from 'mongoose'
const { Schema } = mongoose

export interface ITask {
  _id: string
  name: string
  description: string
  label: string
  priority?: string
  dueDate?: Date | null
  recurring?: string
  day?: string | null
  completed: {date: Date, photo: string}[]
  createdAt: Date
  user: string
}

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    default: 'Low'
  },
  user: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: false
  },
  recurring: {
    type: String,
    required: false
  },
  day: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  completed: {
    type: [{date: Date, photo: String}],
    default: []
  },
})


export const Task = mongoose.model('tasks', TaskSchema)