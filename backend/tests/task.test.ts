// @ts-expect-error Importing ts file doesn't work otherwise (must be .js for some reason)
import { Task } from '../../../src/models/task.ts'
import { type ITask } from '../src/models/task'
import express, { Request, Response } from "express";
import { expect } from '@jest/globals'

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

describe('task', () => {
    it('should create a new Task with the appropriate fields', () => {
      const task: ITask = {
        name: "laundry",
        description: "wash and dry clothes",
        photo: "random_string", 
        priority: "High",
        label: "chore",
        dueDate: new Date(),
        recurring: "Weekly",
        user: "devanshg",
        status: false,
        createdAt: new Date(),
      }
      const result = new Task(task)
      expect(result.name).toBe(task.name)
      expect(result.description).toBe(task.description)
    })
  })