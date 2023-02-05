import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import moment from "moment";
import UserRoute from "./src/routes/UserRoute.js";
import path from "path";
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use(express.static(path.join("public")));


// var Mongoose = mongoose.Mongoose;
// console.log('Mongoose: ', Mongoose);


// var instance2 = new Mongoose();
// instance2.connect('test');
// console.log('instance1: ', instance1);
// console.log('instance2: ', instance2);


mongoose.connect(process.env.BD_PRODUCTION,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  app.listen(process.env.PORT, ()=> 
    console.log(`Server đang chạy port: ${process.env.PORT}`)
  )
).catch((error)=> 
  console.log(error.message)
);


mongoose.connect(process.env.BD_PRODUCTION,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  // app.listen(process.env.PORT, ()=> 
    console.log(`Server đang chạy port: ${process.env.PORT}`)
  // )
).catch((error)=> 
  console.log(error.message)
);

// var instance1 = new Mongoose();
// instance1.connect(d'Production');
/**
 * Router
 * example
 * https://localhost:8700/api/v1
 */

// USER
// app.use("/api",UserRoute);
app.use(`${process.env.API}`,UserRoute);

