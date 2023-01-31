import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
import UserRoute from "./src/routes/UserRoute.js";

app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());


app.use("/api",UserRoute);


mongoose.connect(process.env.CONNECTION_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  app.listen(process.env.PORT, ()=> 
    console.log(`Server đang chạy port: ${process.env.PORT}`)
  )
  ).catch((error)=> 
  console.log(error.message)
);

/**
 * Router
 * example
 * https://localhost:8700/api/v1
 */

// USER