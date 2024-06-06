import express from "express";

import { todo } from "../models/todolist.js";

const authRouter = express.Router();

authRouter.post('/create', async (req, res) => {
    try {
        const { name, description } = req.body;


        const newTodo = new todo({
            name,
            description,
            complete: false
        });

        // Save todo to database
        await newTodo.save();

        res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

authRouter.get("/read", async (req, res) => {
    try {
        const alltodo = await todo.find();
        res.status(201).json(alltodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

authRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Blogs = await todo.findByIdAndDelete(id);
        res.status(201).json(Blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

authRouter.patch("/complete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const Blogs = await todo.findById(id);
        Blogs.complete = true
        await Blogs.save();
        res.status(201).json(Blogs);
    } catch {
        res.status(500).json({ message: "not completed" });
    }
});

authRouter.delete('/deleteall', async (req, res) => {
    try {
        // Clear the todos array
        await todo.deleteMany({});
        res.json({ message: 'Todo list cleared successfully.' });
    } catch (error) {
        console.error('Error while clearing todo list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default authRouter;

