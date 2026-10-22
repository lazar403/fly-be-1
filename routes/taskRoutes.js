const { Router } = require("express");
const taskRouter = Router();

const db = require("better-sqlite3")("tasks.db");

// execute only once to create the table in the db
// db.exec(`
//     CREATE TABLE tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, done BOOLEAN NOT NULL)
//     `);

const taskObjects = [
  {
    id: 1,
    title: "Clean dishes",
    done: false,
  },
  {
    id: 2,
    title: "Do laundry",
    done: true,
  },
  {
    id: 3,
    title: "Rack clothes",
    done: false,
  },
];

// get all tasks
taskRouter.get("/", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks").all();
  res.status(200).json(tasks);
});

// get task by id
taskRouter.get("/:id", (req, res, error) => {
  const taskId = parseInt(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }
  res.status(200).json(task);
});

// create a task
taskRouter.post("/", (req, res) => {
  const newTaskTitle = req.body.title ?? "";
  const newTaskStatus = req.body.done ?? false;

  if (!newTaskTitle) return res.status(400).json({ error: "Bad Request" });

  db.prepare("INSERT INTO tasks (title, done) VALUES (?, ?)").run(
    newTaskTitle,
    Number(newTaskStatus),
  );

  res.status(201).json({ message: "Task created successfully" });
});

// update a task
taskRouter.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  const { title, done } = req.body;
  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof done !== "boolean"
  ) {
    return res.status(400).json({
      error: "Title must be a non-empty string and done must be a boolean.",
    });
  }

  db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(
    title.trim(),
    Number(done),
    taskId,
  );
  res.status(200).json({ message: "Task updated successfully" });
});

// delete a task
taskRouter.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({ error: "Invalid task ID." });
  }

  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found." });
  }

  db.prepare("DELETE FROM tasks WHERE id = ?").run(taskId);
  return res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = taskRouter;
