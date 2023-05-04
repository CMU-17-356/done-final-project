// @ts-expect-error Importing ts file doesn't work otherwise (must be .js for some reason)
import { Task } from '../src/models/task.ts'
// @ts-expect-error Importing ts file doesn't work otherwise (must be .js for some reason)
import { type ITask } from '../src/models/task.ts'
import { expect } from '@jest/globals'

describe('task', () => {
    it('should create a new Task with the appropriate fields', () => {
      const task: ITask = {
        _id: "",
        name: "example",
        description: "example task",
        label: "label",
        priority: "Low",
        dueDate: null,
        completed: [],
        createdAt: new Date(),
        user: 'user'
      }
      const result = new Task(task)
      expect(result.name).toBe(task.name)
      expect(result.description).toBe(task.description)
      expect(result.label).toBe(task.label)
      expect(result.priority).toBe(task.priority)
      expect(result.user).toBe(task.user)
    })
  })