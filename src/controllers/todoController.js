const { Todo } = require('../models');

const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      UserId: req.user.id
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({intent: false, message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    const where = { UserId: req.user.id };
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const todos = await Todo.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    
    res.json({intent: true, data: todos});
  } catch (error) {
    res.status(500).json({intent: false, message: error.message });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });
    
    if (!todo) {
      return res.status(404).json({intent: false, message: 'Todo not found' });
    }
    
    res.json({intent: true, data: todo});
  } catch (error) {
    res.status(500).json({intent: false, message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const [updated] = await Todo.update(req.body, {
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });
    
    if (!updated) {
      return res.status(404).json({intent: false, message: 'Todo not found' });
    }
    
    const todo = await Todo.findByPk(req.params.id);
    res.json({intent: true, data:todo});
  } catch (error) {
    res.status(400).json({ intent: false,message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    });
    
    if (!deleted) {
      return res.status(404).json({intent: false, message: 'Todo not found' });
    }
    
    res.json({intent: true, message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({intent: false, message: error.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};
