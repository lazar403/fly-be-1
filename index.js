const express = require('express');
const app = express();
const PORT = 3000;

// routers
const apiRouter = require('./routes/apiRoutes');

// routes
app.use("/", apiRouter);
app.use("/health", apiRouter);

app.listen(PORT, (error) => {
    if (error) throw error;

    console.log(`Server is running on port ${PORT}`);
});