// src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const { validateTodoDates } = require('../middleware/todosMiddleware');

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Managing todos
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo
 *               description:
 *                 type: string
 *                 description: The description of the todo
 *               priority:
 *                 type: string
 *                 description: The priority of the todo
 *               dueDate:
 *                 type: string
 *                 description: When the todo is due
 *               reminderTime:
 *                 type: string
 *                 description: When to remind the user
 *               tags:
 *                 type: array
 *                 items:
 *                    type: string
 *                 description: Tags for the todo
 *               status:
 *                 type: string
 *                 description: The status of the todo (e.g., pending, completed)
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', validateTodoDates, createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter todos by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *         description: Filter todos by priority
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search todos by title or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of todos per page
 *     responses:
 *       200:
 *         description: List of todos with pagination metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 intent:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 20
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Server error
 */
router.get('/', getTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: A single todo item
 *       404:
 *         description: Todo not found
 */
router.get('/:id', getTodoById);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', validateTodoDates, updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', deleteTodo);

module.exports = router;
