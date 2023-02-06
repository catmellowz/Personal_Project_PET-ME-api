const { Op } = require('sequelize');

const { Cart, Service } = require('../models');

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
