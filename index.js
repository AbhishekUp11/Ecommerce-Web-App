const express = require('express');
const server = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product')
const morgan = require('morgan');
const cors = require('cors');

// connect mongoDB
async function main(){
  await mongoose.connect('mongodb://localhost:27017/ecommerce-app')
  console.log("Database connected successfully")
}
main().catch((err) => {
  console.log("Error in connecting the dataBase", err)
})

// middleware
server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

// All routes
server.use('/api/v1/auth', authRouter.router)
server.use('/api/v1/category', categoryRouter.router)
server.use('/api/v1/product', productRouter.router)

server.get('/', (req, res) => {
  res.send("Welcome to Ecommerce world!")
})

// define port and run listen server 
const PORT = 8080;
server.listen(PORT, () => {
  console.log("Server Started")
})
