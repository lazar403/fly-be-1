const { Router } = require('express');
const taskRouter = Router();

const taskObjects = [
    {
        id: 1,
        title: "Clean dishes",
        done: false
    },
    {
        id: 2,
        title: "Do laundry",
        done: true
    },
    {
        id: 3,
        title: "Rack clothes",
        done: false
    },
];


// get all tasks
taskRouter.get("/", (req, res) => {
    res.json(taskObjects);
});

// get task by id
taskRouter.get("/:id", (req, res, error) => {
    const taskId = parseInt(req.params.id);
    const task = taskObjects.find(task => task.id === taskId);

    if (!task) {
        return res.status(400).json({ error: "Bad Request" });
    }

    res.status(200).json(task);
})

// create a task
taskRouter.post("/", (req, res) => {
    const newTaskTitle = req.body.title;
    const newTaskStatus = req.body.done ?? false;

    if (!newTaskTitle)
        return res.status(400).json({ error: "Bad Request" });

    const newTask = {
        id: taskObjects.length + 1,
        title: newTaskTitle,
        done: newTaskStatus
    };

    taskObjects.push(newTask);
    res.status(201).json(newTask);
})

// update a task
taskRouter.put("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskObjects.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    const { title, done } = req.body;
    if (title === undefined || done === undefined) {
        return res.status(400).json({ error: "Missing required fields: title and done "});
    }

    taskObjects[taskIndex] = {
        id: taskId,
        title,
        done
    }; 
    res.status(200).json(taskObjects[taskIndex]);
})

// delete a task
taskRouter.delete("/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = taskObjects.findIndex(t => t.id === taskId);

    if (taskIndex !== -1) {
        taskObjects.splice(taskIndex, 1);
        return res.status(200).json({ message: "Task deleted successfully" });
    } else {
        return res.status(400).json({ error: "Task not found" });
    }
})

module.exports = taskRouter;