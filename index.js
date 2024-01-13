import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import moment from "moment";
import router from "./src/routes/router.js";
import path from "path";
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use(express.static(path.join("public")));

app.use(`${process.env.API}`,router);
mongoose.set("strictQuery", false);
mongoose.connect(process.env.GZFASHION_URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> 
  console.log(`Server đang chạy port: ${process.env.PORT}`)
).catch((error)=> 
  console.log(`Server lỗi: `,error.message)
);
app.listen(process.env.PORT)


// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "index.js",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/src/(.*)",
//       "dest": "index.js"
//     },
//     {
//       "src": "/(.*)",
//       "dest": "/"
//     }
//   ]
// }

    // "node":"18.x" 
    // "node": ">=18.0.0 <19.0.0"



