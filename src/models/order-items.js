module.exports = (sequelize, DataType) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      amount: {
        type: DataType.DECIMAL(10),
        allowNull: false,
      },
      price: {
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    { underscored: true }
  );
  OrderItem.associate = (db) => {
    OrderItem.belongsTo(db.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    OrderItem.belongsTo(db.Service, {
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return OrderItem;
};
