const express = require("express");
const taskController = require("../controllers/task-controller");

const router = express.Router();

/**
 * @swagger
 * /api/task:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/task'
 *     responses:
 *       '200':
 *         description: Successful operation
 */
router.post("/", async (req, res) => {
  await taskController.createTask(req, res);
});

/**
 * @swagger
 * /api/task/{taskId}:
 *   put:
 *     summary: Updates a task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/task'
 *     responses:
 *       '200':
 *         description: Successful operation
 */
router.put("/:taskId", async (req, res) => {
  await taskController.updateTask(req, res);
});

/**
 * @swagger
 * /api/task/{taskId}:
 *   get:
 *     summary: Get a task by ID
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
 *       '404':
 *         description: Task not found
 */
router.get("/:taskId", async (req, res) => {
  await taskController.getTaskById(req, res);
});

/**
 * @swagger
 * /api/task:
 *   get:
 *     summary: List all tasks
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/task'
 */
router.get("/", async (req, res) => {
  await taskController.getAllTasks(req, res);
});

module.exports = router;
