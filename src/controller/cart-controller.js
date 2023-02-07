const { Cart, Service, sequelize } = require('../models');

exports.addCart = async (req, res, next) => {
  try {
    // test find service
    // const service = await Service.findOne({
    //   where: {
    //     [Op.or]: {
    //       id: req.body.serviceId,
    //     },
    //   },
    // });
    //create service from font
    const cart = await Cart.create({
      serviceId: req.body.serviceId,
      userId: req.user.id,
    });

    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.getAmount = async (req, res, next) => {
  try {
    const amount = await Cart.count({
      where: {
        userId: req.user.id,
      },
    });
    res.status(201).json({ amount });
  } catch (err) {
    next(err);
  }
};
//get service id in cart
exports.getCartItem = async (req, res, next) => {
  try {
    // const cartItem = await Cart.findAll({
    //   where: {
    //     userId: req.user.id,
    //   },
    // });
    // const serviceId = cartItem.map((el) => el.serviceId);

    // const serviceInCart = await Cart.findAll({
    //   where: {
    //     userId: req.user.id,
    //   },
    //   include: [
    //     {
    //       model: Service,
    //     },
    //   ],
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

    const modifiedService = serviceInCart.map((s) => ({
      service_id: s.service_id,
      total_amount: s.total_amount,
      //cant find both of this
      id: s.Service.id,
      image: s.Service.image,
      title: s.Service.title,
      description: s.Service.description,
      price: +s.Service.price,
      createdAt: s.Service.createdAt,
      updatedAt: s.Service.updatedAt,
    }));

    console.log(service);

    res.status(200).json({ modifiedService });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOne({
      where: {
        userId: req.user.id,
        id: +req.params.cartId,
      },
    });
    // console.log(cartItem);
    await cartItem.destroy();
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
