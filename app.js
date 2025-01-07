const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize } = require('./src/models');
const { errorMiddleware } = require('./src/middleware/errorMiddleware');
const { swaggerUi, specs } = require('./src/swaggerConfig');
const logger = require('./src/utils/logger');
require('dotenv').config();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(logger);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); 

const authRoutes = require('./src/routes/authRoutes');
const todoRoutes = require('./src/routes/todoRoutes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/todos', todoRoutes);

app.use('/v1/api', apiRouter);

app.use(errorMiddleware);

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
