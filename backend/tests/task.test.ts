// @ts-expect-error Importing ts file doesn't work otherwise (must be .js for some reason)
import { Task } from '../../../src/models/task.ts'
import { type ITask } from '../src/models/task'
import express, { Request, Response } from "express";
import { expect } from '@jest/globals'

describe('task', () => {
    it('should create a new Task with the appropriate fields', () => {
      const task: ITask = {
        name: "laundry",
        description: "wash and dry clothes",
        id: 1,
        photo: "random_string", 
        priority: "High",
        label: "chore",
        due_date: new Date(),
        repeating: "Weekly",
        user_id: "devanshg"
      }
      const result = new Task(task)
      expect(result.name).toBe(task.name)
      expect(result.description).toBe(task.description)
      expect(result.id).toBe(task.id)
    })
  })