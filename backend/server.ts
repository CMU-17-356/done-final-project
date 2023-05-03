import dotenv from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import { TaskRoutes, UserRoutes } from './src/routes/index';
// import cors from 'cors';

// Allow the use of environment variables
dotenv.config()

// Create the app
const app = express();
const port = 8080; //process.env.PORT;

app.use(express.json({limit: '50mb'}));

// Connect to MongoDB Atlas Database
mongoose.set("strictQuery", false)
mongoose.connect(`${process.env.MONGODB_URI}`)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT, DELETE');
    next();
});

// Create appropriate API endpoints
app.use("/api/tasks", TaskRoutes)
app.use("/api/users", UserRoutes)

var server = app.listen(port, () => {
    console.log('Server is running on port ' + port + '!');
});

export async function connect() {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
}

export async function close() {
    await mongoose.connection.close();
}

export async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
    await collection.deleteMany({});
    }
}

export default server
