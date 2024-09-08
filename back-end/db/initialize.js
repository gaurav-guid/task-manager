const mongoose = require("mongoose");
const connectDb = require("./db");
const environment = require("../services/env-service");

connectDb();

// Define the schemas
const userSchema = new mongoose.Schema(
  {
    name: { type: mongoose.Schema.Types.String, required: true },
    email: { type: mongoose.Schema.Types.String, required: true },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  { strict: true }
);
userSchema.index({ email: "text" });

const taskSchema = new mongoose.Schema(
  {
    title: { type: mongoose.Schema.Types.String, required: true },
    desctiption: { type: mongoose.Schema.Types.String },
    due_date: { type: mongoose.Schema.Types.Date, required: true, index: true },
    status: {
      type: mongoose.Schema.Types.String,
      required: true,
      default: "backlog",
      index: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user", index: true },
  },
  { strict: true }
);
taskSchema.index({ title: "text", description: "text" });

// Create the models
const User = mongoose.model("user", userSchema);
const Task = mongoose.model("task", taskSchema);

if (environment.initializeDB === "Y") {
  console.log("Initializing database...");
  const AllCollextions = ["users", "tasks"];

  // Handlel success or error
  const connection = mongoose.connection;

  connection.once("open", async () => {
    const collections = await connection.db.collections();
    const collectionNames = collections.map((c) => c.collectionName);
    AllCollextions.forEach(async (col) => {
      if (!collectionNames.includes(col)) {
        console.info(`Creating collection ${col} as it does not exist`);
        await mongoose.connection.createCollection(col);
        console.info(`Created collection ${col}`);
      }
    });

    await Task.createIndexes();

    console.log("Database initialized successfully");
    process.exit(0); // Exit the process with a success code
  });

  // Handle connection errors
  connection.on("error", (err) => {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process with a failure code
  });
}

// Export the models
module.exports = { User, Task };
