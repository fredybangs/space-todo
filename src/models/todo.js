module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      dueDate: {
        type: DataTypes.DATE
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium'
      },
      status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        defaultValue: 'pending'
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
      },
      reminderTime: {
        type: DataTypes.DATE
      },
      completedAt: {
        type: DataTypes.DATE
      }
    });
  
    return Todo;
  };