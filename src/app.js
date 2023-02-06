// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoute = require('./routes/auth-route');
const serviceRoute = require('./routes/service-router');
const cartRoute = require('./routes/cart-router');
const notFoundMiddleware = require('./middlewares/not-found');
const authenMiddlwware = require('./middlewares/authenticate');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(morgan('dev'));
//log request info
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: 'too many request, please stop send!!' },
  })
);
app.use(helmet());
//protect from user that try to input code
app.use(cors());
//cross origin server
app.use(express.json());

app.use('/auth', authRoute);
app.use('/', serviceRoute);
app.use('/', authenMiddlwware, cartRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(chalk.magenta.italic`server running on port: ${port}`);
});
