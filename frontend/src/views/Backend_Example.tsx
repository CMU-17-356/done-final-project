import React, { useState } from 'react';
import {getAllTasks, getTask, updateTask, deleteTask, addTask, ITask} from '../backend-adapter'

export function Example() {
    const [globalTasks, setGlobalTasks] = useState<ITask[]>();
    
    const handlePost = () => {
        // Function to handle POST button click
        console.log('POST button clicked');
        const emptyTodo: ITask = {
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

        addTask(emptyTodo)
    }

    const handleGet = async () => {
        setGlobalTasks(await getAllTasks("user"));
        console.log(globalTasks)
    }

    const handleDelete = async () => {
        if (!(globalTasks === undefined) && globalTasks.length > 0) {
          let taskToDelete: ITask = globalTasks[0];
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
