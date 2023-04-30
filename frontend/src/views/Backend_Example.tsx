import React, { useState } from 'react';
import { Buffer } from 'buffer';
import axios from "axios";
import {getAllTasks, getTask, updateTask, deleteTask, addTask, ITask} from '../backend-adapter'

let instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });

let globalTasks: ITask[]

export function Example() {
    const [globalTasks, setGlobalTasks] = useState<ITask[]>();
    
    const handlePost = () => {
        // Function to handle POST button click
        console.log('POST button clicked');
        addTask("example", "example task", '', '', 'user', 'weekly', '')
    }

    const handleGet = async () => {
        setGlobalTasks(await getAllTasks("user"));
        console.log(globalTasks)
    }

    const handleDelete = async () => {
        if (!(globalTasks === undefined) && globalTasks.length > 0) {
          let taskToDelete: ITask = globalTasks[0]; // specify ITask type
          deleteTask(taskToDelete._id);
        }
        console.log(globalTasks);
      };
      

    return (
        <div>
            <button onClick={handlePost}>POST</button>
            <button onClick={handleGet}>GET</button>
            <button onClick={handleDelete}>Delete</button>
            <div>
                <h2>GET result:</h2>
                {globalTasks !== undefined ? (
                    globalTasks.map((task) => {
                        return <p>Task with name "{task.name}"" and id "{task._id}"</p>
                    })
                    ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
    }

export default Example;
