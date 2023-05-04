import express, { Request, Response } from "express";
import mongoose from "mongoose";
import request from "supertest"
import server from "../../server"
import {expect, describe, jest, test} from '@jest/globals';

jest.setTimeout(15000);

describe('POST and GET requests for task', () => {
    it('should create a task and return a json object of tasks', async () => {
      const new_task = {
        _id: "",
        name: "example",
        description: "example task",
        label: "label",
        priority: "High",
        dueDate: null,
        completed: [],
        user: 'user'
      }
      new_task._id = new mongoose.Types.ObjectId().toString()
      const create_response = await request(server).post("/api/tasks/").send(new_task)
      expect(create_response.status).toBe(200)
      const response = await request(server).get("/api/tasks/")
      const task = response.body[response.body.length - 1]
      const id = task.id
      expect(task.name).toBe(new_task.name)
      expect(response.status).toBe(200)
      await request(server).delete("/api/tasks/" + id)
    })
  
  })

  describe('PUT request for updating task', () => {
    it('should update the old task to the new task with updated fields', async () => {
      const new_task = {
        _id: "",
        name: "example",
        description: "example task",
        label: "label",
        priority: "High",
        dueDate: null,
        completed: [],
        user: 'user'
      }
      new_task._id = new mongoose.Types.ObjectId().toString()
      const create_response = await request(server).post("/api/tasks/").send(new_task)
      expect(create_response.status).toBe(200)
      const get_response = await request(server).get("/api/tasks/")
      expect(get_response.status).toBe(200)
      const task = get_response.body[get_response.body.length - 1]
      const id = task._id
      expect(task.name).toBe(new_task.name)
      const new_task_updated = {
        _id: task.id,
        name: "example",
        description: "example task",
        label: "label",
        priority: "Low", // new priority set 
        dueDate: null,
        completed: [],
        user: 'user'
      }
      const response = await request(server).put("/api/tasks/" + id).send(new_task_updated)
      const new_task_response = await request(server).get("/api/tasks/" + id)
      expect(new_task_response.body.priority).toBe("Low")
      await request(server).delete("/api/tasks/" + id)
    })
  })
  

  describe('POST and GET requests for user', () => {
    it('should create a user and return a json object of users', async () => {
      const new_user = {
        first_name: 'first',
        last_name: 'last',
        username: 'user',
        password: 'pass'
      }
      new_user._id = new mongoose.Types.ObjectId().toString()
      const create_response = await request(server).post("/api/users/").send(new_user)
      expect(create_response.status).toBe(200)
      const response = await request(server).get("/api/users/")
      const user = response.body[response.body.length - 1]
      const id = user._id
      expect(user.name).toBe(new_user.name)
      expect(response.status).toBe(200)
      // Delete also tested here
      await request(server).delete("/api/user/" + id)
    })
  
  })