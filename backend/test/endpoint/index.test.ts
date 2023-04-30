import express, { Request, Response } from "express";
import mongoose from "mongoose";
import request from "supertest"
import server from "../../server"

describe('GET request for task', () => {
    it('should return a json object of tasks', async () => {
  
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
  
  })