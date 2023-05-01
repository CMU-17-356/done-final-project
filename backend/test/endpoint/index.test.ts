import express, { Request, Response } from "express";
import mongoose from "mongoose";
import request from "supertest"
import server from "../../server"
import {expect, describe, jest, test} from '@jest/globals';


describe('GET request for task', () => {
    it('should return a json object of tasks', async () => {
  
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
  
  })

  describe('PATCH request for updating task with new priority', () => {
    it('should update the priority from the original to the new priority', async () => {
      const new_task = {
        name: "laundry",
        description: "wash and dry clothes",
        id: 1,
        photo: "random_string", 
        priority: "High",
        label: "chore",
        due_date: new Date(),
        recurring: "Weekly",
        user_id: "devanshg"
      }
      const create_response = await request(server).post('/').send(new_task)
      expect(create_response.status).toBe(200)
  
      const get_response = await request(server).get('/')
      expect(get_response.status).toBe(200)
  
      const task = get_response.body[get_response.body.length - 1]
      const old_priority = task.priority
      const new_priority = "Low"
      const id = task.id
      const response = await request(server).patch('/' + id).send(new_priority)
      // After assigned drone, order is fulfilled and completed 
      expect(response.body.order.status).toBe("Low")
      const deleted = await request(server).delete('/deleteOrder/' + id)
    })
  })
  