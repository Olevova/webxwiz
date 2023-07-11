const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const addDate = require('./addproducts.js')
const Product = require('../models/product.js');
const User  = require('../models/user.js');
console.log(process.env.DB_HOST, process.env.PORT);
const productsRoute = require('./routes/products.js');
const authRouter = require('./routes/auth.js');
const paymentRouter = require('./routes/payment.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
// const authRouter = require('./routes/api/auth');
// const contactsRouter = require('./routes/api/contacts');


const app = express();
  const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());

  app.use(express.static('public'));

app.use('/', productsRoute);
app.use('/', authRouter);
app.use('/', paymentRouter)
//   app.use('/api/contacts', contactsRouter);
  console.log("ok");
try {
console.log(process.env.DB_HOST, 'in');
    mongoose.connect( process.env.DB_HOST );
    console.log("Connect!!!!!");
    addDate()
    module.exports = app.listen(process.env.PORT || 4040, () => {
      console.log(`Server running. Use our API on port: ${process.env.PORT}`)
    }); 
  } catch (error) {
    console.log(error.message);
  }
  app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

  app.use((err, req, res, next) => {
  const{message, statusCode = 500} = err
  res.status(statusCode).json({ message: message})
  })
