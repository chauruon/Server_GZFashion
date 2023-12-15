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
// app.configure(function(){
//   app.use(express.bodyParser());
// });
app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use(express.static(path.join("public")));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.GZFASHION_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  app.listen(process.env.PORT, ()=> 
    console.log(`Server đang chạy port: ${process.env.PORT}`)
  )
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

