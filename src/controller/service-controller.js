const { Service } = require('../models');

exports.addService = async (req, res, next) => {
  try {
    const service = await Service.create({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
};

//add data for create service like admin
