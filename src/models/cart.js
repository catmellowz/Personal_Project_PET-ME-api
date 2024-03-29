module.exports = (sequelize, DataType) => {
  const Cart = sequelize.define(
    'Cart',
    {
      amount: {
        type: DataType.TINYINT,
        defaultValue: 1,
        allowNull: false,
      },
    },
    { underscored: true }
  );
  Cart.associate = (db) => {
    Cart.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
    Cart.belongsTo(db.Service, {
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return Cart;
};
