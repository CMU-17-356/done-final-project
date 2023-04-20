import express from "express";
import { User } from '../models/index';

const router = express.Router();

// GET all users
router.get("/", (req, res) => {
    User.find({}, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// GET a single user
router.get(":id", (req, res) => {
    User.findById(req.params.id, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// CREATE a new user
router.post("/", async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();

    res.json(newUser);
});

// UPDATE a user
router.put("/:id", async (req, res) => {
    const user = req.body;
    User.findOneAndUpdate({ _id: req.params.id }, { $set: user }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// DELETE a user
router.delete("/:id", async (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

export const UserRoutes = router