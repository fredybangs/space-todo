const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize),
  Todo: require('./todo')(sequelize, Sequelize)
};

// Define associations
db.User.hasMany(db.Todo);
db.Todo.belongsTo(db.User);

// Sync models with the database without dropping tables
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created or synchronized!');
  })
  .catch(err => {
    console.error('Error creating or synchronizing database & tables:', err);
  });

module.exports = db;
