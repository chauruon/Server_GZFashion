import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 8700;

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

mongoose.connect(process.env.CONNECTION_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  app.listen(PORT, ()=> console.log(`Server đang chạy port: ${PORT}`))
).catch(
  (error)=> console.log(error.message)
);