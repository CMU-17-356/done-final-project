import axios from "axios";
import mongoose from "mongoose";

export interface ITask {
    _id: string
    name: string
    description: string
    label: string,
    priority: string,
    user: string
    photo: number
    date: Date
  }


let instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });


export async function getAllTasks(username: string) {
    const response = await instance.get("tasks/")
    const tasks = response.data.filter((task: ITask) => {return username === task.user})
    return tasks
}


export async function getTask(id: string) {
    const response = await instance.get("tasks/" + id)
    const task = response.data
    return task
}

export async function addTask(name: string, description: string, label: string, priority: string, user: string, repeating: string, photo: string) {
    let task = {
        _id: new mongoose.Types.ObjectId().toString(),
        due_date: new Date(),
        name: name,
        description: description,
        user: user,
        label: label,
        priority: priority,
        repeating: repeating,
        photo: photo,
    }
    instance.post("tasks/", task).then((response) => response.data)
}

export async function updateTask(id: string, name: string, description: string, label: string, priority: string, user: string, repeating: string, photo: string) {
    let task = {
        _id: new mongoose.Types.ObjectId().toString(),
        due_date: new Date(),
        name: name,
        description: description,
        user: user,
        label: label,
        priority: priority,
        photo: photo,
        repeating: repeating,
    }
    instance.put("tasks/" + id, task).then((response) => response.data)
}

export async function deleteTask(id: string) {
    instance.delete("tasks/" + id).then((response) => response.data)
}


