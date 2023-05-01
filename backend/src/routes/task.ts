import express from "express";
import { Task } from '../models/task';

const router = express.Router();

// GET all Tasks
router.get("/", (req, res) => {
    console.log('get request')
    Task.find({}, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// GET a single task
router.get("/:id", (req, res) => {
    Task.findById(req.params.id, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// CREATE a new Task
router.post("/", async (req, res) => {
    console.log('post request')
    const task = req.body;
    const newTask = new Task(task);
    await newTask.save();

    res.json(newTask);
});

// UPDATE a Task
router.put("/:id", async (req, res) => {
    console.log(req.params.id)
    const task = req.body;
    console.log("update task", task)
    Task.findOneAndUpdate({ _id: req.params.id }, { $set: task }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// DELETE a task
router.delete("/:id", async (req, res) => {
    Task.findOneAndDelete({ _id: req.params.id }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

export const TaskRoutes = router