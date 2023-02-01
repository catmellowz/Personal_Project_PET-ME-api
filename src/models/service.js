module.exports = (sequelize, DataType) => {
  const Service = sequelize.define(
    'Service',
    {
      image: {
        type: DataType.STRING,
        validate: {
          notEmpty: true,
        },
      },
      title: {
        type: DataType.STRING,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataType.STRING,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataType.DECIMAL(10, 2),
        validate: {
          notEmpty: true,
          isDecimal: true,
        },
      },
    },
    { underscored: true }
  );
  Service.associate = (db) => {
    Service.hasMany(db.Cart, {
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Service.hasMany(db.OrderItem, {
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };

  return Service;
};
