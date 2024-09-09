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

module.exports = router;
