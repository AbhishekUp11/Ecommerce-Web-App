const express = require('express');
const server = express();
const mongoose = require('mongoose');

// connect mongoDB
async function main(){
  await mongoose.connect('mongodb://localhost:27017/ecommerce-app')
  console.log("Database connected successfully")
}
main().catch((err) => {
  console.log("Error in connecting the dataBase", err)
})

server.get('/', () => {
  res.send("Welcome to Ecommerce world!")
})

server.use(express.json())
 
const PORT = 8080;
server.listen(8080, () => {
  console.log("Server Started")
})
