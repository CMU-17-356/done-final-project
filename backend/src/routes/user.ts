import express from "express";
import { User } from '../models/user';

const router = express.Router();

// GET all Users
router.get("/", (req, res) => {
    User.find({}, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// GET a single User
router.get("/:username", (req, res) => {
    User.find({ username: req.params.username}, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// CREATE a new User
router.post("/", async (req, res) => {
    console.log('post request')
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();

    res.json(newUser);
});


// DELETE a User
router.delete("/:username", async (req, res) => {
    User.findOneAndDelete({ username: req.params.username }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

export const UserRoutes = router