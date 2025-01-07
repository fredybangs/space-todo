const { Op } = require('sequelize');
const { Todo } = require('../models');

const handleErrors = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ intent: false, message: error.message });
};

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json({ intent: true, data: todo });
  } catch (error) {
    handleErrors(res, error, 400);
  }
};

const getTodos = async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;
    const where = { userId: req.user.id, archived: false };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;
    const { count, rows: todos } = await Todo.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({ intent: true, data: todos, meta: { total: count, page: parseInt(page), limit: parseInt(limit) } });
  } catch (error) {
    handleErrors(res, error);
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
        archived: false
      }
    });

    if (!todo) {
      return res.status(404).json({ intent: false, message: 'Task not found' });
    }

    res.json({ intent: true, data: todo });
  } catch (error) {
    handleErrors(res, error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const [updated] = await Todo.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.user.id,
        archived: false
      }
    });

    if (!updated) {
      return res.status(404).json({ intent: false, message: 'Task not found' });
    }

    const todo = await Todo.findByPk(req.params.id);
    res.json({ intent: true, data: todo });
  } catch (error) {
    handleErrors(res, error, 400);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const [updated] = await Todo.update(
      { archived: true },
      {
        where: {
          id: req.params.id,
          userId: req.user.id,
          archived: false
        }
      }
    );

    if (!updated) {
      return res.status(404).json({ intent: false, message: 'Task not found' });
    }

    res.json({ intent: true, message: 'Task deleted successfully' });
  } catch (error) {
    handleErrors(res, error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};
