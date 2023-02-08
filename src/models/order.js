const { ONPROCESS, APPROVE, CANCEL } = require('../config/constant');

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
      status: {
        type: DataType.ENUM(ONPROCESS, APPROVE, CANCEL),
        allowNull: false,
        defaultValue: ONPROCESS,
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
