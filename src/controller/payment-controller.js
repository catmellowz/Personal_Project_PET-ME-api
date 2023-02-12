const cloudinary = require('../utils/cloudinary');
const {
  Cart,
  Service,
  Order,
  OrderItem,
  sequelize,
  User,
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
      slipImage: req.body.slipImage,
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
    // map service id with orderId
    const createOrderItem = await serviceInCart.map((item) => {
      return {
        //access the values of the columns of a model instance
        orderId: createOrderId.id,
        serviceId: item.dataValues.service_id,
        price: item.dataValues.Service.price,
        amount: item.dataValues.total_amount,
      };
    });
    //insert multiple records into a database table at once
    await OrderItem.bulkCreate(createOrderItem);

    // sum total price
    const totalPrice = createOrderItem.reduce((sum, value) => {
      return +value.price * +value.amount + sum;
    }, 0);

    // update totalPrice to database
    await Order.update(
      { totalPrice: totalPrice },
      {
        where: {
          id: createOrderId.id,
          userId: req.user.id,
        },
      }
    );
    res.status(201).json({ createOrderItem });
  } catch (err) {
    next(err);
  }
};

exports.createOrderHistory = async (req, res, next) => {
  try {
    const createItem = await Order.findAll({
      where: {
        userId: req.user.id,
      },
      include: {
        model: OrderItem,
        include: { model: Service, attributes: ['title'] },
      },
    });

    res.status(200).json(createItem);
  } catch (err) {
    next(err);
  }
};

// exports.orderAdmin = async (req, res, next) => {
//   try {
//     const createItem = await Order.findAll({
//       include: {
//         model: OrderItem,
//         include: { model: Service, attributes: ['title'] },
//       },
//       include: {
//         model: User,
//         attributes: ['firstName', 'lastName'],
//       },
//     });

//     res.status(200).json(createItem);
//   } catch (err) {
//     next(err);
//   }
// };

exports.orderAdmin = async (req, res, next) => {
  try {
    const createItem = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: { model: Service, attributes: ['title'] },
        },
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      ],
    });

    const orderData = createItem.map((order) => ({
      order,
      title: order.title,
    }));

    res.status(200).json(orderData);
  } catch (err) {
    next(err);
  }
};

exports.statusOrder = async (req, res, next) => {
  try {
    const findOrder = await Order.findOne({
      where: {
        id: req.body.orderId,
      },
    });
    //update status get data from font

    await findOrder.update({
      status: req.body.status,
    });

    res.status(200).json(findOrder);
  } catch (err) {
    next(err);
  }
};
