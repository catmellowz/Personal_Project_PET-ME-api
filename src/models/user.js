module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      email: {
        type: DataType.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    },
    { underscored: true }
  );

  User.associate = (db) => {
    User.hasMany(db.Order, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });

    User.hasOne(db.Cart, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return User;
};
