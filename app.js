const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./src/models');
const { errorMiddleware } = require('./src/middleware/errorMiddleware');
require('dotenv').config();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const todoRoutes = require('./src/routes/todoRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.use(errorMiddleware);

// Set the port
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;