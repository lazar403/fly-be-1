const { Router } = require('express');
const apiRouter = Router();

apiRouter.get("/", (req, res) => {
    res.json( {
        name: "Task API",
        version: "1.0",
        endpoints: "/tasks"
    });
});

apiRouter.get("/health", (req, res) => res.status(200).json({ status: "OK" }) );

module.exports = apiRouter;