import axios from "axios";
import mongoose from "mongoose";

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


let instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });


export async function getAllTasks(username: string) {
    const response = await instance.get("tasks/")
    let tasks = response.data.filter((task: ITask) => {return username === task.user})
    tasks.forEach((x) => (x.createdAt = new Date(x.createdAt)))
    tasks.forEach((x) => {
        if(x.dueDate !== null){
            x.dueDate = new Date(x.dueDate)
        }
    })
    tasks.forEach((x) => {
        x.completed.forEach(y => {
            y.date = new Date(y.date)
        });
    })
    return tasks
}


export async function getTask(id: string) {
    const response = await instance.get("tasks/" + id)
    const task = response.data
    return task
}

export async function addTask(task) {
    task._id = new mongoose.Types.ObjectId().toString()
    await instance.post("tasks/", task) 
}

export async function updateTask(id: string, name: string, description: string, label: string, priority: string, user: string, recurring: string, status: boolean, photo: string) {
    let task = {
        _id: id,
        dueDate: new Date(),
        name: name,
        description: description,
        user: user,
        label: label,
        priority: priority,
        recurring: recurring,
    }
    instance.put("tasks/" + id, task).then((response) => response.data)
}

export async function updateTask2(task: ITask) {
    const id = task._id
    await instance.put("tasks/" + id, task).then((response) => response.data)
}

export async function deleteTask(id: string) {
    await instance.delete("tasks/" + id)
}

export async function addUser(user) {
    // Check for duplicates 
    const response = await instance.get("users/" + user.username);
    if (response.data.length == 0) {
        await instance.post("users/", user) 
        return true
    } else {
        return false
    }
}

export async function authenticateUser(username: string, password: string) {
    const response = await instance.get("users/" + username)
    if (response.data.length == 0) {
        return false
    }
    const user = response.data[0]
    if (user.password === password) {
        return true
    } 
    return false 
}