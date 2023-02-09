const { Cart, Service, sequelize } = require('../models');
//add service to cart
exports.addCart = async (req, res, next) => {
  try {
    //  find service
    const service = await Cart.findOne({
      where: {
        serviceId: req.body.serviceId,
      },
    });
    //condition if find the save service where id is will update amount + 1
    if (service) {
      const updateAmount = await Cart.update(
        {
          amount: sequelize.literal('amount + 1'),
        },
        { where: { serviceId: req.body.serviceId } }
      );
      res
        .status(200)
        .json({ message: 'success update service in cart' });
    } else {
      //if not found service_id  will create new service
      await Cart.create({
        serviceId: req.body.serviceId,
        userId: req.user.id,
      });
      res
        .status(200)
        .json({ message: 'success create service in cart' });
    }
  } catch (err) {
    next(err);
  }
};

exports.getAmount = async (req, res, next) => {
  try {
    const amount = await Cart.sum('amount', {
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ amount });
  } catch (err) {
    next(err);
  }
};
exports.getCartItem = async (req, res, next) => {
  try {
    // const updateItem = await Cart.findOne({
    //   where: {
    //     userId: req.user.id,
    //     serviceId: req.body.serviceId,
    //   },
    // });

    const serviceInCart = await Cart.findAll({
      include: [{ model: Service }],
      attributes: [
        'service_id',
        [
          sequelize.fn('sum', sequelize.col('amount')),
          'total_amount',
        ],
      ],
      group: ['service_id'],
    });
    // const modifiedService = serviceInCart.map((s) => ({
    //   service_id: s.service_id,
    //   total_amount: s.total_amount,
    //   //cant find both of this
    //   id: s.Service.id,
    //   image: s.Service.image,
    //   title: s.Service.title,
    //   description: s.Service.description,
    //   price: +s.Service.price,
    //   createdAt: s.Service.createdAt,
    //   updatedAt: s.Service.updatedAt,
    // }));

    res.status(200).json({ serviceInCart });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOne({
      where: {
        userId: req.user.id,
        serviceId: +req.params.serviceId,
      },
    });
    // Decrement the amount by 1 if there are more than one
    if (cartItem.amount > 1) {
      await cartItem.update({
        amount: cartItem.amount - 1,
      });

      await cartItem.save();
    } else {
      // If there's only one item, destroy the entire row
      await cartItem.destroy();
    }
    res.status(204).json({ cartItem });
  } catch (err) {
    next(err);
  }
};
//clear cart after create order
exports.clearCart = async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.user.id,
      },
    });

    // console.log(clearItem);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
