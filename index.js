const express = require('express');
const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
    response.send("Hello world")
});


app.listen(PORT, (error) => {
    if (error)
        throw error;

    console.log(`Server is running on port ${PORT}`);
});