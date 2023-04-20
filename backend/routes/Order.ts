import express from "express";
import { Order } from '../models/index';

const router = express.Router();

// GET all orders
router.get("/", (req, res) => {
    Order.find({}, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// GET a single order
router.get("/:id", (req, res) => {
    Order.findById(req.params.id, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// CREATE a new order
router.post("/", async (req, res) => {
    const order = req.body;
    const newOrder = new Order(order);
    await newOrder.save();

    res.json(newOrder);
});

// UPDATE a order
router.put("/:id", async (req, res) => {
    const order = req.body;
    Order.findOneAndUpdate({ _id: req.params.id }, { $set: order }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// DELETE a order
router.delete("/:id", async (req, res) => {
    Order.findOneAndDelete({ _id: req.params.id }, (err: any, result: any) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

export const OrderRoutes = router