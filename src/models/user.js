module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resetOtp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  User.associate = function(models) {
    User.hasMany(models.Todo, { foreignKey: 'userId' });
  };

  return User;
};
