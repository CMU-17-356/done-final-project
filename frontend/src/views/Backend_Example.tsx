import React, { useState } from 'react';
import {getAllTasks, getTask, updateTask, deleteTask, addTask, ITask} from '../backend-adapter'

export function Example() {
    const [globalTasks, setGlobalTasks] = useState<ITask[]>();
    
    const handlePost = () => {
        // Function to handle POST button click
        console.log('POST button clicked');
        addTask("example", "example task", '', '', 'user', 'weekly', true, '')
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
      }

    const handleUpdate = async () => {
        if (globalTasks !== undefined) {
            const id = globalTasks[0]._id
            updateTask(id, "updated example", "example task", '', '', 'user', 'weekly', true, '')
        }
    }
      

    return (
        <div>
            <button onClick={handlePost}>Post</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleGet}>Refresh</button>
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
