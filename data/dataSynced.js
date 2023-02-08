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
//     image: 'https://picsum.photos/300',
//     title: 'Shower',
//     description:
//       'There is a separate shower room for dogs and cats. To keep the cat calm, not panicked or shocked during the service.',
//     price: 500,
//   },
//   {
//     image: 'https://picsum.photos/300',
//     title: 'Hair and nail Spa',
//     description:
//       'Bath and hair cut service we pay attention to every detail. There is control in every process to meet the hospital standards.',
//     price: 500,
//   },
//   {
//     image: 'https://picsum.photos/300',
//     title: 'Check up',
//     description:
//       'Pet Hospital is dedicated to providing the most effective treatment for every patient. and according to international principles ',
//     price: 800,
//   },
//   {
//     image: 'https://picsum.photos/300',
//     title: 'Shower, Hair cut and Nail spa',
//     description:
//       'There is a separate shower room for dogs and cats. Hair and nail cut',
//     price: 500,
//   },
//   {
//     image: 'https://picsum.photos/300',
//     title: 'check up and shower',
//     description:
//       'There is a separate shower room for dogs and cats.Include check up program',
//     price: 1000,
//   },
//   {
//     image: 'https://picsum.photos/300',
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
