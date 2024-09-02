const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world from express app!!");
});

app.listen(port, () => {
    console.log(`task-manager api is listening at port ${port}`);
});