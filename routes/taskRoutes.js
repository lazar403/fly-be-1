const { Router } = require('express');
const taskRouter = Router();

const taskObjects = [
    'Clean dishes', 
    'Do laundry',
    'Rack clothes'
];

// get all tasks
taskRouter.get("/", (req, res) => {
    res.json(taskObjects);
});

// get task by id
taskRouter.get("/:id", (req, res, error) => {
    const taskId = req.params.id;

    if (taskId < 0 || taskId >= taskObjects.length) {
        res.status(404).json({ error: "Task not found" });
        return;
    }
    res.status(200).json(taskObjects[taskId]);
})

taskRouter.post("/", (req, res) => {
    // console.log(req.body.title);
    const newTask = req.body.title;

    if (!newTask) {
        res.status(400).json({ error: "Bad Request" });
        return;
    }

    taskObjects.push(newTask);
    res.status(201).json(newTask);
})

module.exports = taskRouter;