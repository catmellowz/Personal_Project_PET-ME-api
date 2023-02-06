const { Op } = require('sequelize');

const { Cart, Service } = require('../models');

exports.addCart = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      where: {
        [Op.or]: {
          id: req.body.serviceId,
        },
      },
    });

    const cart = await Cart.create({
      serviceId: service.id,
      userId: req.user.id,
    });
    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};
