const mongoose = require("mongoose");
const connectDb = require("./db");

connectDb();

// Define the schemas
const userSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String, required: true },
  email: { type: mongoose.Schema.Types.String, required: true },
  password: { type: mongoose.Schema.Types.String, required: true },
});

const taskSchema = new mongoose.Schema({
  title: { type: mongoose.Schema.Types.String, required: true },
  desctiption: { type: mongoose.Schema.Types.String, required: true },
  due_date: { type: mongoose.Schema.Types.Date, required: true },
  status: {
    type: mongoose.Schema.Types.String,
    required: true,
    default: "backlog",
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

// Create the models
const User = mongoose.model("user", userSchema);
const Task = mongoose.model("task", taskSchema);

const AllCollextions = ["users", "tasks"];

// Handlel success or error
const connection = mongoose.connection;

connection.once("open", async () => {
  const collections = await connection.db.collections();
  const collectionNames = collections.map((c) => c.collectionName);
  AllCollextions.forEach((col) => {
    if (!collectionNames.includes(col)) {
      console.error(`Collection ${col} does not exist`);
      process.exit(1); // Exit the process with a failure code
    }
  });

  console.log("Database initialized successfully");
  process.exit(0); // Exit the process with a success code
});

// Handle connection errors
connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1); // Exit the process with a failure code
});

// Export the models
module.exports = { User, Task, AllCollextions };
