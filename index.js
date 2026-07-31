const express = require('express');
const app = express();
const PORT = 3000;

// routers
const apiRouter = require('./routes/apiRoutes');
const taskRouter = require('./routes/taskRoutes');

// midleware
app.use(express.json());

// routes
app.use("/", apiRouter);
app.use("/health", apiRouter);
app.use("/tasks", taskRouter);
app.use("/tasks/:id", taskRouter);

app.listen(PORT, (error) => {
    if (error) throw error;

    console.log(`Server is running on port ${PORT}`);
});