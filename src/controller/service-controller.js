const { Service } = require('../models');
const cloudinary = require('../utils/cloudinary');

exports.addService = async (req, res, next) => {
  try {
    const image = await cloudinary.upload(req.file.path);

    //add data for create service like admin
    const service = await Service.create({
      image: image,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });
    console.log(req.file);
    res.status(201).json({ service });
  } catch (err) {
    next(err);
  }
};

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.findAll({});
    res.status(200).json({ services });
  } catch (err) {
    next(err);
  }
};
