const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();



//app midleware
app.use(bodyParser.json());
app.use(cors());

//create database connection

const PORT = process.env.PORT || 8090 ;
const URL = process.env.DB_URL ;
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb connection success");
})

//define payment model and connect to payment table(collection)
const PackageRouter = require('./routes/Package');


app.use('/Package', PackageRouter);



app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});

