const cloudinary = require('../utils/cloudinary');
const {
  Cart,
  Service,
  Order,
  OrderItem,
  sequelize,
} = require('../models');

exports.uploadSlipImage = async (req, res, next) => {
  try {
    const result = await cloudinary.upload(req.file.path);
    // console.log(result);
    // get link from cloundinary
    res.status(200).json({ result });
  } catch (err) {
    // console.log('uploadSlip', err);
    next(err);
  }
};
//create order
exports.createOrder = async (req, res, next) => {
  try {
    const createOrderId = await Order.create({
      userId: req.user.id,
      slipImage: req.slipImage.id,
    });

    // find and get item in cart
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

    const createOrderItem = await serviceInCart.map((item) => {
      return {
        orderId: createOrderId.id,
        serviceId: item.dataValues.service_id,
        price: item.dataValues.Service.price,
        amount: item.dataValues.total_amount,
      };
    });
    //insert multiple records into a database table at once
    await OrderItem.bulkCreate(createOrderItem);

    res.status(200).json('already create order');
  } catch (err) {
    next(err);
  }
};
