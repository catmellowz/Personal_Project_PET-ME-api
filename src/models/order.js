module.exports = (sequelize, DataType) => {
  const Order = sequelize.define(
    'Order',
    {
      date: {
        type: DataType.DATE,
        allowNull: false,
      },
      totalPrice: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      },
      slipImage: {
        type: DataType.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  Order.associate = (db) => {
    Order.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Order.hasMany(db.OrderItem, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return Order;
};
