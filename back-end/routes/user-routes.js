const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Registers a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       '200':
 *         description: Successful operation
 */
router.post("/signup", async (req, res) => {
  await UserController.signup(req, res);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: Successful operation
 */
router.post("/login", (req, res) => {
  res.send(req.body);
});

module.exports = router;
