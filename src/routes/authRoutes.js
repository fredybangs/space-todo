// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, changePassword, requestPasswordReset, verifyOtp, resetPassword } = require('../controllers/authController');
const { protect, validateRegistration } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/register', validateRegistration, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change the current user's password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: User's current password
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       403:
 *         description: Invalid current password
 */
router.post('/change-password', protect, changePassword);

/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: Request an OTP to reset the password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *     responses:
 *       200:
 *         description: OTP sent to email
 *       404:
 *         description: User not found
 */
router.post('/request-password-reset', requestPasswordReset);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify the OTP for password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               otp:
 *                 type: string
 *                 description: OTP received by the user
 *     responses:
 *       200:
 *         description: OTP verified
 *       403:
 *         description: Invalid OTP
 */
router.post('/verify-otp', verifyOtp);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset the password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               otp:
 *                 type: string
 *                 description: OTP received by the user
 *               newPassword:
 *                 type: string
 *                 description: New password chosen by the user
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       403:
 *         description: Invalid OTP
 */
router.post('/reset-password', resetPassword);

module.exports = router;
