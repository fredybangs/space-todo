const { Todo, User } = require('../models');

const updateTodos = async () => {
  const users = await User.findAll();
  
  for (const todo of await Todo.findAll()) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await todo.update({ userId: randomUser.id });
  }
};

updateTodos().then(() => {
  console.log('Todos updated successfully.');
  process.exit();
}).catch(error => {
  console.error('Error updating todos:', error);
  process.exit(1);
});
