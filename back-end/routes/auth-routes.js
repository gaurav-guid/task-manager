const express = require("express");
const authController = require("../controllers/auth-controller");

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
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
  await authController.signup(req, res);
});

/**
 * @swagger
 * /api/auth/login:
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
router.post("/login", async (req, res) => {
  await authController.login(req, res);
});

module.exports = router;
