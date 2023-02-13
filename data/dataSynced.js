// const { User, Service, sequelize } = require('./src/models');
// const bcrypt = require('bcryptjs');

// const user = [
//   {
//     firstName: 'Admin',
//     lastName: 'Admin01',
//     email: 'admin01@gmail.com',
//     password: bcrypt.hashSync('123456', 10),
//     isAdmin: 'true',
//   },
//   {
//     firstName: 'Andy',
//     lastName: 'Anderson',
//     email: 'andy@gmail.com',
//     password: bcrypt.hashSync('123456', 10),
//     isAdmin: 'false',
//   },
//   {
//     firstName: 'Taylor',
//     lastName: 'Swift',
//     email: 'taylor@gmail.com',
//     password: bcrypt.hashSync('123456', 10),
//     isAdmin: 'false',
//   },
// ];

// const service = [
//   {
//     image:
//       'https://res.cloudinary.com/dbk1oigig/image/upload/v1675955191/p1_mh1mck.jpg',
//     title: 'Shower',
//     description:
//       'There is a separate shower room for dogs and cats. To keep the cat calm, not panicked or shocked during the service.',
//     price: 500,
//   },
//   {
//     image:
//       'https://res.cloudinary.com/dbk1oigig/image/upload/v1675955699/p2_yslezo.jpg',
//     title: 'Hair and nail Spa',
//     description:
//       'Bath and hair cut service we pay attention to every detail. There is control in every process to meet the hospital standards.',
//     price: 500,
//   },
//   {
//     image:
//       'https://res.cloudinary.com/dbk1oigig/image/upload/v1675955078/p3_ils16k.jpg',
//     title: 'Check up',
//     description:
//       'Pet Hospital is dedicated to providing the most effective treatment for every patient. and according to international principles ',
//     price: 800,
//   },
//   {
//     image:
//       'https://res.cloudinary.com/dbk1oigig/image/upload/v1675955078/p4_zoazrr.jpg',
//     title: 'Shower, Hair cut and Nail spa',
//     description:
//       'There is a separate shower room for dogs and cats. Hair and nail cut',
//     price: 800,
//   },
//   {
//     image:
//       'https://res.cloudinary.com/dbk1oigig/image/upload/v1675955078/p5_snci68.jpg',
//     title: 'check up and shower',
//     description:
//       'There is a separate shower room for dogs and cats.Include check up program',
//     price: 1000,
//   },
//   {
//     image:
//       'https://res.cloudinary.com/dbk1oigig/image/upload/v1675955078/p6_pr6xxe.jpg',
//     title: 'ALL IN ONE',
//     description: 'Shower time, hair, nail cut and check up.',
//     price: 1500,
//   },
// ];

// const seedData = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     const user_res = await User.bulkCreate(user);
//     const service_res = await Service.bulkCreate(service);
//   } catch (err) {
//     console.log(err);
//   }
// };

// seedData();
