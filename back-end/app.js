const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./db/db");
const authRoutes = require("./routes/auth-routes");
const taskRoutes = require("./routes/task-routes");
const swaggerDocs = require("./swagger/swagger");
const environment = require("./services/env-service");
const { authenticateToken } = require("./middleware/authenticate-token");

connectDb();
const app = express();
const port = environment.port;

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use swagger
swaggerDocs(app, port);

app.use(cors()); //DEBT: Allowing from all origins all types. Bad.

app.use("/api/auth", authRoutes);
app.use("/api/task", authenticateToken, taskRoutes);

//DEBT: Remove unwanted routes
app.get("/api", authenticateToken, (req, res) => {
  res.send("Hello world from express app!!");
});

app.get("/api/dbtest", async (req, res) => {
  const collections = await mongoose.connection.db.collections();
  res.send(collections.map((c) => c.collectionName));
});

app.listen(port, () => {
  console.log(`Running in ${environment.environment} mode`);
  console.log(`task-manager api is listening at port ${port}`);
});
