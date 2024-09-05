const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./db/db");
const userRoutes = require("./routes/user-routes");

connectDb();
const app = express();
const port = 3000;

app.use("/api/users", userRoutes);

app.get("/api", (req, res) => {
  res.send("Hello world from express app!!");
});

app.get("/api/dbtest", async (req, res) => {
  const collections = await mongoose.connection.db.collections();
  res.send(collections.map((c) => c.collectionName));
});

app.listen(port, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode`);
  console.log(`task-manager api is listening at port ${port}`);
});
