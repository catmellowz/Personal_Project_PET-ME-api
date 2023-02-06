const { Op } = require('sequelize');

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

    // const service = await Cart.findAll({
    //   where: {
    //     userId: req.user.id,
    //   },
    //   include: [
    //     {
    //       model: Service,
    //     },
    //   ],
    // });

    const service = await Cart.findAll({
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

    res.status(200).json({ service });
  } catch (err) {
    next(err);
  }
};
