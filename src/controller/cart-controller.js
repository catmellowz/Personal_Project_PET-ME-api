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
    res.status(201).json({ service });

    console.log(service);
    // const cart = await Cart.create({});
  } catch (err) {
    next(err);
  }
};
